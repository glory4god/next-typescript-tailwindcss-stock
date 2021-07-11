import React from 'react';
import { GetStaticProps } from 'next';
import Subnavbar from '../../../components/common/Subnavbar';
import Container from '../../../components/ui/Container';
import fetcher from '../../../lib/fetcher';
import BoardList from '../../../components/report/BoardList';
import Button from '@material-ui/core/Button';
import { AutoCompleteInput } from '../../../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReport,
  selectReport,
} from '../../../components/report/reportSlice';

const ChartBoardPage = ({ kospiList }: { kospiList: Array<string> }) => {
  const [sorted, setSorted] = React.useState<string>('modifiedDate');
  const [currentCompany, setCurrentCompany] = React.useState<string>('전체');
  const { loading, reportList } = useSelector(selectReport);
  const dispatch = useDispatch();

  // const [loading, setLoading] = React.useState<boolean>(false);

  // const sortedHandler = async (
  //   companyName: string | undefined,
  //   sorted: string,
  // ) => {
  //   setLoading(true);
  //   const find = kospiList.find((element) => {
  //     if (element === companyName) {
  //       return true;
  //     }
  //   });
  //   if (find === undefined) {
  //     setSortedReport(report);
  //     if (companyName === '전체') {
  //       const res = (await fetcher(
  //         process.env.LOCAL_SERVER +
  //           `api/v1/user/chart-report/sort-all?sorted=${sorted}`,
  //       )) as Array<ChartReport>;
  //       setSortedReport(res);
  //     }
  //   } else {
  //     const res = (await fetcher(
  //       process.env.LOCAL_SERVER +
  //         `api/v1/user/chart-report/sorted/${companyName}?sorted=${sorted}`,
  //     )) as Array<ChartReport>;
  //     setSortedReport(res);
  //   }
  //   setLoading(false);
  // };

  React.useEffect(() => {
    dispatch(fetchReport(currentCompany, sorted));
    // sortedHandler(currentCompany, sorted);
  }, [currentCompany, sorted]);

  return (
    <Container>
      {console.log(reportList)}
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'free', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">CHART REPORT</h2>
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-36 pl-2">
            <AutoCompleteInput
              data={kospiList}
              id="list"
              value={currentCompany}
              onChange={(e: HTMLInputElement, newValue: string | undefined) => {
                if (newValue !== undefined) {
                  setCurrentCompany(newValue);
                }
              }}
            />
          </div>
          <Button
            size="small"
            onClick={() => {
              setCurrentCompany('전체');
            }}>
            전체
          </Button>
        </div>
        <div className="text-right">
          <Button
            size="small"
            style={{
              border: `${
                sorted === 'modifiedDate' ? '1px solid #818cf8' : 'none'
              }`,
            }}
            onClick={() => setSorted('modifiedDate')}
            disabled={loading}>
            {loading ? 'LATEST...' : 'LATEST'}
          </Button>
          <Button
            size="small"
            style={{
              border: `${sorted === 'good' ? '1px solid #818cf8' : 'none'}`,
            }}
            onClick={() => setSorted('good')}
            disabled={loading}>
            {loading ? 'HOT...' : 'HOT'}
          </Button>
          <Button
            size="small"
            style={{
              border: `${sorted === 'views' ? '1px solid #818cf8' : 'none'}`,
            }}
            onClick={() => setSorted('views')}
            disabled={loading}>
            {loading ? 'VIEWS...' : 'VIEWS'}
          </Button>
        </div>
      </div>
      <BoardList report={reportList} entire={true} listNumber={10} />
    </Container>
  );
};

export default React.memo(ChartBoardPage);

export const getStaticProps: GetStaticProps = async (context) => {
  const kospiList = (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/chart/companyname/kospi`,
  )) as Array<string>;
  return {
    props: { kospiList },
  };
};
