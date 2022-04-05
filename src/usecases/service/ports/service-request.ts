export interface ServiceRequest {
  requestStatus(healthUrl: string): Promise<any>;
}
