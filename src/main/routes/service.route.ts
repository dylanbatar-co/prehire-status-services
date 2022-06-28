import { Router } from 'express';
import { adapterRouterJson } from '../adapters/express-adapter';
import { makeGetStatusServices, makeRegisterServiceController } from '../factories/service';
import { validateContract } from '../middleware/celebrate-contract';
import { getStatusServicesValidation, registerServiceValidation } from '../validations/service';

const router = Router();

router.post('/', validateContract(registerServiceValidation), adapterRouterJson(makeRegisterServiceController()));
router.get('/:owner', validateContract(getStatusServicesValidation), adapterRouterJson(makeGetStatusServices()));

export default router;
