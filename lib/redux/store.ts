import { configureStore } from '@reduxjs/toolkit';
import reportSlice from './report/reportSlice';
import kakaoLoginSlice from './kakaoLogin/kakaoLoginSlice';

export const store = configureStore({
  reducer: {
    report: reportSlice,
    login: kakaoLoginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
