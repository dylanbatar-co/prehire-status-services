import sinon from 'sinon';

import { RegisterIncident } from './register-incident';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { ServiceData } from '../../../entities/service/service-data';

import { RegisterNewIncidentResponse } from '../types/response-type';
import { RegisterNewIncidentError } from '../types/error-type';

describe('Register Incident USE CASE', () => {
  let createIncidentStub: sinon.SinonStub;

  beforeEach(() => {
    createIncidentStub = sinon.stub(InMemoryRepository.prototype, 'createIncident');
  });

  afterEach(() => {
    createIncidentStub.restore();
  });

  it('Should add Incident to service', async () => {
    const fakeService: ServiceData = {
      uuid: '1',
      name: 'Fake service',
      owner: 'Fake owener',
      url: 'Fake url',
      status: 'fail',
      incidents: []
    };

    const inMemoryRepository = new InMemoryRepository();

    const registerEntity = new RegisterIncident(inMemoryRepository, fakeService);

    const registerIncidentResponse: RegisterNewIncidentResponse = await registerEntity.registerNewIncident();

    const { incidents } = registerIncidentResponse as ServiceData;

    expect(incidents).toHaveLength(1);
  });

  it('Should return error if document doesnt save in database', async () => {
    const fakeService: ServiceData = {
      uuid: '1',
      name: 'Fake service',
      owner: 'Fake owener',
      url: 'Fake url',
      status: 'fail',
      incidents: []
    };

    createIncidentStub.throws();
    const inMemoryRepository = new InMemoryRepository();

    const registerEntity = new RegisterIncident(inMemoryRepository, fakeService);

    const registerIncidentResponse: RegisterNewIncidentResponse = await registerEntity.registerNewIncident();

    const { message } = registerIncidentResponse as RegisterNewIncidentError;

    expect(message).toEqual('Error doesnt save in database');
  });
});
