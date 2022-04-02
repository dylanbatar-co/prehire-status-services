import { UseCaseError } from '../../errors/usecase-error';

export class RegisterServiceError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message);
    this.name = 'RegisterServiceError';
  }
}

export class GetStatusServicesError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message);
    this.name = 'GetStatusServiceError';
  }
}
