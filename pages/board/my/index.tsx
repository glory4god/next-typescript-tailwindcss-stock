import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Subnavbar from '../../../components/common/Subnavbar';
import { BoardList } from '../../../components/board';
import Container from '../../../components/ui/Container';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';
import {
  fetchUserReport,
  selectReport,
} from '../../../lib/redux/report/reportSlice';
import { GetServerSideProps } from 'next';

const My = () => {
  const { login, id, image } = useSelector(selectKakaoLogin);
  const { reportList } = useSelector(selectReport);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (login) {
      dispatch(fetchUserReport(id));
    }
  }, [login, id]);

  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'board',
          sub: { first: 'bulletin', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">my report</h2>
      {login ? (
        <BoardList reportList={reportList} listNumber={10}></BoardList>
      ) : (
        <div>로그인 후 이용이 가능합니다.</div>
      )}
    </Container>
  );
};

export default My;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};
