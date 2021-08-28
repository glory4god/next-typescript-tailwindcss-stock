import { configureStore } from '@reduxjs/toolkit';
import reportSlice from './report/reportSlice';
import kakaoLoginSlice from './kakaoLogin/kakaoLoginSlice';
import bulletinBoardSlice from './bulletinBoard/bulletinBoardSlice';

export const store = configureStore({
  reducer: {
    report: reportSlice,
    login: kakaoLoginSlice,
    bulletinBoard: bulletinBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
