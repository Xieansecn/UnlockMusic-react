import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface QMCSettings {
  keys: Record<string, string>; // {  [fileName]: ekey  }
}

export interface SettingsState {
  qmc2: QMCSettings;
}

const initialState: SettingsState = {
  qmc2: { keys: {} },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (_state, { payload }: PayloadAction<SettingsState>) => {
      return payload;
    },
    resetConfig: () => {
      return initialState;
    },
  },
});

export const { updateSettings, resetConfig } = settingsSlice.actions;

export default settingsSlice.reducer;
