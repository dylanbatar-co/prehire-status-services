import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handle(
    HttpRequest: HttpRequest,
    HttpResponse: HttpResponse
  ): Promise<HttpResponse>;
}
