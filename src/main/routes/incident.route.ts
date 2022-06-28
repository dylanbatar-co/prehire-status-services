import { Router } from 'express';
import { adapterRouterJson } from '../adapters/express-adapter';
import { makeGetIncidentHistory } from '../factories/incident';
import { validateContract } from '../middleware/celebrate-contract';
import { getIncidentHistoryValidation } from '../validations/incident';

const router = Router();

router.get('/history/:date', validateContract(getIncidentHistoryValidation), adapterRouterJson(makeGetIncidentHistory()));

export default router;
