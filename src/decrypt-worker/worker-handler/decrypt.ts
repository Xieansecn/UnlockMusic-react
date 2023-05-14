import { fetchParakeet } from '@jixun/libparakeet';
import { CryptoFactory } from '../crypto/CryptoBase';

import { XiamiCrypto } from '../crypto/xiami/xiami';
import { QMC1Crypto } from '../crypto/qmc/qmc_v1';
import { QMC2Crypto } from '../crypto/qmc/qmc_v2';

// Use first 4MiB of the file to perform check.
const TEST_FILE_HEADER_LEN = 1024 * 1024 * 4;

const decryptorFactories: CryptoFactory[] = [
  // Xiami (*.xm)
  () => new XiamiCrypto(),

  // QMCv1 (*.qmcflac)
  () => new QMC1Crypto(),

  // QMCv2 (*.mflac)
  () => new QMC2Crypto(),
];

export const workerDecryptHandler = async (blobURI: string) => {
  const blob = await fetch(blobURI).then((r) => r.blob());
  const parakeet = await fetchParakeet();

  for (const factory of decryptorFactories) {
    const decryptor = factory();
    if (await decryptor.isSupported(blob)) {
      try {
        const decryptedBlob = await decryptor.decrypt(blob);

        // Check if we had a successful decryption
        const header = await decryptedBlob.slice(0, TEST_FILE_HEADER_LEN).arrayBuffer();
        const audioExt = parakeet.detectAudioExtension(header);
        if (!decryptor.hasSignature() && audioExt === 'bin') {
          // skip this decryptor result
          continue;
        }

        return { decrypted: URL.createObjectURL(decryptedBlob), ext: audioExt };
      } catch (error) {
        console.error('decrypt failed: ', error);
        continue;
      }
    }
  }

  throw new Error('could not decrypt file: no working decryptor found');
};
