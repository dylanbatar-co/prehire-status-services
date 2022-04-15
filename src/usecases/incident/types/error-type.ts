import { UseCaseError } from '../../errors/usecase-error';

export class RegisterNewIncidentError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message);
    this.name = 'RegisterNewIncidentError';
  }
}
