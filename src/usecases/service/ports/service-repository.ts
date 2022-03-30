import { ServiceData } from '../../../entities/service/service-data';

export interface ServiceRepository {
  create: (service: ServiceData) => Promise<ServiceData>;
  createOrUpdateIncident: (id: string) => Promise<ServiceData>;
  findServiceByOwner: (owner: string) => Promise<ServiceData[]>;
  updateService: (id: string, data: ServiceData) => Promise<ServiceData>;
}
