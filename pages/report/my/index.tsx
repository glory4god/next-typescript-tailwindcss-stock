import React from 'react';
import { useSelector } from 'react-redux';
import Subnavbar from '../../../components/common/Subnavbar';
import { BoardList } from '../../../components/report';
import Container from '../../../components/ui/Container';
import fetcher from '../../../lib/fetcher';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';
import { ChartReport } from '../../../types/report/ReportType';

const My = () => {
  const { login, id, image } = useSelector(selectKakaoLogin);
  const [reportList, setReportList] = React.useState<Array<ChartReport>>([]);

  const getUserReportList = async (id: number) => {
    const res = (await fetcher(
      process.env.LOCAL_SERVER + `api/v1/user/chart-report/username?id=${id}`,
    )) as Array<ChartReport>;
    setReportList(res);
    console.log(res);
  };

  React.useEffect(() => {
    if (login) {
      getUserReportList(id);
    }
  }, [login, id]);

  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'free', second: 'chart', third: 'my' },
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
