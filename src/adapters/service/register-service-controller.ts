import { RegisterService } from '../../usecases/service/register-service';
import { RegisterServiceError } from '../../usecases/service/types/error-type';
import { RegisterServiceResponse } from '../../usecases/service/types/response-type';
import {
  badRequest,
  serverError,
  successRequest,
} from '../helpers/http.helper';
import { Controller } from '../ports/controller';
import { HttpRequest, HttpResponse } from '../ports/http';

export class RegisterServiceController implements Controller {
  private readonly registerService: RegisterService;

  constructor(registerService: RegisterService) {
    this.registerService = registerService;
  }

  async handle(
    HttpRequest: HttpRequest,
    HttpResponse: HttpResponse
  ): Promise<HttpResponse> {
    try {
      const serviceData = {
        name: HttpRequest.body.name,
        url: HttpRequest.body.url,
        owner: HttpRequest.body.owner,
      };
      const registerServiceResponse: RegisterServiceResponse =
        await this.registerService.registerServiceOnStore(serviceData);

      if (registerServiceResponse instanceof RegisterServiceError) {
        return badRequest(registerServiceResponse);
      }

      return successRequest(registerServiceResponse);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
