export interface CryptoBase {
  /**
   * When returning false, a successful decryption should be checked by its decrypted content instead.
   */
  hasSignature(): boolean;
  isSupported(blob: Blob): Promise<boolean>;
  decrypt(blob: Blob): Promise<Blob>;
}

export type CryptoFactory = () => CryptoBase;
