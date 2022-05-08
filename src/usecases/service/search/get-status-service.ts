import { GetStatus } from './get-status';
import { ServiceRepository } from '../../ports/service-repository';
import { GetStatusServicesResponse } from '../types/response-type';
import { ServiceRequest } from '../ports/service-request';
import { UpdateStatusService } from '../update/update-status-service';

export class GetStatusServices implements GetStatus {
  private readonly serviceRepository: ServiceRepository;
  private readonly serviceRequest: ServiceRequest;

  constructor(serviceRepository: ServiceRepository, serviceRequest: ServiceRequest) {
    this.serviceRepository = serviceRepository;
    this.serviceRequest = serviceRequest;
  }

  async getStatusServices(owner: string): Promise<GetStatusServicesResponse> {
    const servicesData = await this.serviceRepository.findServiceByOwner(owner);

    if (!servicesData.length) {
      return servicesData;
    }

    const servicesStatusPromise = servicesData.map(
      async (service) => await this.serviceRequest.requestStatus(service.url)
    );

    const statuses = await Promise.all(servicesStatusPromise);

    const updateStatusService = new UpdateStatusService(this.serviceRepository);

    const servicesUpdated = await updateStatusService.updateStatus(servicesData, statuses);

    return servicesUpdated;
  }
}
