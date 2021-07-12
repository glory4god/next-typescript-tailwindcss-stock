import React from 'react';
import cn from 'classnames';
import { ChartReport } from '../../../types/report/ReportType';
import styles from './BoardView.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import copy from 'copy-to-clipboard'; // url 클립보드 복사 기능
import { useRouter } from 'next/dist/client/router';
import { badHandler, goodHandler } from '../../../lib/report';
import BoardList from '../BoardList';

interface Props {
  className?: string;
  report: ChartReport;
  reportList: Array<ChartReport>;
}

type CounterType = {
  good: number;
  bad: number;
};

const BoardView: React.FC<Props> = ({ className, report, reportList }) => {
  const pages = useRouter();
  const [counter, setCounter] = React.useState<CounterType>({
    good: report.report.good,
    bad: report.report.bad,
  });
  const [chartOpen, setChartOpen] = React.useState<boolean>(false);

  return (
    <div className={cn(className)}>
      <div className={styles.title}>
        <h3 className="text-4xl">{report.report.title}</h3>
        <div
          className="pt-4 space-x-4 cursor-pointer"
          onClick={() => {
            alert('copied url link!');
            copy('http://localhost:3000' + pages.asPath);
          }}>
          URL copy <LinkIcon className="transform rotate-45" />
        </div>
      </div>
      <div className={styles.reportInfo}>
        <h4>{report.username}</h4>
        <div>
          Views {report.report.views} /{' '}
          {report.report.modifiedDate.toString().substr(0, 10)}{' '}
          {report.report.modifiedDate.toString().substr(11)}
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setChartOpen((c) => !c);
            }}>
            차트 보기
          </div>
          <div
            className={`${
              chartOpen === true ? 'max-h-72' : 'max-h-0'
            } transition:max-height duration-300`}>
            {chartOpen && (
              <>
                <div className="h-48">
                  {report.chart.companyName} ({report.chart.startDate}~
                  {report.chart.endDate}) 차트 : {report.chart.value}
                  <div>차트 이미지 넣으면 좋을 듯</div>
                </div>
              </>
            )}
          </div>
          <p className="h-48">{report.report.content}</p>
        </div>
        <div className="flex justify-between">
          <div className="space-x-4">
            <ThumbUp
              fontSize="small"
              className="cursor-pointer"
              style={{ color: '#818cf8' }}
              onClick={() => {
                // 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!

                goodHandler(report.id, 'up');
                setCounter(() => ({
                  ...counter,
                  good: counter.good + 1,
                }));
                alert('좋아요를 눌렀습니다!');
              }}
            />{' '}
            {counter.good}
            <ThumbDown
              fontSize="small"
              className="cursor-pointer"
              style={{ color: '#818cf8' }}
              onClick={() => {
                // 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!

                badHandler(report.id, 'up');
                setCounter(() => ({
                  ...counter,
                  bad: counter.bad + 1,
                }));
                alert('싫어요를 눌렀습니다!');
              }}
            />{' '}
            {counter.bad}
          </div>
          <div>
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        </div>
      </div>
      <div className={styles.comment}>
        <h4>댓글</h4>
      </div>
      <BoardList
        report={reportList.filter((c) => c.id !== report.id)}
        listNumber={5}
      />
    </div>
  );
};

export default BoardView;
