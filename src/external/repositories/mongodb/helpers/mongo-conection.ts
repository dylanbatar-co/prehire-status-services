import { Collection, MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
export class MongoHelper<T> {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(MONGO_URL);
  }

  async connect(uri: string = MONGO_URL): Promise<void> {
    this.client = await MongoClient.connect(uri);
  }

  async disconnect(): Promise<void> {
    this.client.close();
  }

  async getCollection(name: string): Promise<Collection<T>> {
    return this.client.db().collection<T>(name);
  }

  async clearCollection(name: string): Promise<void> {
    this.client.db().collection(name).deleteMany({});
  }
}
