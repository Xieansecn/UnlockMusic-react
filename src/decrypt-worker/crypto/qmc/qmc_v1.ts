import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import key from './qmc_v1.key.ts';

export class QMC1Crypto implements CryptoBase {
  hasSignature(): boolean {
    return false;
  }

  async isSupported(): Promise<boolean> {
    return true;
  }

  async decrypt(blob: Blob): Promise<Blob> {
    return transformBlob(blob, (p) => p.make.QMCv1(key));
  }
}
