import { ServiceData } from '../../../entities/service/service-data';
import { RegisterNewIncidentError } from './error-type';

export type RegisterNewIncidentResponse = ServiceData | RegisterNewIncidentError;
