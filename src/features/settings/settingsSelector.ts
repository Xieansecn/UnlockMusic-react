import type { DecryptCommandOptions } from '~/decrypt-worker/types';
import type { RootState } from '~/store';
import { hasOwn } from '~/util/objects';

export const selectDecryptOptionByFile = (state: RootState, name: string): DecryptCommandOptions => {
  const qmc2Keys = state.settings.qmc2.keys;

  return {
    qmc2Key: hasOwn(qmc2Keys, name) ? qmc2Keys[name] : undefined,
  };
};
