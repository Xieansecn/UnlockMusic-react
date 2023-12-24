export enum DECRYPTION_WORKER_ACTION_NAME {
  DECRYPT = 'DECRYPT',
  FIND_QMC_MUSICEX_NAME = 'FIND_QMC_MUSICEX_NAME',
  VERSION = 'VERSION',
}

export interface DecryptionResult {
  decrypted: string; // blob uri
  ext: string;
}
