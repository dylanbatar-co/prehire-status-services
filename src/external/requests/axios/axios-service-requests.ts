import axios from 'axios';
import { ServiceRequest } from '../../../usecases/service/ports/service-request';

export class AxiosServiceRequest implements ServiceRequest {
  async requestStatus(healthUrl: string): Promise<any> {
    const { data } = await axios.get(healthUrl);
    return data;
  }
}
