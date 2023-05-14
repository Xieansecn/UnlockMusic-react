import { WorkerServerBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

import type { CryptoFactory } from './crypto/CryptoBase';
import { XiamiCrypto } from './crypto/xiami/xiami';
import { QMC1Crypto } from './crypto/qmc/qmc_v1';
import { fetchParakeet } from '@jixun/libparakeet';

const bus = new WorkerServerBus();
onmessage = bus.onmessage;

const decryptorFactories: CryptoFactory[] = [
  // Xiami (*.xm)
  () => new XiamiCrypto(),

  // QMCv1 (*.qmcflac)
  () => new QMC1Crypto(),
];

// Use first 4MiB of the file to perform check.
const TEST_FILE_HEADER_LEN = 1024 * 1024 * 4;

bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, async (blobURI) => {
  const blob = await fetch(blobURI).then((r) => r.blob());
  const parakeet = await fetchParakeet();

  for (const factory of decryptorFactories) {
    const decryptor = factory();
    if (await decryptor.isSupported(blob)) {
      const decryptedBlob = await decryptor.decrypt(blob);

      // Check if we had a successful decryption
      const header = await decryptedBlob.slice(0, TEST_FILE_HEADER_LEN).arrayBuffer();
      const audioExt = parakeet.detectAudioExtension(header);
      if (!decryptor.hasSignature() && audioExt === 'bin') {
        // skip this decryptor result
        continue;
      }

      return { decrypted: URL.createObjectURL(decryptedBlob), ext: audioExt };
    }
  }

  throw new Error('could not decrypt file: no working decryptor found');
});
