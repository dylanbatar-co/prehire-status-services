import { RegisterIncident } from './register-incident';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { ServiceData } from '../../../entities/service/service-data';

import { RegisterNewIncidentResponse } from '../types/response-type';

describe('Register Incident USE CASE', () => {
  it('Should add Incident to service', async () => {
    const fakeService: ServiceData = {
      uuid: '1',
      name: 'Fake service',
      owner: 'Fake owener',
      url: 'Fake url',
      status: 'fail',
    };

    const inMemoryRepository = new InMemoryRepository();

    const registerEntity = new RegisterIncident(
      inMemoryRepository,
      fakeService
    );

    const registerIncidentResponse: RegisterNewIncidentResponse =
      await registerEntity.registerNewIncident();

    const { incidents } = registerIncidentResponse as ServiceData;

    expect(incidents).toEqual(fakeService.incidents);
  });
});
