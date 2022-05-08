import { IncidentData } from '../../entities/incident/incident-data';
import { ServiceData } from '../../entities/service/service-data';

export interface ServiceRepository {
  create(service: ServiceData): Promise<ServiceData>;
  createIncident(service: ServiceData, description?: string): Promise<ServiceData>;
  updateIncident(id: string, data?: ServiceData): Promise<ServiceData>;
  findByUUID(uuid: string): Promise<ServiceData>;
  findServiceByOwner(owner: string): Promise<ServiceData[]>;
  updateService(id: string, data: ServiceData): Promise<ServiceData>;
  getIncidentsByMonth(month: Date, limit: number): Promise<{ [key: string]: IncidentData }[]>;
}
