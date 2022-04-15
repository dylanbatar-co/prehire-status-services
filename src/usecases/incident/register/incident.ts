import { ServiceData } from '../../../entities/service/service-data';
import { RegisterNewIncidentResponse } from '../types/response-type';

export interface RegisterIncident {
  registerNewIncident(
    service: ServiceData,
    description: string
  ): Promise<RegisterNewIncidentResponse>;
}
