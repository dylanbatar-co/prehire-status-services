import sinon from 'sinon';

import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { AxiosServiceRequest } from '../../../external/requests/axios/axios-service-requests';
import { GetStatusServices } from './get-status-service';
import { RegisterServiceOnStore } from '../register/register-service-on-store';
import { ServiceData } from '../../../entities/service/service-data';
import { GetStatusServicesResponse } from '../types/response-type';

describe('USECASE: Get status services', () => {
  let AxiosServiceRequestStub: sinon.SinonStub;

  beforeEach(() => {
    AxiosServiceRequestStub = sinon.stub(
      AxiosServiceRequest.prototype,
      'requestStatus'
    );
  });

  afterEach(() => {
    AxiosServiceRequestStub.restore();
  });

  it('Should return a services if the owner exists ', async () => {
    const fakeServices: ServiceData = {
      uuid: '1',
      name: 'fake service',
      owner: 'fake owner',
      incidents: [],
      url: 'http://fakewebsite/health.com',
      status: 'pass',
    };

    AxiosServiceRequestStub.returns({ status: 'pass' });

    const inMemoryRepository = new InMemoryRepository();
    const servicesRequest = new AxiosServiceRequest();

    const registerService = new RegisterServiceOnStore(inMemoryRepository);
    const getStatusServices = new GetStatusServices(
      inMemoryRepository,
      servicesRequest
    );

    await registerService.registerServiceOnStore(fakeServices);

    const OWNER_TO_FIND = 'fake owner';

    const getStatusServiceResponse: GetStatusServicesResponse =
      await getStatusServices.getStatusServices(OWNER_TO_FIND);

    getStatusServiceResponse as ServiceData[];

    expect(getStatusServiceResponse).toHaveLength(1);
  });

  it('Should return a empty array if the owner doen`t exist', async () => {
    const inMemoryRepository = new InMemoryRepository();
    const servicesRequest = new AxiosServiceRequest();

    const getStatusServices = new GetStatusServices(
      inMemoryRepository,
      servicesRequest
    );

    const OWNER_TO_FIND = 'not exist owner';

    const getStatusServiceResponse: GetStatusServicesResponse =
      await getStatusServices.getStatusServices(OWNER_TO_FIND);

    getStatusServiceResponse as ServiceData[];

    expect(getStatusServiceResponse).toHaveLength(0);
  });
});
