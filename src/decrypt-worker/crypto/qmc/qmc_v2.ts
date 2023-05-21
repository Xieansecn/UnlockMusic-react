import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { SEED, ENC_V2_KEY_1, ENC_V2_KEY_2 } from './qmc_v2.key.ts';

export class QMC2Crypto implements CryptoBase {
  cryptoName = 'QMC/v2';
  checkByDecryptHeader = false;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return transformBlob(buffer, (p) => p.make.QMCv2(p.make.QMCv2FooterParser(SEED, ENC_V2_KEY_1, ENC_V2_KEY_2)));
  }

  public static make() {
    return new QMC2Crypto();
  }
}
