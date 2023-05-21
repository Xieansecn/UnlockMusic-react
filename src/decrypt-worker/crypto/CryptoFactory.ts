import { CryptoFactory } from './CryptoBase';

import { QMC1Crypto } from './qmc/qmc_v1';
import { QMC2Crypto } from './qmc/qmc_v2';
import { XiamiCrypto } from './xiami/xiami';

export const allCryptoFactories: CryptoFactory[] = [
  // Xiami (*.xm)
  XiamiCrypto.make,

  // QMCv2 (*.mflac)
  QMC2Crypto.make,

  // Crypto that does not implement "checkBySignature" or need to decrypt the entire file and then check audio type,
  //   should be moved to the bottom of the list for performance reasons.

  // QMCv1 (*.qmcflac)
  QMC1Crypto.make,
];
