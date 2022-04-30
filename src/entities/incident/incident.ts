import { IncidentData } from './incident-data';
import { v4 as uuidv4 } from 'uuid';
export class Incident {
  static create(
    name: string,
    description?: string,
    fixed = false
  ): IncidentData {
    if (!name) {
      return;
    }

    const incidentObj: IncidentData = {
      id: uuidv4(),
      name,
      fixed,
      description,
      date: new Date(),
    };

    return incidentObj;
  }
}
