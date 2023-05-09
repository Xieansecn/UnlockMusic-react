export enum DECRYPTION_WORKER_ACTION_NAME {
  DECRYPT = 'DECRYPT',
}

export interface DecryptionResult {
  decrypted: string; // blob uri
}
