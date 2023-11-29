import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { DecryptCommandOptions } from '~/decrypt-worker/types';

export class QingTingFM$Device implements CryptoBase {
  cryptoName = 'QingTing FM/Device ID';
  checkByDecryptHeader = false;

  async checkBySignature(_buffer: ArrayBuffer, options: DecryptCommandOptions) {
    return Boolean(/^\.p~?!.*\.qta$/.test(options.fileName) && options.qingTingAndroidDevice);
  }

  async decrypt(buffer: ArrayBuffer, options: DecryptCommandOptions): Promise<Blob> {
    const { fileName: name, qingTingAndroidDevice: qingTingDevice } = options;
    if (!qingTingDevice) {
      throw new Error('QingTingFM Device Info was not provided');
    }

    return transformBlob(buffer, (p) => p.make.QingTingFM(name, qingTingDevice));
  }

  public static make() {
    return new QingTingFM$Device();
  }
}
