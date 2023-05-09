export interface CryptoBase {
  isSupported(blob: Blob): Promise<boolean>;
  decrypt(blob: Blob): Promise<Blob>;
}

export type CryptoFactory = () => CryptoBase;
