import { ServiceData } from '../../../entities/service/service-data';

export interface UpdateService {
  updateStatus(): Promise<ServiceData[]>;
}
