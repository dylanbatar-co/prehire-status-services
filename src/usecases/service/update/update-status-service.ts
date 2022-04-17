import { ServiceData } from '../../../entities/service/service-data';
import { RegisterIncident } from '../../incident/register/register-incident';
import { ServiceRepository } from '../ports/service-repository';

export class UpdateStatusService implements UpdateStatusService {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  private handlerUpdate(services: ServiceData[], status: any[]): ServiceData[] {
    return services.map((service: ServiceData, index: number) => {
      if (service.status === status[index].status) {
        return service;
      }

      if (status[index].status === 'fail') {
        const registerEntity = new RegisterIncident(this.serviceRepository,service);
        registerEntity.registerNewIncident();
        return service;
      }

      return { ...service, status: status[index].status };
    });
  }

  public async updateStatus(
    services: ServiceData[],
    status: any[]
  ): Promise<ServiceData[]> {
    if (!services.length) {
      return [];
    }

    const servicesForUpdate = this.handlerUpdate(services, status);

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
