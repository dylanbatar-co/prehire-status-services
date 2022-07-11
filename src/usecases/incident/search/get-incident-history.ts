import { IncidentData } from '../../../entities/incident/incident-data';
import { ServiceData } from '../../../entities/service/service-data';
import { MONTHS } from '../../../shared/utils';
import { ServiceRepository } from '../../ports/service-repository';
import { IncidentHistory } from './incident-history';

export class GetIncidentHistory implements IncidentHistory {
  private readonly MONTH_TO_SHOW_THRESHOLD = 3;
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public async incidentHistory(
    month: Date,
    limit: number = this.MONTH_TO_SHOW_THRESHOLD
  ): Promise<{ [key: string]: IncidentData }[]> {
    const monthBase: Date = month || new Date();
    const monthToRestar = 3;
    monthBase.setMonth(monthBase.getMonth() + 1 - monthToRestar);

    const serviceResponse: ServiceData[] = await this.serviceRepository.getIncidentsByMonth(monthBase, limit);

    const incidentsFiltered = this.formatIncidentByMonth(serviceResponse, monthBase);

    return incidentsFiltered;
  }

  private formatIncidentByMonth(services: ServiceData[], month: Date): { [key: string]: IncidentData }[] {
    const incidentsFormat: { [key: string]: IncidentData }[] = [];
    for (const service of services) {
      const incidentByDate = service.incidents
        .filter((incident) => {
          if (incident.date.getTime() >= month.getTime()) {
            return incident;
          }
        })
        .map((incident) => {
          const majorDate = new Date(month);
          majorDate.setMonth(majorDate.getMonth() + 2);

          const minorLimit = incident.date.getTime() >= month.getTime();
          const majorLimit = incident.date.getTime() <= majorDate.getTime();

          if (minorLimit && majorLimit) {
            const monthNumber = incident.date.getMonth();
            const monthName = `${MONTHS[monthNumber]} ${incident.date.getFullYear()}`;

            const mapIncident = { [monthName]: incident };
            return mapIncident;
          }
        });

      if (incidentByDate.length) {
        incidentsFormat.push(...incidentByDate.filter(Boolean));
      }
    }

    return incidentsFormat;
  }
}
