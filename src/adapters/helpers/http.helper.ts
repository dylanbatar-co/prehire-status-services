import { HttpResponse } from '../ports/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
});

export const successRequest = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const serverError = (reason: string | Error) => ({
  statusCode: 500,
  body: reason
});
