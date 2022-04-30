import { ServiceData } from '../../../entities/service/service-data';
import { RegisterNewIncidentError,UpdateIncidentError } from './error-type';

export type RegisterNewIncidentResponse = ServiceData | RegisterNewIncidentError;

export type UpdateIncidentResponse = ServiceData | UpdateIncidentError;