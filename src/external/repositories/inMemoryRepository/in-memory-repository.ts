import { v4 as uuidv4 } from 'uuid';

import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../../../usecases/ports/service-repository';

export class InMemoryRepository implements ServiceRepository {
  private data: ServiceData[] = [];

  async create(service: ServiceData): Promise<ServiceData> {
    this.data.push(service);
    return service;
  }

  async getIncidentsByMonth(month: Date, limit: number): Promise<ServiceData[]> {
    const incidentsByDate: ServiceData[] = [];
    for (const service of this.data) {
      const incidentByDate = service.incidents.filter((incident) => {
        if (incident.date.getTime() >= month.getTime()) {
          return incident;
        }
      });

      if (incidentByDate.length) {
        incidentsByDate.push(service);
      }
    }

    return incidentsByDate;
  }
  async createIncident(service: ServiceData, description?: string): Promise<ServiceData> {
    const defaultIncident = {
      id: uuidv4(),
      fixed: false,
      name: service.name,
      description,
      date: new Date()
    };

    this.data.forEach((service) => {
      if (service.uuid !== service.uuid) {
        return service;
      }
      if (!service.incidents.length) {
        service.incidents?.push(defaultIncident);
      }
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
    this.data.filter((service) => service.uuid === id).map((service) => ({ ...service, data }));
    return data;
  }

  async updateIncident(id: string, data?: ServiceData): Promise<ServiceData> {
    let serviceIdx: number;
    let incidentIdx: number;

    const [service] = this.data.filter((service, idx) => {
      if (service.uuid === data.uuid) {
        serviceIdx = idx;
        return service;
      }
    });

    service.incidents.forEach((incident, idx) => {
      if (incident.id === id) {
        incidentIdx = idx;
      }
    });

    this.data[serviceIdx].incidents[incidentIdx] = data.incidents[incidentIdx];

    return data;
  }
}
