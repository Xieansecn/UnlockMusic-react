export abstract class ConcurrentQueue<T> {
  protected items: [T, (result: any) => void, (error: Error) => void][] = [];
  protected currentlyWorking = 0;

  constructor(protected maxQueue = 5) {}

  abstract handler(item: T): Promise<void>;

  public async add<R = never>(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.items.push([item, resolve, reject]);
      this.runWorkerIfFree();
    });
  }

  private runWorkerIfFree() {
    if (this.currentlyWorking < this.maxQueue) {
      this.currentlyWorking++;
      this.processQueue()
        .catch((e) => {
          console.error('process queue with error', e);
        })
        .finally(() => {
          this.currentlyWorking--;
        });
    }
  }

  private async processQueue() {
    while (true) {
      const item = this.items.pop();
      if (item === undefined) {
        break;
      }

      const [payload, resolve, reject] = item;
      await this.handler(payload).then(resolve).catch(reject);
    }
  }
}
