import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../../../usecases/service/ports/service-repository';

export class InMemoryRepository implements ServiceRepository {
  private data: ServiceData[] = [];

  async create(service: ServiceData): Promise<ServiceData> {
    this.data.push(service);
    return service;
  }

  async createIncident(
    service: ServiceData,
    description?: string
  ): Promise<ServiceData> {
    const defaultIncident = {
      fixed: false,
      name: service.name,
      description,
      date: new Date(),
    };

    this.data.forEach((service) => {
      if (service.uuid !== service.uuid) {
        return service;
      }
      service.incidents?.push(defaultIncident);
    });

    return service;
  }

  async findServiceByOwner(owner: string): Promise<ServiceData[]> {
    return this.data.filter((service) => service.owner === owner);
  }

  async findByUUID(uuid: string): Promise<ServiceData> {
    const [service] = this.data.filter((service) => service.uuid === uuid);
    return service;
  }

  async updateService(id: string, data: ServiceData): Promise<ServiceData> {
    this.data
      .filter((service) => service.uuid === id)
      .map((service) => ({ ...service, data }));
    return data;
  }

  updateIncident(
    service: ServiceData,
    description?: string
  ): Promise<ServiceData> {
    throw new Error('Method not implemented.');
  }
}
