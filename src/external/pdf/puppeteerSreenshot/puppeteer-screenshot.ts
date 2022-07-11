import Puppeteer, { Browser, Page } from 'puppeteer';
import { TakeScreenShot } from '../../../usecases/ports/report';

export class PuppeteerScreenShot implements TakeScreenShot {
  private browser: Browser;
  private page: Page;
  private readonly SCREENSHOT_QUALITY = 20;
  private readonly SCREENSHOT_TYPE = 'jpeg';
  private readonly SCREENSHOT_ENCODING = 'base64';

  private async setup(): Promise<Page> {
    if (!this.browser || !this.page) {
      this.browser = await Puppeteer.launch({ headless: true });
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1200, height: 400 });
    }
    return this.page;
  }

  public async takeScreenShot(urls: string[]): Promise<(Buffer | string)[]> {
    const screenShots: (Buffer | string)[] = [];
    await this.setup();

    for (const url of urls) {
      await this.page.goto(url);
      const screenShotBase64 = await this.page.screenshot({
        quality: this.SCREENSHOT_QUALITY,
        type: this.SCREENSHOT_TYPE,
        encoding: this.SCREENSHOT_ENCODING,
        fullPage: true
      });
      screenShots.push(screenShotBase64);
    }

    this.closeBrowser();
    return screenShots;
  }

  private async closeBrowser(): Promise<void> {
    await this.page.close();
    await this.browser.close();
    this.page = null;
    this.browser = null;
  }
}
