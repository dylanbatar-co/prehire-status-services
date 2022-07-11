import { jsPDF } from 'jspdf';
import { MakeReport } from '../../../usecases/ports/report';
import { ReportData } from '../../../entities/report/report-data';

export class CreatePDF implements MakeReport {
  private readonly doc = new jsPDF();

  public async createPDF(data: ReportData[], name: string, output: string): Promise<string> {
    const filePath = `${output}/${name}`;
    this.doc.text('Report generated jsPDF', 10, 10);
    this.addData(data);
    this.doc.save(filePath);

    return filePath;
  }

  private addData(data: ReportData[]): void {
    data.map((item, index) => {
      const postionY = (index + 1) * 50;
      this.doc.text(item.url, 10, postionY);
      this.doc.addImage(item.image, 'jpeg', 10, postionY + 10, 300, 300);
      this.doc.addPage();
    });
  }
}
