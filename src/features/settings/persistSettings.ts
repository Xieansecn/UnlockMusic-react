import { debounce } from 'radash';
import { produce } from 'immer';

import type { AppStore } from '~/store';
import { SettingsState, settingsSlice, updateSettings } from './settingsSlice';
import { enumObject } from '~/util/objects';
import { getLogger } from '~/util/logUtils';

const DEFAULT_STORAGE_KEY = 'um-react-settings';

function mergeSettings(settings: SettingsState): SettingsState {
  return produce(settingsSlice.getInitialState(), (draft) => {
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
    const loadedSettings: SettingsState = JSON.parse(localStorage.getItem(storageKey) ?? '');
    if (loadedSettings) {
      const mergedSettings = mergeSettings(loadedSettings);
      store.dispatch(updateSettings(mergedSettings));
      getLogger().debug('settings loaded');
    }
  } catch {
    // load failed, ignore.
  }

  return store.subscribe(
    debounce({ delay: 150 }, () => {
      const currentSettings = store.getState().settings;
      if (lastSettings !== currentSettings) {
        lastSettings = currentSettings;
        localStorage.setItem(storageKey, JSON.stringify(currentSettings));
        getLogger().debug('settings saved');
      }
    })
  );
}
