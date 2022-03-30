import { UseCaseError } from '../../errors/usecase-error';

export class RegisterServiceError extends Error implements UseCaseError {
  constructor(message?: string) {
    super('Register Service Error.');
    this.name = 'RegisterServiceError';
    if (message) this.message = message;
  }
}
