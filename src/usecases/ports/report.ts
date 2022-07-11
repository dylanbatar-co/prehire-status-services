import { ReportData } from '../../entities/report/report-data';

export interface MakeReport {
  createPDF(data: ReportData[], name: string, output: string): Promise<string>;
}

export interface TakeScreenShot {
  takeScreenShot(urls: string[]): Promise<(Buffer | string)[]>;
}
