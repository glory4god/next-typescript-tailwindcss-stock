import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/dist/client/router';
import fetcher from '../../fetcher';
import { RootState } from '../store';

export interface KakaoLoginProps {
  loading: boolean;
  id: number;
  access_token: string;
  nickname: string;
  login: boolean;
}

const initialState: KakaoLoginProps = {
  loading: false,
  id: 0,
  access_token: '',
  nickname: '',
  login: false,
};

export const kakaoLoginSlice = createSlice({
  name: 'kakaologin',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.login = false;
    },
    loginSuccess: (state, action: PayloadAction<TokenData>) => {
      state.access_token = action.payload.access_token;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.loading = false;
      state.login = true;
    },
    loginFail: (state) => {
      state.loading = false;
      state.login = false;
    },

    logout: (state) => {
      state.loading = true;
      state.login = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.login = false;
      state.access_token = '';
      state.id = 0;
      state.nickname = '';
    },
    logoutFail: (state) => {
      state.loading = false;
      state.login = true;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFail,
  logout,
  logoutSuccess,
  logoutFail,
} = kakaoLoginSlice.actions;
export const selectKakaoLogin = (state: RootState) => state.login;

export default kakaoLoginSlice.reducer;

export function getAccessToken(code: string) {
  return async (dispatch: any) => {
    dispatch(login());
    try {
      const tokenData = await getToken(code);
      dispatch(loginSuccess(tokenData));
      console.log(tokenData);
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

export function kakaoLogout(token: string) {
  return async (dispatch: any) => {
    dispatch(logout());
    try {
      const id = (await fetcher(
        process.env.LOCAL_SERVER + `api/v2/logout/user?token=${token}`,
      )) as LogoutForm;
      if (id.id !== 0) {
        dispatch(logoutSuccess());
        alert('로그아웃에 성공했습니다!');
        console.log(id);
      }
    } catch (error) {
      dispatch(logoutFail());
      alert('로그아웃에 실패했습니다!');
    }
  };
}

export type TokenData = {
  id: number;
  nickname: string;
  access_token: string;
};

export type LogoutForm = {
  id: number;
};
