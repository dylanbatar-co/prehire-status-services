import { UseCaseError } from '../../errors/usecase-error';

export class MakeReportServicesError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message);
    this.name = 'MakeReportServiceError';
  }
}
