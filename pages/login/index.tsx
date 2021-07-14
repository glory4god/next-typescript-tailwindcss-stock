import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/ui/Container';
import {
  getAccessToken,
  getToken,
  selectKakaoLogin,
} from '../../lib/redux/kakaoLogin/kakaoLoginSlice';

const Login = () => {
  const { access_token } = useSelector(selectKakaoLogin);
  const router = useRouter();

  const dispatch = useDispatch();
  React.useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    if (code !== null) {
      dispatch(getAccessToken(code));
      if (access_token !== '') {
        router.push(`http://localhost:3000/login`);
      } else {
        router.push(`http://localhost:3000/`);
      }
    }
  }, []);
  return (
    <Container>
      <div className="pt-28">login ... </div>
    </Container>
  );
};

export default Login;
