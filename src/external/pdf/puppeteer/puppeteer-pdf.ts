import Puppeteer, { Browser, Page } from 'puppeteer';
import { MakeReport } from '../../../usecases/ports/report';

export class PuppeteerPDF implements MakeReport {
  private browser: Browser;
  private page: Page;
  private readonly SCREENSHOT_QUALITY = 20;
  private readonly SCREENSHOT_TYPE = 'jpeg';

  private async setup(): Promise<Page> {
    if (!this.browser || !this.page) {
      this.browser = await Puppeteer.launch();
      this.page = await this.browser.newPage();
    }

    return this.page;
  }

  public async createPDF(data: { url: string; path: string }[]): Promise<any> {
    const screenShotPromises = data.map((item) => this.takeScreenShot(item.url, item.path));
    await Promise.all(screenShotPromises);
    // this.page.pdf()
    return;
  }

  private async takeScreenShot(url: string, path: string): Promise<void> {
    await this.setup();
    await this.page.goto(url);
    await this.page.screenshot({ path, quality: this.SCREENSHOT_QUALITY, type: this.SCREENSHOT_TYPE });
    this.closeBrowser();
  }

  private async closeBrowser(): Promise<void> {
    await this.browser.close();
  }
}

const pdf = new PuppeteerPDF();

pdf
  .createPDF([{ url: 'https://google.com', path: 'foto.jpeg' }])
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
