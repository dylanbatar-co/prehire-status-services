export interface MakeReport {
  createPDF(data: { url: string; path: string }[]): Promise<any>;
}
