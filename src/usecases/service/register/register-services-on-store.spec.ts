import { ServiceData } from '../../../entities/service/service-data';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { RegisterServiceError } from '../types/error-type';
import { RegisterServiceResponse } from '../types/response-type';
import { RegisterServiceOnStore } from './register-service-on-store';
describe('USECASE: Register Service on store', () => {
  it('Register service successfully', async () => {
    const fakeService: ServiceData = {
      uuid: '1',
      name: 'fake service',
      owner: 'fake owner',
      incidents: [],
      url: 'www.fakeservice.test',
      status: 'pass',
    };

    const inMemoryRepository = new InMemoryRepository();
    const registerServiceOnStore = new RegisterServiceOnStore(
      inMemoryRepository
    );
    const registerServiceResponse =
      await registerServiceOnStore.registerServiceOnStore(fakeService);

    expect(registerServiceResponse).toEqual(fakeService);
  });

  it('Register service duplicate', async () => {
    const fakeService: ServiceData = {
      uuid: '1',
      name: 'fake service',
      owner: 'fake owner',
      incidents: [],
      url: 'www.fakeservice.test',
      status: 'pass',
    };

    const inMemoryRepository = new InMemoryRepository();
    const registerServiceOnStore = new RegisterServiceOnStore(
      inMemoryRepository
    );

    await registerServiceOnStore.registerServiceOnStore(fakeService);
    const registerServiceResponse: RegisterServiceResponse =
      await registerServiceOnStore.registerServiceOnStore(fakeService);

    const { message } = registerServiceResponse as RegisterServiceError;

    expect(registerServiceResponse).toBeInstanceOf(RegisterServiceError);
    expect(message).toBe('Service already created');
  });
});
