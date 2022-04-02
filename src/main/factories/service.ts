import { GetStatusServicesController } from '../../adapters/service/get-status-services-controller';
import { RegisterServiceController } from '../../adapters/service/register-service-controller';
import { InMemoryRepository } from '../../external/repositories/inMemoryRepository/in-memory-repository';
import { GetStatusServices } from '../../usecases/service/search/get-status-service';
import { RegisterServiceOnStore } from '../../usecases/service/register/register-service-on-store';

const inMemoryRepository = new InMemoryRepository();

export const makeRegisterServiceController = (): RegisterServiceController => {
  const registerServiceOnStore = new RegisterServiceOnStore(inMemoryRepository);
  const registerServiceController = new RegisterServiceController(
    registerServiceOnStore
  );
  return registerServiceController;
};

export const makeGetStatusServices = (): GetStatusServicesController => {
  const getStatusServices = new GetStatusServices(inMemoryRepository);
  const getStatusController = new GetStatusServicesController(
    getStatusServices
  );
  return getStatusController;
};
