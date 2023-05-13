import { WorkerServerBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

import type { CryptoFactory } from './crypto/CryptoBase';
import { XiamiCrypto } from './crypto/xiami/xiami';
import { QMC1Crypto } from './crypto/qmc/qmc_v1';

const bus = new WorkerServerBus();
onmessage = bus.onmessage;

const decryptorFactories: CryptoFactory[] = [
  // Xiami (*.xm)
  () => new XiamiCrypto(),
  () => new QMC1Crypto(),
];

bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, async (blobURI) => {
  debugger;
  const blob = await fetch(blobURI).then((r) => r.blob());

  for (const factory of decryptorFactories) {
    const decryptor = factory();
    if (await decryptor.isSupported(blob)) {
      const decrypted = await decryptor.decrypt(blob);
      return { decrypted: URL.createObjectURL(decrypted) };
    }
  }

  throw new Error('could not decrypt file: no working decryptor found');
});
