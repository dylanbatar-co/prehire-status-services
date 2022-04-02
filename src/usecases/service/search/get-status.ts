import { GetStatusServicesResponse } from '../types/response-type';

export interface GetStatus {
  getStatusServices(owner: string): Promise<GetStatusServicesResponse>;
}
