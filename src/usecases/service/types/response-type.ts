import { ServiceData } from '../../../entities/service/service-data';
import { GetStatusServicesError, RegisterServiceError } from './error-type';

export type RegisterServiceResponse = ServiceData | RegisterServiceError;

export type GetStatusServicesResponse = ServiceData[] | GetStatusServicesError;
