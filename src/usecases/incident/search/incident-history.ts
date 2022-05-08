export interface IncidentHistory {
  incidentHistory(month: Date, limit: number): Promise<any>;
}
