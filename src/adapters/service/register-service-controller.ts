import { ServiceData } from '../../entities/service/service-data';
import { RegisterService } from '../../usecases/service/register/register-service';
import { RegisterServiceError } from '../../usecases/service/types/error-type';
import { RegisterServiceResponse } from '../../usecases/service/types/response-type';
import { badRequest, serverError, successRequest } from '../helpers/http.helper';
import { Controller } from '../ports/controller';
import { HttpRequest, HttpResponse } from '../ports/http';

export class RegisterServiceController implements Controller {
  private readonly registerService: RegisterService;

  constructor(registerService: RegisterService) {
    this.registerService = registerService;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const serviceData: ServiceData = {
        uuid: '1',
        name: httpRequest.body.name,
        url: httpRequest.body.url,
        owner: httpRequest.body.owner,
        incidents: [],
        status: 'pass'
      };

      const registerServiceResponse: RegisterServiceResponse = await this.registerService.registerServiceOnStore(
        serviceData
      );

      if (registerServiceResponse instanceof RegisterServiceError) {
        return badRequest(registerServiceResponse);
      }

      return successRequest(registerServiceResponse);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
