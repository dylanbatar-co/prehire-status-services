import { MakeReport } from '../../usecases/report/makeReport/make-report';
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
      await this.generateReport.makeReport();
      return successRequest('Generating PDF');
    } catch (error) {
      badRequest(error.message);
    }
  }
}
