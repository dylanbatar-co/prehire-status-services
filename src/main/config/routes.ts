import { Express, Router } from 'express';

import { incidentRoute, serviceRoute, reportRoute } from '../routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  router.use('/service', serviceRoute);
  router.use('/incident', incidentRoute);
  router.use('/report', reportRoute);
};
