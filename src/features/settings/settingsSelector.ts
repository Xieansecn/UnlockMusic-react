import type { DecryptCommandOptions } from '~/decrypt-worker/types';
import type { RootState } from '~/store';
import { hasOwn } from '~/util/objects';

export const selectStagingQMCv2Settings = (state: RootState) => state.settings.staging.qmc2;
export const selectFinalQMCv2Settings = (state: RootState) => state.settings.production.qmc2;

export const selectDecryptOptionByFile = (state: RootState, name: string): DecryptCommandOptions => {
  const normalizedName = name.normalize();
  const qmc2Keys = selectFinalQMCv2Settings(state).keys;

  return {
    qmc2Key: hasOwn(qmc2Keys, normalizedName) ? qmc2Keys[normalizedName] : undefined,
  };
};
