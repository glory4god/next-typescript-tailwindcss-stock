import React from 'react';
import cn from 'classnames';
import type { ChartReport } from '../../../types/report/ReportType';
import BoardContent from '../BoardContent';

interface Props {
  report: Array<ChartReport>;
  entire: boolean;
}

const BoardList: React.FC<Props> = ({ report, entire }) => {
  const [currentBoardPage, setCurrentBoardPage] = React.useState<number>(1);

  const boardPages = Math.ceil(report.length / 10);

  const arr: Array<number> = [];
  for (var t = 1; t <= boardPages; t++) {
    arr.push(t);
  }
  return (
    <>
      <div style={{ height: `${entire ? '100%' : '100%'}` }}>
        {report.map((arr, idx) => {
          if (idx >= (currentBoardPage - 1) * 10 && idx < currentBoardPage * 10)
            return <BoardContent key={arr.username + idx} item={arr} />;
        })}
      </div>
      <div className="mt-4 text-center">
        <button
          className="w-9 text-lg border-indigo-200"
          onClick={() => {
            if (currentBoardPage !== 1) {
              setCurrentBoardPage((c) => c - 1);
            }
          }}>
          {'<'}
        </button>
        {arr.map((arr) => {
          // 10으로 나눈 몫이 같은 값들을 추출 (이렇게하면 같은 자리수 목록 추출 가능)
          if (Math.floor(arr / 10) === Math.floor(currentBoardPage / 10)) {
            return (
              <button
                key={'downButton' + arr}
                onClick={() => {
                  setCurrentBoardPage(arr);
                }}
                className={cn('w-9 border-2 rounded-md border-indigo-200 ', {
                  'bg-indigo-400 text-white': currentBoardPage === arr,
                  'text-indigo-400': currentBoardPage !== arr,
                })}>
                {arr}
              </button>
            );
          }
        })}
        <button
          className="w-9 text-lg border-indigo-200"
          onClick={() => {
            if (currentBoardPage !== boardPages) {
              setCurrentBoardPage((c) => c + 1);
            }
          }}>
          {'>'}
        </button>
      </div>
    </>
  );
};

export default React.memo(BoardList);
