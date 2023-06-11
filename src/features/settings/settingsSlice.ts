import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { objectify } from 'radash';

export interface StagingSettings {
  qmc2: {
    keys: { id: string; name: string; key: string }[];
  };
}

export interface ProductionSettings {
  qmc2: {
    keys: Record<string, string>; // {  [fileName]: ekey  }
  };
}

export interface SettingsState {
  staging: StagingSettings;
  production: ProductionSettings;
}
const initialState: SettingsState = {
  staging: {
    qmc2: {
      keys: [],
    },
  },
  production: {
    qmc2: {
      keys: {},
    },
  },
};

const stagingToProduction = (staging: StagingSettings): ProductionSettings => ({
  qmc2: {
    keys: objectify(
      staging.qmc2.keys,
      (item) => item.name.normalize(),
      (item) => item.key.trim()
    ),
  },
});

const productionToStaging = (production: ProductionSettings): StagingSettings => ({
  qmc2: {
    keys: Object.entries(production.qmc2.keys).map(([name, key]) => ({ id: nanoid(), name, key })),
  },
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProductionChanges: (_state, { payload }: PayloadAction<ProductionSettings>) => {
      return {
        production: payload,
        staging: productionToStaging(payload),
      };
    },
    qmc2AddKey(state) {
      state.staging.qmc2.keys.push({ id: nanoid(), name: '', key: '' });
    },
    qmc2ImportKeys(state, { payload }: PayloadAction<{ name: string; key: string }[]>) {
      const newItems = payload.map((item) => ({ id: nanoid(), ...item }));
      state.staging.qmc2.keys.push(...newItems);
    },
    qmc2DeleteKey(state, { payload: { id } }: PayloadAction<{ id: string }>) {
      const qmc2 = state.staging.qmc2;
      qmc2.keys = qmc2.keys.filter((item) => item.id !== id);
    },
    qmc2UpdateKey(
      state,
      { payload: { id, field, value } }: PayloadAction<{ id: string; field: 'name' | 'key'; value: string }>
    ) {
      const keyItem = state.staging.qmc2.keys.find((item) => item.id === id);
      if (keyItem) {
        keyItem[field] = value;
      }
    },
    qmc2ClearKeys(state) {
      state.staging.qmc2.keys = [];
    },
    discardStagingChanges: (state) => {
      state.staging = productionToStaging(state.production);
    },
    commitStagingChange: (state) => {
      const production = stagingToProduction(state.staging);
      return {
        // Sync back to staging
        staging: productionToStaging(production),
        production,
      };
    },
    resetConfig: () => {
      return initialState;
    },
  },
});

export const {
  setProductionChanges,
  resetConfig,

  qmc2AddKey,
  qmc2UpdateKey,
  qmc2DeleteKey,
  qmc2ClearKeys,
  qmc2ImportKeys,

  commitStagingChange,
  discardStagingChanges,
} = settingsSlice.actions;

export default settingsSlice.reducer;
