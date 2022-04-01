import { ServiceData } from '../../../../entities/service/service-data';
import { ServiceRepository } from '../../../../usecases/service/ports/service-repository';
import { MongoHelper } from '../helpers/mongo-conection';

// export class MongodbUserRepository implements ServiceRepository {
//   private mongoHelper = new MongoHelper<ServiceData>();
//   constructor() {}

//   async createIncident(id: string): Promise<ServiceData> {

//   }

//   findServiceByOwner(owner: string): Promise<ServiceData[]> {}
//   updateService(id: string, data: ServiceData): Promise<ServiceData> {}

//   async create(service: ServiceData): Promise<ServiceData> {
//     const serviceCollection = await this.mongoHelper.getCollection('services');
//     await serviceCollection.insertOne(service);
//     return service;
//   }
// }
