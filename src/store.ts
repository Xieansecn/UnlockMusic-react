import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import fileListingReducer from './features/file-listing/fileListingSlice';

const rootReducer = combineReducers({
  fileListing: fileListingReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
