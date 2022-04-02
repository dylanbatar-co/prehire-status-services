import { GetStatus } from './get-status';
import { ServiceRepository } from '../ports/service-repository';
import { GetStatusServicesResponse } from '../types/response-type';

export class GetStatusServices implements GetStatus {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async getStatusServices(owner: string): Promise<GetStatusServicesResponse> {
    const servicesData = await this.serviceRepository.findServiceByOwner(owner);
    return servicesData;
  }
}
