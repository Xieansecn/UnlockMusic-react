// Xiami file header
// offset  description
//   0x00  "ifmt"
//   0x04  Format name, e.g. "FLAC".
//   0x08  0xfe, 0xfe, 0xfe, 0xfe
//   0x0C  (3 bytes) Little-endian, size of data to copy without modification.
//         e.g. [ 8a 19 00 ] = 6538 bytes of plaintext data.
//   0x0F  (1 byte) File key, applied to
//   0x10  Plaintext data
//   ????  Encrypted data

import type { CryptoBase } from '../CryptoBase';

const XIAMI_FILE_MAGIC = new Uint8Array('ifmt'.split('').map((x) => x.charCodeAt(0)));
const XIAMI_EXPECTED_PADDING = new Uint8Array([0xfe, 0xfe, 0xfe, 0xfe]);

const u8Sub = (a: number, b: number) => {
  if (a > b) {
    return a - b;
  }

  return a + 0x100 - b;
};

export class XiamiCrypto implements CryptoBase {
  async isSupported(blob: Blob): Promise<boolean> {
    const headerBuffer = await blob.slice(0, 0x10).arrayBuffer();
    const header = new Uint8Array(headerBuffer);

    return (
      header.slice(0x00, 0x04).every((b, i) => b === XIAMI_FILE_MAGIC[i]) &&
      header.slice(0x08, 0x0c).every((b, i) => b === XIAMI_EXPECTED_PADDING[i])
    );
  }

  async decrypt(blob: Blob): Promise<Blob> {
    const headerBuffer = await blob.slice(0, 0x10).arrayBuffer();
    const header = new Uint8Array(headerBuffer);
    const key = u8Sub(header[0x0f], 1);
    const plainTextSize = header[0x0c] | (header[0x0d] << 8) | (header[0x0e] << 16);
    const decrypted = new Uint8Array(await blob.slice(0x10).arrayBuffer());
    for (let i = decrypted.byteLength - 1; i >= plainTextSize; i--) {
      decrypted[i] = u8Sub(key, decrypted[i]);
    }
    return new Blob([decrypted]);
  }
}
