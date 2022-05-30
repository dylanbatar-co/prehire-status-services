import { GenerateReportController } from '../../adapters/report/generate-report-controller';
import { InMemoryRepository } from '../../external/repositories/inMemoryRepository/in-memory-repository';
import { GenerateReport } from '../../usecases/report/makeReport/generate-report';

const inMemoryRepository = new InMemoryRepository();

const makeReportServices = (): GenerateReportController => {
  const page = null;
  const generateReportUseCase = new GenerateReport(inMemoryRepository, page);
  const generateReportController = new GenerateReportController(generateReportUseCase);
  return generateReportController;
};

export { makeReportServices };
