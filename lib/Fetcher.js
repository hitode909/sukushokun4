const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

class Fetcher {
  async getBrowser() {
    if (this._browser) return this._browser;
    const puppeteerOptions = {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    };
    const browser = await puppeteer.launch(puppeteerOptions);
    this._browser = browser;
    return this._browser;
  }

  async closeBrowser() {
    const browser = await this.getBrowser();
    await browser.close();
  }

  // returns [[filename, buffer]]
  async capture(uri) {
    const result = [];
    await Promise.all([
      this.capturePC(uri, result),
      this.captureSP(uri, result)
    ]);
    return result;
  }

  async capturePC(uri, result) {
    const page = await this.visit(uri);
    const jpgbuffer = await page.screenshot({ fullPage: true, type: 'jpeg' });
    const title = await page.title();
    const content = await page.content();
    result.push({ name: `(PC-JPG) ${uri}.jpg`, description: title, buffer: jpgbuffer });
    await page.emulateMedia('screen');
    const pdfbuffer = await page.pdf();
    result.push({ name: `(PC-PDF) ${uri}.pdf`, description: title, buffer: pdfbuffer });
    await page.close();
  }

  async captureSP(uri, result) {
    const page = await this.visit(uri, async (page) => { await page.emulate(iPhone); });
    const jpgbuffer = await page.screenshot({ fullPage: true, type: 'jpeg' });
    const title = await page.title();
    const content = await page.content();
    result.push({ name: `(SP-JPG) ${uri}.jpg`, description: title, buffer: jpgbuffer });
    await page.close();
  }

  async visit(uri, cb) {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    if (cb) {
      await cb(page);
    }
    await page.goto(uri, { timeout: 60 * 1000, waitUntil: 'domcontentloaded' });
    return page;
  }
};

module.exports = Fetcher;
