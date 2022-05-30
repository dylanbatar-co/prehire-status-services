import { ReportData } from './report-data';

export class Report {
  private serviceToReport: ReportData[] = [];

  public static create(report: ReportData): ReportData {
    if (!report.owner || !report.url) {
      return;
    }

    return report;
  }

  public getServiceToReport(): ReportData[] {
    return this.serviceToReport;
  }
}
