import { MakeReport } from '../../usecases/report/makeReport/make-report';
import { MakeReportServicesError } from '../../usecases/report/types/error-types';
import { MakeReportResponse } from '../../usecases/report/types/response-types';
import { badRequest, successRequest } from '../helpers/http.helper';
import { Controller } from '../ports/controller';
import { HttpRequest, HttpResponse } from '../ports/http';

export class GenerateReportController implements Controller {
  private readonly generateReport: MakeReport;

  constructor(generateReport: MakeReport) {
    this.generateReport = generateReport;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const reportFile: MakeReportResponse = await this.generateReport.makeReport(httpRequest.params.owner);

      if (reportFile instanceof MakeReportServicesError) {
        return badRequest(reportFile);
      }

      return successRequest(reportFile);
    } catch (error) {
      console.error(error);
      return badRequest(error);
    }
  }
}
