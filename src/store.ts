import { combineReducers, configureStore } from '@reduxjs/toolkit';
import fileListingReducer from './features/file-listing/fileListingSlice';
import settingsReducer from './features/settings/settingsSlice';

const rootReducer = combineReducers({
  fileListing: fileListingReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
