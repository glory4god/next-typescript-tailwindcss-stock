import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetcher from '../../fetcher';
import { RootState } from '../store';

export interface KakaoLoginProps {
  loading: boolean;
  access_token: string;
}

const initialState: KakaoLoginProps = {
  loading: false,
  access_token: '',
};

export const kakaoLoginSlice = createSlice({
  name: 'kakaologin',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      state.loading = false;
    },
    loginFail: (state) => {
      state.loading = false;
    },
  },
});

export const { login, loginSuccess, loginFail } = kakaoLoginSlice.actions;
export const selectKakaoLogin = (state: RootState) => state.login;

export default kakaoLoginSlice.reducer;

export function getAccessToken(code: string) {
  return async (dispatch: any) => {
    dispatch(login());
    try {
      const tokenData = await getToken(code);
      dispatch(loginSuccess(tokenData.access_token));
      localStorage.setItem('token', tokenData.access_token);
      alert('로그인에 성공했습니다!');
    } catch (error) {
      dispatch(loginFail());
      alert('로그인에 실패했습니다!');
    }
  };
}

export const getToken = async (code: string | null) => {
  return (await fetcher(
    `http://localhost:8080/api/v2/login/callback/kakao?code=${code}`,
  )) as TokenData;
};

export type TokenData = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  refresh_token_expires_in: string;
};
