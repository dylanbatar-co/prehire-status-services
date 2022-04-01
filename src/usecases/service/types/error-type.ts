import { UseCaseError } from '../../errors/usecase-error';

export class RegisterServiceError extends Error implements UseCaseError {
  constructor(message?: string) {
    super('Register Service Error.');
    this.name = 'RegisterServiceError';
    if (message) this.message = message;
  }
}

export class GetStatusServicesError extends Error implements UseCaseError {
  constructor(message?: string) {
    super('Get Status Services Error.');
    this.name = 'GetStatusServiceError';
    if (message) this.message = message;
  }
}
