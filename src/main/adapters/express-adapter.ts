import { Request, Response } from 'express';
import { Controller } from '../../adapters/ports/controller';
import { HttpRequest } from '../../adapters/ports/http';

export const adapterRouter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const HttpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    };

    const httpResponse = await controller.handle(HttpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
