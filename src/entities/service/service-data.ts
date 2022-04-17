import { IncidentData } from "../incident/incident-data";
export interface ServiceData {
  uuid: string;
  name: string;
  url: string;
  owner: string;
  incidents: IncidentData[];
  status: 'pass' | 'warn' | 'fail' | 'pass';
}
