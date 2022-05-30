import { ServiceRepository } from '../../ports/service-repository';
import { MakeReport } from './make-report';

export class GenerateReport implements MakeReport {
  private serviceRepository: ServiceRepository;
  private page: any;

  constructor(serviceRepository: ServiceRepository, page: any) {
    this.serviceRepository = serviceRepository;
    this.page = page;
  }

  async makeReport(): Promise<any> {
    this.page.pdf();
    return;
  }

  private async takeScreenShot(urls: string[]) {
    const screenShotPromises = urls.map(async (url) => this.page.screenShot(url));
    await Promise.all(screenShotPromises);
  }

  private async getUrlForReport(owner: string) {
    const serviceToReport = await this.serviceRepository.findServiceByOwner(owner);
    return serviceToReport;
  }
}
