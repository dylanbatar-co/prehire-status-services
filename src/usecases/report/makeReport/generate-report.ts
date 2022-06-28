import { resolve } from 'path';
import { unlink, existsSync, mkdirSync } from 'fs';

import { Report } from '../../../entities/report/report';
import { TakeScreenShot, MakeReport } from '../../ports/report';
import { ServiceRepository } from '../../ports/service-repository';
import { MakeReport as MakeReportUseCase } from './make-report';
import { MakeReportResponse } from '../types/response-types';
import { MakeReportServicesError } from '../types/error-types';

export class GenerateReport implements MakeReportUseCase {
  private readonly serviceRepository: ServiceRepository;
  private readonly screenshot: TakeScreenShot;
  private readonly createPDF: MakeReport;
  private readonly OUTPUT_DIRECTORY = 'temp';

  constructor(serviceRepository: ServiceRepository, screenShotHanlder: TakeScreenShot, createPDF: MakeReport) {
    this.serviceRepository = serviceRepository;
    this.screenshot = screenShotHanlder;
    this.createPDF = createPDF;
  }

  public async makeReport(owner: string): Promise<MakeReportResponse> {
    const folderName = resolve(__dirname, '../../../', this.OUTPUT_DIRECTORY);
    const servicesForReport = await this.getUrlForReport(owner);

    if (!servicesForReport.length) {
      return new MakeReportServicesError(`Not Found Services with Owner name: ${owner}`);
    }

    const rawImages = await this.takeScreenShot(servicesForReport);

    if (!rawImages.length) {
      return new MakeReportServicesError('Server could not take screenshot, try it few minutes later');
    }

    const reportData = servicesForReport
      .map((serviceUrl) => ({ url: serviceUrl }))
      .map((service, index) => Report.create({ ...service, path: '', image: rawImages[index] }));

    this.checkFolderAndFileExist(folderName, `${folderName}/${Report.getName()}`);
    return await this.createPDF.createPDF(reportData, Report.getName(), resolve(folderName));
  }

  private async takeScreenShot(urls: string[]): Promise<(string | Buffer)[]> {
    const screenShotPromises = await this.screenshot.takeScreenShot(urls);
    return screenShotPromises;
  }

  private async getUrlForReport(owner: string): Promise<string[]> {
    const serviceToReport = await this.serviceRepository.findServiceByOwner(owner);
    const servicesForReport = serviceToReport.map(({ url }) => url);
    return servicesForReport;
  }

  private checkFolderAndFileExist(folderPath: string, filePath: string): void {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }

    unlink(filePath, (err) => {
      if (err) {
        return err;
      }
      console.warn(`Deleting file in Path: ${filePath}`);
    });
  }
}
