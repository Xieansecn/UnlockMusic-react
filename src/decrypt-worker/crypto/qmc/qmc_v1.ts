import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import key from './qmc_v1.key.ts';

export class QMC1Crypto implements CryptoBase {
  cryptoName = 'QMCv1';
  checkByDecryptHeader = true;
  decryptTargetAudio = true;

  async decrypt(_buffer: ArrayBuffer, blob: Blob): Promise<Blob> {
    return transformBlob(blob, (p) => p.make.QMCv1(key));
  }
}
