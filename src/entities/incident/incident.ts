import { IncidentData } from './incident-data';

export class Incident {
  constructor() {}

  static create(
    name: string,
    description?: string,
    fixed: boolean = false
  ): IncidentData {
    if (!name) {
      return;
    }

    let incidentObj: IncidentData = {
      name,
      fixed,
      description,
      date: new Date(),
    };

    return incidentObj;
  }
}
