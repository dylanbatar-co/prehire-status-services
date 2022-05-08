import { Router } from 'express';
import { adapterRouter } from '../adapters/express-adapter';
import { makeGetIncidentHistory } from '../factories/incident';
import { validateContract } from '../middleware/celebrate-contract';
import { getIncidentHistoryValidation } from '../validations/incident';

export default (router: Router) => {
  router.get('/history/:date', validateContract(getIncidentHistoryValidation), adapterRouter(makeGetIncidentHistory()));
};
