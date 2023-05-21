import { Parakeet, fetchParakeet } from '@jixun/libparakeet';
import { timedLogger } from '~/util/timedLogger';
import { allCryptoFactories } from '../../crypto/CryptoFactory';
import { toArrayBuffer, toBlob } from '~/decrypt-worker/util/buffer';
import { CryptoBase, CryptoFactory } from '~/decrypt-worker/crypto/CryptoBase';

// Use first 4MiB of the file to perform check.
const TEST_FILE_HEADER_LEN = 4 * 1024 * 1024;

class DecryptCommandHandler {
  private label: string;

  constructor(label: string, private parakeet: Parakeet, private blob: Blob, private buffer: ArrayBuffer) {
    this.label = `DecryptCommandHandler( ${label} )`;
  }

  log<R>(label: string, fn: () => R): R {
    return timedLogger(`${this.label}: ${label}`, fn);
  }

  async decrypt(factories: CryptoFactory[]) {
    for (const factory of factories) {
      const decryptor = factory();

      try {
        const result = await this.decryptFile(decryptor);
        if (result === null) {
          continue;
        }
        return result;
      } catch (error) {
        console.error('decrypt failed: ', error);
        continue;
      }
    }

    throw new Error('could not decrypt file: no working decryptor found');
  }

  async decryptFile(crypto: CryptoBase) {
    if (crypto.checkBySignature && !(await crypto.checkBySignature(this.buffer))) {
      return null;
    }

    if (crypto.checkByDecryptHeader && !(await this.acceptByDecryptFileHeader(crypto))) {
      return null;
    }

    const decrypted = await this.log('decrypt', async () => crypto.decrypt(this.buffer, this.blob));

    // Check if we had a successful decryption
    const audioExt = await this.log(`detect-audio-ext`, async () => {
      const header = await toArrayBuffer(decrypted.slice(0, TEST_FILE_HEADER_LEN));
      return this.parakeet.detectAudioExtension(header);
    });

    return { decrypted: URL.createObjectURL(toBlob(decrypted)), ext: audioExt };
  }

  async acceptByDecryptFileHeader(crypto: CryptoBase): Promise<boolean> {
    // File too small, ignore.
    if (this.buffer.byteLength <= TEST_FILE_HEADER_LEN) {
      return true;
    }

    // Check by decrypt max first 8MiB
    const decryptedBuffer = await this.log(`${crypto.cryptoName}/decrypt-header-test`, async () =>
      toArrayBuffer(
        await crypto.decrypt(this.buffer.slice(0, TEST_FILE_HEADER_LEN), this.blob.slice(0, TEST_FILE_HEADER_LEN))
      )
    );

    return this.parakeet.detectAudioExtension(decryptedBuffer) !== 'bin';
  }
}

export const workerDecryptHandler = async ({ id, blobURI }: { id: string; blobURI: string }) => {
  const label = `decrypt( ${id} )`;
  console.group(label);

  try {
    return await timedLogger(`${label}/total`, async () => {
      const parakeet = await timedLogger(`${label}/init`, fetchParakeet);
      const blob = await timedLogger(`${label}/fetch-src`, async () => fetch(blobURI).then((r) => r.blob()));
      const buffer = await timedLogger(`${label}/read-src`, async () => blob.arrayBuffer());

      const handler = new DecryptCommandHandler(id, parakeet, blob, buffer);
      return handler.decrypt(allCryptoFactories);
    });
  } finally {
    (console.groupEnd as (label: string) => void)(label);
  }
};
