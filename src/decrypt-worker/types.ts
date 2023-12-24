export interface DecryptCommandOptions {
  fileName: string;
  qmc2Key?: string;
  kwm2key?: string;
  qingTingAndroidKey?: string;
}

export interface DecryptCommandPayload {
  id: string;
  blobURI: string;
  options: DecryptCommandOptions;
}

export interface FetchMusicExNamePayload {
  id: string;
  blobURI: string;
}
