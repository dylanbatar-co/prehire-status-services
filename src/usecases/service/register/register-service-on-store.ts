import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../ports/service-repository';
import { RegisterService } from './register-service';
import { RegisterServiceResponse } from '../types/response-type';
import { RegisterServiceError } from '../types/error-type';

export class RegisterServiceOnStore implements RegisterService {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async registerServiceOnStore(
    serviceData: ServiceData
  ): Promise<RegisterServiceResponse> {
    // check if this service exist
    const service = await this.serviceRepository.findByUUID(serviceData.uuid);
    
    if (service) {
      return new RegisterServiceError('Service already created');
    }

    // create service
    await this.serviceRepository.create(serviceData);

    // return data record
    return serviceData;
  }
}
