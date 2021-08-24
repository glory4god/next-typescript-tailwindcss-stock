import { configureStore } from '@reduxjs/toolkit';
import reportSlice from './report/reportSlice';
import kakaoLoginSlice from './kakaoLogin/kakaoLoginSlice';
import freeBoardSlice from './freeBoard/freeBoardSlice';

export const store = configureStore({
  reducer: {
    report: reportSlice,
    login: kakaoLoginSlice,
    freeBoard: freeBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
