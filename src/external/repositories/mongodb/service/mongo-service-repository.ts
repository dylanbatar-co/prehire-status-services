import { ServiceData } from '../../../../entities/service/service-data';
import { ServiceRepository } from '../../../../usecases/service/ports/service-repository';
import { MongoHelper } from '../helpers/mongo-conection';

export class MongodbUserRepository implements ServiceRepository {
  createOrUpdateIncident(id: string): Promise<ServiceData> {}

  findServiceByOwner(owner: string): Promise<ServiceData[]> {}
  updateService(id: string, data: ServiceData): Promise<ServiceData> {}

  async create(service: ServiceData): Promise<ServiceData> {
    const serviceCollection = MongoHelper.getCollection('services');
    return serviceCollection.insertOne<ServiceData>(service);
  }
}
