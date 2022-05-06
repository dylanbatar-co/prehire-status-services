import { Router } from 'express';
import { adapterRouter } from '../adapters/express-adapter';
import { makeGetStatusServices, makeRegisterServiceController } from '../factories/service';
import { validateContract } from '../middleware/celebrate-contract';
import { getStatusServicesValidation, registerServiceValidation } from '../validations/service';

export default (router: Router) => {
  router.post('/', validateContract(registerServiceValidation), adapterRouter(makeRegisterServiceController()));

  router.get('/:owner', validateContract(getStatusServicesValidation), adapterRouter(makeGetStatusServices()));
};
