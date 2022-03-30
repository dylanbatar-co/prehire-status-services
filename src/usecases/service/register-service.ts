import { ServiceData } from "../../entities/service/service-data";
import { RegisterServiceResponse } from "./types/response-type";

export interface RegisterService {
  registerServiceOnStore(service:ServiceData): Promise<RegisterServiceResponse>;
}
