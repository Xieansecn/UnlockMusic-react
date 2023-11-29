import type { QingTingDeviceInfo } from '@jixun/libparakeet';

export interface DecryptCommandOptions {
  fileName: string;
  qmc2Key?: string;
  kwm2key?: string;
  qingTingAndroidDevice?: QingTingDeviceInfo;
}

export interface DecryptCommandPayload {
  id: string;
  blobURI: string;
  options: DecryptCommandOptions;
}
