import { UpdateStatusService } from './update-status-service';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { ServiceData } from '../../../entities/service/service-data';

describe('Update status service USE CASE', () => {
  it('Should return pass status if the healthcheck of service is same', async () => {
    const fakeServices: ServiceData[] = [
      {
        uuid: '1',
        name: 'fake service',
        owner: 'fake owner',
        status: 'pass',
        url: 'www.fakeservice.test',
        incidents: [],
      },
    ];

    const inMemoryRepository = new InMemoryRepository();
    const updateStatusService = new UpdateStatusService(inMemoryRepository);

    const services = await updateStatusService.updateStatus(fakeServices, [
      { status: 'pass' },
    ]);

    expect(services[0].status).toBe('pass');
  });

  it('Should return status fail if healthcheck return fail status', async () => {
    const fakeServices: ServiceData[] = [
      {
        uuid: '1',
        name: 'fake service',
        owner: 'fake owner',
        status: 'pass',
        url: 'www.fakeservice.test',
        incidents: [],
      },
    ];

    const inMemoryRepository = new InMemoryRepository();
    const updateStatusService = new UpdateStatusService(inMemoryRepository);

    const services = await updateStatusService.updateStatus(fakeServices, [
      { status: 'fail' },
    ]);
    expect(services[0].status).toBe('fail');
  });

  it('Should return fail if healthcheck return fail status and it is have a active incident', async () => {
    const fakeServices: ServiceData[] = [
      {
        uuid: '1',
        name: 'fake service',
        owner: 'fake owner',
        status: 'fail',
        url: 'www.fakeservice.test',
        incidents: [
          {
            date: new Date(),
            fixed: false,
            name: 'fake service',
          },
        ],
      },
    ];

    const inMemoryRepository = new InMemoryRepository();
    const updateStatusService = new UpdateStatusService(inMemoryRepository);

    const services = await updateStatusService.updateStatus(fakeServices, [
      { status: 'fail' },
    ]);

    console.log(services[0].incidents);
    expect(services[0].status).toBe('fail');
  });

  it('Should return pass if healthcheck return pass status and it is have not a active incident', async () => {
    const fakeServices: ServiceData[] = [
      {
        uuid: '1',
        name: 'fake service',
        owner: 'fake owner',
        status: 'fail',
        url: 'www.fakeservice.test',
        incidents: [
          {
            date: new Date(),
            fixed: true,
            name: 'fake service',
          },
        ],
      },
    ];

    const inMemoryRepository = new InMemoryRepository();
    const updateStatusService = new UpdateStatusService(inMemoryRepository);

    const services = await updateStatusService.updateStatus(fakeServices, [
      { status: 'pass' },
    ]);

    expect(services[0].status).toBe('pass');
  });
});
