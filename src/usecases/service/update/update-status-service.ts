import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../ports/service-repository';

export class UpdateStatusService {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async updateStatus(
    services: ServiceData[],
    status: any[]
  ): Promise<ServiceData[]> {
    if (!services.length) {
      return [];
    }

    const servicesForUpdate = services.map((service, index) => {
      if (service.status === status[index].status) {
        return service;
      }
      return { ...service, status: status[index].status };
    });

    if (!servicesForUpdate.length) {
      return services;
    }

    const servicesForUpdatePromises = servicesForUpdate.map(async (service) => {
      await this.serviceRepository.updateService(service.uuid, service);
    });

    await Promise.all(servicesForUpdatePromises);

    return servicesForUpdate;
  }
}
