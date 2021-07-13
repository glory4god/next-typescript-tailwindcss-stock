import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface KakaoLoginProps {}

const initialState: KakaoLoginProps = {};

export const kakaoLoginSlice = createSlice({
  name: 'kakaologin',
  initialState,
  reducers: {
    kakaoLogin: (state, action: PayloadAction<string>) => {},
  },
});

export const { kakaoLogin } = kakaoLoginSlice.actions;
export const selectKakaoLogin = (state: RootState) => state.kakaologin;

export default kakaoLoginSlice.reducer;
