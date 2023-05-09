import { ConcurrentQueue } from '~/util/ConcurrentQueue';
import { WorkerClientBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

// TODO: Worker pool?
export const workerClient = new Worker(new URL('./worker', import.meta.url), { type: 'module' });

class DecryptionQueue extends ConcurrentQueue<{ id: string; blobURI: string }> {
  constructor(private workerClientBus: WorkerClientBus, maxQueue?: number) {
    super(maxQueue);
  }

  async handler(item: { id: string; blobURI: string }): Promise<void> {
    return this.workerClientBus.request(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, item.blobURI);
  }
}

export const decryptionQueue = new DecryptionQueue(new WorkerClientBus(workerClient));
