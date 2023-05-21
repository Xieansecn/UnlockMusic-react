export interface CryptoBase {
  cryptoName: string;
  checkByDecryptHeader: boolean;
  decryptTargetAudio: boolean;

  checkBySignature?: (buffer: ArrayBuffer) => Promise<boolean>;
  decrypt(buffer: ArrayBuffer, blob: Blob): Promise<Blob | ArrayBuffer>;
}

export type CryptoFactory = () => CryptoBase;
