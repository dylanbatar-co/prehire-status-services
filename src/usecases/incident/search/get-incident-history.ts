import { ServiceRepository } from '../../ports/service-repository';
import { IncidentHistory } from './incident-history';

export class GetIncidentHistory implements IncidentHistory {
  private readonly MONTH_TO_SHOW_THRESHOLD = 3;
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async incidentHistory(month: Date, limit: number = this.MONTH_TO_SHOW_THRESHOLD): Promise<any> {
    const monthBase: Date = month || new Date();
    const monthToRestar = 3;
    monthBase.setMonth(monthBase.getMonth() + 1 - monthToRestar);

    const response = await this.serviceRepository.getIncidentsByMonth(monthBase, limit);

    return response;
  }
}
