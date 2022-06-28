import { MakeReportResponse } from "../types/response-types";

export interface MakeReport {
  makeReport(owner: string): Promise<MakeReportResponse>;
}
