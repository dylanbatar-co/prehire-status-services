import sinon, { SinonStub } from 'sinon';
import server from '../config/app';
import request from 'supertest';

import { InMemoryRepository } from '../../external/repositories/inMemoryRepository/in-memory-repository';
import { ServiceData } from '../../entities/service/service-data';

describe('GET /history/:date', () => {
  let getIncidentsByMonthStub: SinonStub;

  beforeEach(() => {
    getIncidentsByMonthStub = sinon.stub(InMemoryRepository.prototype, 'getIncidentsByMonth');
  });

  afterEach(() => {
    getIncidentsByMonthStub.restore();
  });

  const BASE_URL = '/api/incident/history';

  it('Should return empty array if doesnt exist issues', async () => {
    getIncidentsByMonthStub.returns([]);
    const response = await request(server).get(`${BASE_URL}/2022-01-01`);
    expect(response.body).toHaveLength(0);
  });

  it('Should return an array with last issues of last 3 months', async () => {
    const fakeResponse: ServiceData[] = [
      {
        uuid: '1',
        name: 'Fake service 1',
        owner: 'Fake owener 1',
        url: 'Fake url',
        status: 'pass',
        incidents: [
          {
            id: '1',
            name: 'Fake incident service 1',
            fixed: true,
            description: '',
            date: new Date('2022/06/01')
          }
        ]
      },
      {
        uuid: '2',
        name: 'Fake service 2',
        owner: 'Fake owener 2',
        url: 'Fake url 2',
        status: 'pass',
        incidents: [
          {
            id: '2',
            name: 'Fake incident service 2',
            fixed: true,
            description: '',
            date: new Date('2022/05/12')
          }
        ]
      },
      {
        uuid: '3',
        name: 'Fake service 3',
        owner: 'Fake owener 3',
        url: 'Fake url',
        status: 'pass',
        incidents: [
          {
            id: '3',
            name: 'Fake incident service 3',
            fixed: true,
            description: '',
            date: new Date('2022/09/01')
          },
          {
            id: '4',
            name: 'Fake incident service 4',
            fixed: true,
            description: '',
            date: new Date('2022/06/01')
          }
        ]
      },
      {
        uuid: '5',
        name: 'Fake service 5',
        owner: 'Fake owener 5',
        url: 'Fake url 4',
        status: 'pass',
        incidents: [
          {
            id: '5',
            name: 'Fake incident service 5',
            fixed: true,
            description: '',
            date: new Date('2022/05/01')
          }
        ]
      }
    ];

    getIncidentsByMonthStub.returns(fakeResponse);
    const response = await request(server).get(`${BASE_URL}/2022-07-01`);
    expect(response.body).toHaveLength(3);
  });
});
