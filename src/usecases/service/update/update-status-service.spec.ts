import { UpdateStatusService } from './update-status-service';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { ServiceData } from '../../../entities/service/service-data';

describe('Update status service USE CASE', () => {
  it('Should return same status if the healthcheck of service is same', async () => {
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

    expect(services[0].status).toEqual(fakeServices[0].status);
  });

  it('Should return fail if healthcheck return fail status', async () => {
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

    expect(services[0].status).toEqual(fakeServices[0].status);
  });
});
