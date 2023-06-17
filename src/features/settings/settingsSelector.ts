import type { DecryptCommandOptions } from '~/decrypt-worker/types';
import type { RootState } from '~/store';
import { closestByLevenshtein } from '~/util/levenshtein';
import { hasOwn } from '~/util/objects';

export const selectStagingQMCv2Settings = (state: RootState) => state.settings.staging.qmc2;
export const selectFinalQMCv2Settings = (state: RootState) => state.settings.production.qmc2;

export const selectStagingKWMv2Keys = (state: RootState) => state.settings.staging.kwm2.keys;

export const selectDecryptOptionByFile = (state: RootState, name: string): DecryptCommandOptions => {
  const normalizedName = name.normalize();

  let qmc2Key: string | undefined;
  const { keys: qmc2Keys, allowFuzzyNameSearch } = selectFinalQMCv2Settings(state);
  if (hasOwn(qmc2Keys, normalizedName)) {
    qmc2Key = qmc2Keys[normalizedName];
  } else if (allowFuzzyNameSearch) {
    const qmc2KeyStoreNames = Object.keys(qmc2Keys);
    if (qmc2KeyStoreNames.length > 0) {
      const closestName = closestByLevenshtein(normalizedName, qmc2KeyStoreNames);
      console.debug('qmc2: key db could not find %o, using closest %o instead.', normalizedName, closestName);
      qmc2Key = qmc2Keys[closestName];
    }
  }

  return {
    qmc2Key,
  };
};
