import { GetIncidentHistoryController } from '../../adapters/incident/get-incident-history-controller';
import { InMemoryRepository } from '../../external/repositories/inMemoryRepository/in-memory-repository';
import { GetIncidentHistory } from '../../usecases/incident/search/get-incident-history';

const inMemoryRepository = new InMemoryRepository();

export const makeGetIncidentHistory = (): GetIncidentHistoryController => {
  const getIncidentHistory = new GetIncidentHistory(inMemoryRepository);
  const incidentHistoryController = new GetIncidentHistoryController(getIncidentHistory);
  return incidentHistoryController;
};
