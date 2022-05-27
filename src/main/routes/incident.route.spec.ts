import sinon, { SinonStub } from 'sinon';
import server from '../config/app';
import request from 'supertest';

import { InMemoryRepository } from '../../external/repositories/inMemoryRepository/in-memory-repository';

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
    const response = await request(server).get(`${BASE_URL}/2022-01-01`);
    expect(response.body).toHaveLength(0);
  });

  it('Should return an array with last issues of last 3 months', async () => {
    const fakeResponse = [
      {
        'Jul 2022': {
          id: '1',
          name: 'Fake service 1',
          fixed: true,
          description: '',
          date: '2022-05-01'
        }
      },
      {
        'Jul 2022': {
          id: '2',
          name: 'Fake service 2',
          fixed: true,
          description: '',
          date: '2022-06-01'
        }
      },
      {
        'Jun 2022': {
          id: '3',
          name: 'Fake service 3',
          fixed: true,
          description: '',
          date: '2022-05-01'
        }
      }
    ];
    getIncidentsByMonthStub.returns(fakeResponse);
    const response = await request(server).get(`${BASE_URL}/2022-07-01`);
    expect(response.body).toHaveLength(3);
  });
});
