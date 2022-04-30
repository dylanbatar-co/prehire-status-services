import { IncidentData } from '../../../entities/incident/incident-data';
import { ServiceData } from '../../../entities/service/service-data';
import { ServiceRepository } from '../../service/ports/service-repository';
import { UpdateIncidentError } from '../types/error-type';
import { UpdateIncidentResponse } from '../types/response-type';

export class UpdateIncident {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public async updateIncident(
    data?: ServiceData
  ): Promise<UpdateIncidentResponse> {
    const lastIncident = this.getLastIncidentOpen(data);
    const incident = this.changeIncidentStatus(lastIncident, data.status);
    const updateData = this.formatDataForUpdate(data, incident);

    await this.serviceRepository
      .updateIncident(incident.id, updateData)
      .catch(() => {
        new UpdateIncidentError('Update Incident Error');
      });
    return data;
  }

  private getLastIncidentOpen(service: ServiceData): IncidentData {
    const [incident] = service.incidents.filter((incident) => !incident.fixed);
    return incident;
  }

  private changeIncidentStatus(
    incident: IncidentData,
    status: string
  ): IncidentData {
    const updateIncident: IncidentData = { ...incident };
    if (status === 'fail' && !incident.fixed) {
      updateIncident.fixed = false;
    }

    updateIncident.fixed = true;
    return updateIncident;
  }

  private formatDataForUpdate(
    service: ServiceData,
    incidentUpdate: IncidentData
  ): ServiceData {
    const { id } = this.getLastIncidentOpen(service);

    const incidentsUpdate = service.incidents.map((incident) => {
      if (incident.id === id) {
        return incidentUpdate;
      }

      return incident;
    });

    const serviceIncidentsUpdated: ServiceData = {
      ...service,
      incidents: incidentsUpdate,
    };

    return serviceIncidentsUpdated;
  }
}
