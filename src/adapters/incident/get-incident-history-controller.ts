import { Controller } from '../ports/controller';
import { HttpRequest, HttpResponse } from '../ports/http';
import { IncidentHistory } from '../../usecases/incident/search/incident-history';
import { badRequest, serverError, successRequest } from '../helpers/http.helper';
import { GetIncidentHistoryResponse } from '../../usecases/incident/types/response-type';
import { GetIncidentHistoryError } from '../../usecases/incident/types/error-type';

export class GetIncidentHistoryController implements Controller {
  private readonly incidentHistory: IncidentHistory;

  constructor(incidentHistory: IncidentHistory) {
    this.incidentHistory = incidentHistory;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { month } = httpRequest.params;
      const { limit } = httpRequest.query;

      const incidentHistoryResponse: GetIncidentHistoryResponse = await this.incidentHistory.incidentHistory(
        month,
        limit
      );

      if (incidentHistoryResponse instanceof GetIncidentHistoryError) {
        return badRequest(incidentHistoryResponse);
      }

      return successRequest(incidentHistoryResponse);
    } catch (error) {
      serverError(error.message);
    }
  }
}
