import React from 'react';
import cn from 'classnames';
import type {
  ChartReport,
  BulletinBoard,
} from '../../../types/report/ReportType';
import BoardContent from '../ReportBoardContent';
import Button from '@material-ui/core/Button';
import BulletinBoardContent from '../BulletinBoardContent';

interface Props {
  reportList?: ChartReport[];
  bulletinBoardList?: BulletinBoard[];
  listNumber: number;
}

const BoardList: React.FC<Props> = ({
  reportList,
  bulletinBoardList,
  listNumber,
}) => {
  const [currentBoardPage, setCurrentBoardPage] = React.useState<number>(1);

  let boardPages: number = 0;
  if (reportList !== undefined) {
    boardPages = Math.ceil(reportList.length / listNumber);
  } else if (bulletinBoardList !== undefined) {
    boardPages = Math.ceil(bulletinBoardList.length / listNumber);
  }

  const arr: Array<number> = [];
  for (var t = 1; t <= boardPages; t++) {
    arr.push(t);
  }

  React.useEffect(() => {
    setCurrentBoardPage(1);
  }, [reportList]);
  return (
    <>
      <div
        style={{
          height: '100%',
        }}>
        {reportList !== undefined &&
          reportList?.map((arr, idx) => {
            if (
              idx >= (currentBoardPage - 1) * listNumber &&
              idx < currentBoardPage * listNumber
            )
              return <BoardContent key={arr.username + idx} item={arr} />;
          })}
        {bulletinBoardList !== undefined &&
          bulletinBoardList?.map((arr, idx) => {
            if (
              idx >= (currentBoardPage - 1) * listNumber &&
              idx < currentBoardPage * listNumber
            )
              return (
                <BulletinBoardContent key={arr.username + idx} item={arr} />
              );
          })}
      </div>
      <div className="mt-6 text-center flex justify-between items-center">
        <Button
          onClick={() => {
            if (currentBoardPage !== 1) {
              setCurrentBoardPage((c) => c - 1);
            } else {
              alert('이전 페이지가 없습니다!');
            }
          }}>
          {'< '} 이전
        </Button>
        <div>
          {arr.map((arr) => {
            // listNumber으로 나눈 몫이 같은 값들을 추출 (이렇게하면 같은 자리수 목록 추출 가능)
            if (Math.floor(arr / 6) === Math.floor(currentBoardPage / 6)) {
              return (
                <button
                  key={'downButton' + arr}
                  onClick={() => {
                    setCurrentBoardPage(arr);
                  }}
                  className={cn('px-3 border-2 rounded-md border-indigo-200 ', {
                    'bg-indigo-400 text-white': currentBoardPage === arr,
                    'text-indigo-400': currentBoardPage !== arr,
                  })}>
                  {arr}
                </button>
              );
            }
          })}
        </div>
        <Button
          onClick={() => {
            if (currentBoardPage !== boardPages) {
              setCurrentBoardPage((c) => c + 1);
            } else {
              alert('다음 페이지가 없습니다!');
            }
          }}>
          다음 {' >'}
        </Button>
      </div>
    </>
  );
};

export default React.memo(BoardList);
