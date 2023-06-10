import { debounce } from 'radash';
import { produce } from 'immer';

import type { AppStore } from '~/store';
import { settingsSlice, setProductionChanges, ProductionSettings } from './settingsSlice';
import { enumObject } from '~/util/objects';
import { getLogger } from '~/util/logUtils';

const DEFAULT_STORAGE_KEY = 'um-react-settings';

function mergeSettings(settings: ProductionSettings): ProductionSettings {
  return produce(settingsSlice.getInitialState().production, (draft) => {
    for (const [k, v] of enumObject(settings.qmc2?.keys)) {
      if (typeof v === 'string') {
        draft.qmc2.keys[k] = v;
      }
    }
  });
}

export function persistSettings(store: AppStore, storageKey = DEFAULT_STORAGE_KEY) {
  let lastSettings: unknown;

  try {
    const loadedSettings: ProductionSettings = JSON.parse(localStorage.getItem(storageKey) ?? '');
    if (loadedSettings) {
      const mergedSettings = mergeSettings(loadedSettings);
      store.dispatch(setProductionChanges(mergedSettings));
      getLogger().debug('settings loaded');
    }
  } catch {
    // load failed, ignore.
  }

  return store.subscribe(
    debounce({ delay: 150 }, () => {
      const currentSettings = store.getState().settings.production;
      if (lastSettings !== currentSettings) {
        lastSettings = currentSettings;
        localStorage.setItem(storageKey, JSON.stringify(currentSettings));
        getLogger().debug('settings saved');
      }
    })
  );
}
