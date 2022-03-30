import { ServiceData } from '../../../entities/service/service-data';
import { RegisterServiceError } from './error-type';

export type RegisterServiceResponse = ServiceData | RegisterServiceError;
