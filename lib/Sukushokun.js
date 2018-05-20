const Fetcher = require('./Fetcher');
const DriveClient = require('./DriveClient');
const Queue = require('promise-queue');

class Sukushokun {
  constructor() {
    this.fetcher = new Fetcher();
    this.driveClient = this.createDriveClient();
    this.downloadQueue = this.createQueue();
    this.uploadQueue = this.createQueue();
  }

  createDriveClient() {
    if (!process.env.GOOGLE_CREDENTIAL) {
      throw "Please set your service account's credentials JSON at GOOGLE_CREDENTIAL";
    }

    return new DriveClient(JSON.parse(process.env.GOOGLE_CREDENTIAL));
  }

  createQueue() {
    const DEFAULT_CONCURRENCY = 1;
    const maxConcurrent = + (process.env.NUM_WORKERS || DEFAULT_CONCURRENCY);
    const maxQueue = Infinity;
    return new Queue(maxConcurrent, maxQueue);
  }

  async download(target) {
    try {
      console.log(`Capturing ${target.uri}`);
      const screenshots = await this.fetcher.capture(target.uri);

      await Promise.all(
        screenshots.map(async (screenshot) => {
          await this.uploadQueue.add(async () => {
            const name = screenshot.name;
            console.log(`Uploading ${name}`);
            await this.driveClient.upload({
              ...screenshot,
              folderId: target.folderId,
            });
          });
        })
      );
    } catch (error) {
      console.warn(error);
    }
  }

  run() {
    (async () => {
      const targets = await this.driveClient.getTargets();

      await Promise.all(
        targets.map(async (target) => {
          await this.downloadQueue.add(async () => {
            await this.download(target);
          });
        })
      );

      console.log('Closing browser');
      await this.fetcher.closeBrowser();
      process.exit(0);
    })();
  }
};

module.exports = Sukushokun;
