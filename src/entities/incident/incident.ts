import { IncidentData } from './incident-data';
import { v4 as uuidv4 } from 'uuid';
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
      id: uuidv4(),
      name,
      fixed,
      description,
      date: new Date(),
    };

    return incidentObj;
  }
}
