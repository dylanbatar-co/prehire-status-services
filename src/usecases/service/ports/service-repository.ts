import { ServiceData } from '../../../entities/service/service-data';

export interface ServiceRepository {
  create(service: ServiceData): Promise<ServiceData>;
  createIncident(
    service: ServiceData,
    description?: string
  ): Promise<ServiceData>;
  updateIncident(
    service: ServiceData,
    description?: string
  ): Promise<ServiceData>;
  findByUUID(uuid: string): Promise<ServiceData>;
  findServiceByOwner(owner: string): Promise<ServiceData[]>;
  updateService(id: string, data: ServiceData): Promise<ServiceData>;
}
