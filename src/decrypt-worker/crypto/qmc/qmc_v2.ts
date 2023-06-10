import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import type { DecryptCommandOptions } from '~/decrypt-worker/types.ts';
import { SEED, ENC_V2_KEY_1, ENC_V2_KEY_2 } from './qmc_v2.key.ts';
import { fetchParakeet } from '@jixun/libparakeet';

export class QMC2Crypto implements CryptoBase {
  cryptoName = 'QMC/v2';
  checkByDecryptHeader = false;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    // FIXME: Move the cleanup to transformBlob
    const mod = await fetchParakeet();
    const footerParser = mod.make.QMCv2FooterParser(SEED, ENC_V2_KEY_1, ENC_V2_KEY_2);
    return transformBlob(buffer, (p) => p.make.QMCv2(footerParser)).finally(() => {
      footerParser.delete();
    });
  }

  public static make() {
    return new QMC2Crypto();
  }
}

export class QMC2CryptoWithKey implements CryptoBase {
  cryptoName = 'QMC/v2 (key)';
  checkByDecryptHeader = true;

  async checkBySignature(_buffer: ArrayBuffer, options: DecryptCommandOptions): Promise<boolean> {
    return Boolean(options.qmc2Key);
  }

  async decrypt(buffer: ArrayBuffer, options: DecryptCommandOptions): Promise<Blob> {
    if (!options.qmc2Key) {
      throw new Error('key was not provided');
    }

    // FIXME: Move the cleanup to transformBlob
    const mod = await fetchParakeet();
    const textEncoder = new TextEncoder();
    const key = textEncoder.encode(options.qmc2Key);
    const keyCrypto = mod.make.QMCv2KeyCrypto(SEED, ENC_V2_KEY_1, ENC_V2_KEY_2);
    return transformBlob(buffer, (p) => p.make.QMCv2EKey(key, keyCrypto));
  }

  public static make() {
    return new QMC2CryptoWithKey();
  }
}
