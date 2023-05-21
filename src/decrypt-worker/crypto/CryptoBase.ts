export interface CryptoBase {
  cryptoName: string;
  checkByDecryptHeader: boolean;

  /**
   * If set, this new extension will be used instead.
   * Useful for non-audio format, e.g. qrc to lrc/xml.
   */
  overrideExtension?: string;

  checkBySignature?: (buffer: ArrayBuffer) => Promise<boolean>;
  decrypt(buffer: ArrayBuffer, blob: Blob): Promise<Blob | ArrayBuffer>;
}

export type CryptoFactory = () => CryptoBase;
