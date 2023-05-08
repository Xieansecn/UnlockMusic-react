import { WorkerServerBus } from '../util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

const bus = new WorkerServerBus();
onmessage = bus.onmessage;

bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, async (blobURI) => {
  const blob = await fetch(blobURI).then((r) => r.arrayBuffer());
  // TODO: Implement decryptor for blob received here.
  console.log(blob);
  return { hello: true };
});
