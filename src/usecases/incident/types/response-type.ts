import { IncidentData } from '../../../entities/incident/incident-data';
import { ServiceData } from '../../../entities/service/service-data';
import { RegisterNewIncidentError, UpdateIncidentError, GetIncidentHistoryError } from './error-type';

export type RegisterNewIncidentResponse = ServiceData | RegisterNewIncidentError;

export type UpdateIncidentResponse = ServiceData | UpdateIncidentError;

export type GetIncidentHistoryResponse = { [key: string]: IncidentData }[] | GetIncidentHistoryError;
