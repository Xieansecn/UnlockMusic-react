export interface DecryptCommandOptions {
  qmc2Key?: string;
}

export interface DecryptCommandPayload {
  id: string;
  blobURI: string;
  options: DecryptCommandOptions;
}
