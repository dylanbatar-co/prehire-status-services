import { ServiceData } from '../../../entities/service/service-data';
import { RegisterIncident } from '../../incident/register/register-incident';
import { UpdateIncident } from '../../incident/update/update-incident';
import { ServiceRepository } from '../ports/service-repository';

export class UpdateStatusService implements UpdateStatusService {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  private handlerUpdate(services: ServiceData[], status: any[]): ServiceData[] {
    return services.map((service: ServiceData, index: number) => {
      if (this.isWithOutIncident(service, status[index].status)) {
        return { ...service, status: status[index].status };
      }

      if (this.isNewIncident(service, status[index].status)) {
        service.status = 'fail';
        const registerIncidentEntity = new RegisterIncident(
          this.serviceRepository,
          service
        );
        registerIncidentEntity.registerNewIncident();
        return service;
      }

      if (this.keepFailStatus(service, status[index].status)) {
        return service;
      }

      if (this.fixIncident(status[index].status)) {
        service.status = status[index].status;
        const updateIncidentEntity = new UpdateIncident(this.serviceRepository);
        updateIncidentEntity.updateIncident(service);
        return service;
      }
    });
  }

  private isWithOutIncident(service: ServiceData, status: string): boolean {
    const hasIncident = service.incidents.filter((incident) => incident.fixed);

    if (!hasIncident.length && service.status !== 'fail' && status !== 'fail') {
      return true;
    }

    return false;
  }

  private isNewIncident(service: ServiceData, status: string): boolean {
    const hasActiveIncident = service.incidents.filter(
      (incident) => !incident.fixed
    );

    if (
      (!hasActiveIncident.length && status === 'fail') ||
      (service.status !== 'pass' &&
        status === 'fail' &&
        !hasActiveIncident.length)
    ) {
      return true;
    }

    return false;
  }

  private keepFailStatus(service: ServiceData, status: string): boolean {
    if (service.status === 'fail' && status === 'fail') {
      return true;
    }

    return false;
  }

  private fixIncident(status: string): boolean {
    if (status !== 'fail') {
      return true;
    }

    return false;
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
