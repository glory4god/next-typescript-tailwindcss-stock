import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Subnavbar from '../../../components/common/Subnavbar';
import { Container } from '../../../components/ui';
import { fetchBulletinBoard } from '../../../lib/redux/bulletinBoard/bulletinBoardSlice';
import WritingBoard from '../../../components/board/WritingBoard';
import { useRouter } from 'next/dist/client/router';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';

const Writing = () => {
  const router = useRouter();
  const { login } = useSelector(selectKakaoLogin);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (login === true) {
      dispatch(fetchBulletinBoard());
    } else {
      alert('로그인 후 이용 가능합니다!');
      router.push(`http://localhost:3000/board/free`);
    }
  }, []);

  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'board',
          sub: { first: 'bulletin', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">WRITING BULLETIN BOARD</h2>
      <WritingBoard />
    </Container>
  );
};

export default Writing;
