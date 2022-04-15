import { Incident } from '../../../entities/incident/incident';
import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../../service/ports/service-repository';
import { RegisterNewIncidentResponse } from '../types/response-type';
import { RegisterIncident as RegisterIncidentUseCase } from './incident';

export class RegisterIncident implements RegisterIncidentUseCase {
  private service: ServiceData;
  private readonly description?: string;
  private readonly serviceRepository: ServiceRepository;

  constructor(
    serviceRepository: ServiceRepository,
    service: ServiceData,
    description?: string
  ) {
    this.service = service;
    this.description = description;
    this.serviceRepository = serviceRepository;
  }

  async registerNewIncident(): Promise<RegisterNewIncidentResponse> {
    const incident = Incident.create(this.service.name, this.description);
    Object.assign(this.service, { incident });

    await this.serviceRepository.createIncident(this.service, this.description);
    return this.service;
  }
}
