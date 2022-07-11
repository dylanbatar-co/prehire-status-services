import { GenerateReportController } from '../../adapters/report/generate-report-controller';
import { CreatePDF } from '../../external/pdf/createPDF/jsPdf';
import { PuppeteerScreenShot } from '../../external/pdf/puppeteerSreenshot/puppeteer-screenshot';
import { InMemoryRepository } from '../../external/repositories/inMemoryRepository/in-memory-repository';
import { GenerateReport } from '../../usecases/report/makeReport/generate-report';

const makeReportServices = (): GenerateReportController => {
  const inMemoryRepository = new InMemoryRepository();

  const makeReport = new CreatePDF();
  const takeScreenShot = new PuppeteerScreenShot();
  const generateReportUseCase = new GenerateReport(inMemoryRepository, takeScreenShot, makeReport);
  const generateReportController = new GenerateReportController(generateReportUseCase);
  return generateReportController;
};

export { makeReportServices };
