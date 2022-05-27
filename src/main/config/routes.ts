import { Express, Router } from 'express';

import { incidentRoute, serviceRoute } from '../routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  router.use('/service', serviceRoute);
  router.use('/incident', incidentRoute);
};
