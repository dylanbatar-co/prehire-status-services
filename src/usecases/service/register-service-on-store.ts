import { ServiceData } from '../../entities/service/service-data';
import { ServiceRepository } from './ports/service-repository';
import { RegisterService } from './register-service';
import { RegisterServiceResponse } from './types/response-type';

export class RegisterServiceOnStore implements RegisterService {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async registerServiceOnStore(serviceData: ServiceData): Promise<RegisterServiceResponse> {
    // check if this service exist

    // create service
    await this.serviceRepository.create(serviceData);

    // return data record
    return serviceData;
  }
}
