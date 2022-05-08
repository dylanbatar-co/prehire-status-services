import { ServiceData } from '../../../entities/service/service-data';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { GetIncidentHistory } from './get-incident-history';

describe('Get Incident History USECASE', () => {
  it('should return incident history of last 3 months', async () => {
    const fakeServices: ServiceData[] = [
      {
        uuid: '1',
        name: 'Fake service 1',
        owner: 'Fake owener 1',
        url: 'Fake url',
        status: 'pass',
        incidents: [
          {
            id: '1',
            name: 'Fake service 1',
            fixed: true,
            description: '',
            date: new Date('2022/01/01')
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
            name: 'Fake service 2',
            fixed: true,
            description: '',
            date: new Date('2022/01/01')
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
            name: 'Fake service 3',
            fixed: true,
            description: '',
            date: new Date('2022/06/01')
          },
          {
            id: '3',
            name: 'Fake service 3',
            fixed: true,
            description: '',
            date: new Date('2022/06/01')
          }
        ]
      },
      {
        uuid: '4',
        name: 'Fake service 4',
        owner: 'Fake owener 4',
        url: 'Fake url 4',
        status: 'pass',
        incidents: [
          {
            id: '4',
            name: 'Fake service 4',
            fixed: true,
            description: '',
            date: new Date('2022/05/01')
          }
        ]
      }
    ];

    const inMemoryRepository = new InMemoryRepository();

    fakeServices.forEach((fakeService) => inMemoryRepository.create(fakeService));

    const getIncidentHistory = new GetIncidentHistory(inMemoryRepository);

    const MONTH_TO_FILTER = new Date('2022/07/01');

    const incidentHistory = await getIncidentHistory.incidentHistory(MONTH_TO_FILTER);

    expect(incidentHistory).toHaveLength(3);
  });
});
