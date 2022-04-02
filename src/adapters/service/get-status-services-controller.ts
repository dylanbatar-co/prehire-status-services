import { GetStatusServices } from '../../usecases/service/search/get-status-service';
import { GetStatusServicesError } from '../../usecases/service/types/error-type';
import { GetStatusServicesResponse } from '../../usecases/service/types/response-type';
import {
  badRequest,
  serverError,
  successRequest,
} from '../helpers/http.helper';
import { Controller } from '../ports/controller';
import { HttpRequest, HttpResponse } from '../ports/http';

export class GetStatusServicesController implements Controller {
  private readonly getServices: GetStatusServices;
  constructor(getStatusServices: GetStatusServices) {
    this.getServices = getStatusServices;
  }

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const getServicesResponse: GetStatusServicesResponse =
        await this.getServices.getStatusServices(HttpRequest.params.owner);

      if (getServicesResponse instanceof GetStatusServicesError) {
        return badRequest(getServicesResponse);
      }

      return successRequest(getServicesResponse);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
