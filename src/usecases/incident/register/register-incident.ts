import { Incident } from '../../../entities/incident/incident';
import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../../ports/service-repository';
import { RegisterNewIncidentError } from '../types/error-type';
import { RegisterNewIncidentResponse } from '../types/response-type';
import { RegisterIncident as RegisterIncidentUseCase } from './incident';

export class RegisterIncident implements RegisterIncidentUseCase {
  private service: ServiceData;
  private readonly description?: string;
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository, service: ServiceData, description?: string) {
    this.service = service;
    this.description = description;
    this.serviceRepository = serviceRepository;
  }

  async registerNewIncident(): Promise<RegisterNewIncidentResponse> {
    try {
      const incident = Incident.create(this.service.name, this.description);
      this.service.incidents.push(incident);
      await this.serviceRepository.createIncident(this.service, this.description);
      return this.service;
    } catch (error) {
      return new RegisterNewIncidentError('Error doesnt save in database');
    }
  }
}
