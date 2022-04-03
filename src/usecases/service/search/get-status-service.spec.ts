import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { GetStatusServices } from './get-status-service';
import { RegisterServiceOnStore } from '../register/register-service-on-store';
import { ServiceData } from '../../../entities/service/service-data';
import { GetStatusServicesResponse } from '../types/response-type';

describe('USECASE: Get status services', () => {
  it('Should return a services if the owner exists ', async () => {
    const fakeService: ServiceData = {
      uuid: '1',
      name: 'fake service',
      owner: 'fake owner',
      incidents: [],
      url: 'www.fakeservice.test',
      status: 'pass',
    };

    const inMemoryRepository = new InMemoryRepository();
    const registerService = new RegisterServiceOnStore(inMemoryRepository);
    const getStatusServices = new GetStatusServices(inMemoryRepository);

    await registerService.registerServiceOnStore(fakeService);

    const OWNER_TO_FIND = 'fake owner';

    const getStatusServiceResponse: GetStatusServicesResponse =
      await getStatusServices.getStatusServices(OWNER_TO_FIND);

    getStatusServiceResponse as ServiceData[];

    expect(getStatusServiceResponse).toHaveLength(1);
  });

  it('Should return a empty array if the owner doen`t exist', async () => {
    const inMemoryRepository = new InMemoryRepository();
    const getStatusServices = new GetStatusServices(inMemoryRepository);

    const OWNER_TO_FIND = 'not exist owner';

    const getStatusServiceResponse: GetStatusServicesResponse =
      await getStatusServices.getStatusServices(OWNER_TO_FIND);

    getStatusServiceResponse as ServiceData[];

    expect(getStatusServiceResponse).toHaveLength(0);
  });
});
