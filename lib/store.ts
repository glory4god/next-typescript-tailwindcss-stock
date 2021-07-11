import { configureStore } from '@reduxjs/toolkit';
import reportSlice from '../components/report/reportSlice';

export const store = configureStore({
  reducer: {
    report: reportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
