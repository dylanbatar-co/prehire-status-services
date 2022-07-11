import { ReportData } from './report-data';

export class Report {
  public static create(report: ReportData): ReportData {
    if (!report.url) {
      return;
    }

    return report;
  }

  public static getName(): string {
    const date = new Date();
    return (
      'REPORT_' +
      date.getMonth() +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear() +
      '-' +
      date.getHours() +
      '-' +
      date.getMinutes() +
      '.pdf'
    );
  }
}
