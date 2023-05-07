import { configureStore } from '@reduxjs/toolkit';
import fileListing from './features/file-listing/fileListingSlice';

export const store = configureStore({
  reducer: {
    fileListing: fileListing,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
