import { DECRYPTION_WORKER_ACTION_NAME } from '~/decrypt-worker/constants';
import { ConcurrentQueue } from './ConcurrentQueue';
import { WorkerClientBus } from './WorkerEventBus';

export class DecryptionQueue extends ConcurrentQueue<{ id: string; blobURI: string }> {
  constructor(private workerClientBus: WorkerClientBus<DECRYPTION_WORKER_ACTION_NAME>, maxQueue?: number) {
    super(maxQueue);
  }

  async handler(item: { id: string; blobURI: string }): Promise<void> {
    return this.workerClientBus.request(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, item.blobURI);
  }
}
