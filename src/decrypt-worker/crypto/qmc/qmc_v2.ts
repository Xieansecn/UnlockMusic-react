import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { SEED, ENC_V2_KEY_1, ENC_V2_KEY_2 } from './qmc_v2.key.ts';

export class QMC2Crypto implements CryptoBase {
  hasSignature(): boolean {
    return false;
  }

  async isSupported(): Promise<boolean> {
    return true;
  }

  async decrypt(blob: Blob): Promise<Blob> {
    return transformBlob(blob, (p) => p.make.QMCv2(p.make.QMCv2FooterParser(SEED, ENC_V2_KEY_1, ENC_V2_KEY_2)));
  }
}
