import puppeteer, { Page } from 'puppeteer';
import { MakeReport } from '../../../usecases/ports/report';

export class PuppeteerPDF implements MakeReport {
  async getPage(): Promise<Page> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('');
    await page.screenshot();

    return page;
  }

  async createPDF(): Promise<any> {
    return;
  }
}
