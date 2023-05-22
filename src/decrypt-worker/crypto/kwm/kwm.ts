import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { KWM_KEY } from './kwm.key';

// v1 only
export class KWMCrypto implements CryptoBase {
  cryptoName = 'KWM';
  checkByDecryptHeader = true;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return transformBlob(buffer, (p) => p.make.KuwoKWM(KWM_KEY));
  }

  public static make() {
    return new KWMCrypto();
  }
}
