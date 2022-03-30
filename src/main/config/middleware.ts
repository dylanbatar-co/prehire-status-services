import { Express } from 'express';
import { bodyParser, urlEnconde, corsOptions } from '../middleware';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(urlEnconde);
  app.use(corsOptions);
};
