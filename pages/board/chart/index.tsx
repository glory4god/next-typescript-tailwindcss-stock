import React from 'react';
import { GetStaticProps } from 'next';
import Subnavbar from '../../../components/common/Subnavbar';
import Container from '../../../components/ui/Container';
import fetcher from '../../../lib/fetcher';
import BoardList from '../../../components/board/BoardList';
import Button from '@material-ui/core/Button';
import { AutoCompleteInput } from '../../../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReport,
  fetchSearchReport,
  selectReport,
} from '../../../lib/redux/report/reportSlice';
import { BoardSearchBar } from '../../../components/board';

export interface ButtonData {
  LATEST: string;
  HOT: string;
  VIEWS: string;
}

const sortedButton: ButtonData = {
  LATEST: 'modifiedDate',
  HOT: 'good',
  VIEWS: 'views',
};

const ChartBoardPage = ({ totalList }: { totalList: Array<string> }) => {
  const { loading, reportList } = useSelector(selectReport);
  const dispatch = useDispatch();

  const [sorted, setSorted] = React.useState<string>('modifiedDate');
  const [currentCompany, setCurrentCompany] = React.useState<string>('전체');
  const [condition, setCondition] = React.useState<string>('TITLE+CONTENT');
  const [value, setValue] = React.useState<string>('검색어를 입력하세요');

  // FIXME: using redux => complete
  // const [loading, setLoading] = React.useState<boolean>(false);

  // const sortedHandler = async (
  //   companyName: string | undefined,
  //   sorted: string,
  // ) => {
  //   setLoading(true);
  //   const find = totalList.find((element) => {
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
    if (value === '검색어를 입력하세요' || value === '전체') {
      dispatch(fetchReport(currentCompany, sorted));
    } else if (value !== '') {
      dispatch(fetchSearchReport(condition.toLowerCase(), value, sorted));
    }

    // sortedHandler(currentCompany, sorted);
  }, [currentCompany, sorted]);

  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'board',
          sub: { first: 'bulletin', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">CHART REPORT</h2>
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-36 pl-2">
            <AutoCompleteInput
              data={totalList}
              id="list"
              value={currentCompany}
              onChange={(e: HTMLInputElement, newValue: string | undefined) => {
                if (newValue !== undefined) {
                  setValue('검색어를 입력하세요');
                  setCurrentCompany(newValue);
                }
              }}
            />
          </div>
          <Button
            size="small"
            onClick={() => {
              setValue('검색어를 입력하세요');
              setCurrentCompany('전체');
              setSorted('modifiedDate');
              dispatch(fetchReport(currentCompany, sorted));
            }}>
            전체
          </Button>
        </div>
        <div className="text-right">
          {Object.keys(sortedButton).map((arr, idx) => {
            return (
              <span key={idx}>
                <Button
                  size="small"
                  // style={{
                  //   border: `${
                  //     sorted === sortedButton[arr]
                  //       ? '1px solid #818cf8'
                  //       : 'none'
                  //   }`,
                  // }}
                  // FIXME: ts error i dont know.....
                  onClick={(e) => {
                    e.preventDefault();
                    // setSorted(sortedButton[arr]);
                  }}
                  disabled={loading}>
                  {loading ? arr + '...' : arr}
                </Button>
              </span>
            );
          })}
          {
            // 버튼 여러개를 위처럼 반복문으로 처리!!
            /* <Button
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
          </Button> */
          }
        </div>
      </div>
      <BoardList reportList={reportList} listNumber={10} />
      <BoardSearchBar
        condition={condition}
        value={value}
        onSelectChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        ) => setCondition(e.target.value)}
        onInputChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        ) => setValue(e.target.value)}
        onInputClick={() => {
          setValue('');
        }}
        sorted={sorted}
      />
    </Container>
  );
};

export default React.memo(ChartBoardPage);
export const getStaticProps: GetStaticProps = async (context) => {
  const kospiList = (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/chart/companyname/kospi`,
  )) as Array<string>;
  const kosdaqList = (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/chart/companyname/kosdaq`,
  )) as Array<string>;

  const totalList: Array<string> = ['전체', ...kospiList, ...kosdaqList];

  return {
    props: { totalList },
  };
};
