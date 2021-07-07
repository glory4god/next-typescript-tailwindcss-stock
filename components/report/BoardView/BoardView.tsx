import React from 'react';
import cn from 'classnames';
import { ChartReport } from '../../../types/report/ReportType';
import styles from './BoardView.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import LinkIcon from '@material-ui/icons/Link';
import copy from 'copy-to-clipboard'; // url 클립보드 복사 기능
import { useRouter } from 'next/dist/client/router';
import { badHandler, goodHandler } from '../../../lib/report';
import BoardList from '../BoardList';

interface Props {
  className?: string;
  report: ChartReport;
  reportList: Array<ChartReport>;
}

const BoardView: React.FC<Props> = ({ className, report, reportList }) => {
  const pages = useRouter();
  const [counter, setCounter] = React.useState({
    good: report.report.good,
    bad: report.report.bad,
  });

  return (
    <div className={cn(className)}>
      <div className={styles.title}>
        <h3 className="text-4xl">{report.report.title}</h3>
        <div className="pt-4 space-x-4">
          <span>
            <ThumbUp
              fontSize="small"
              className="cursor-pointer"
              style={{ color: '#818cf8' }}
              onClick={() => {
                // 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!
                if (report.report.good !== counter.good) {
                  alert('이미 눌렀습니다');
                } else {
                  goodHandler(report.id, 'up');
                  setCounter(() => ({
                    ...counter,
                    good: counter.good + 1,
                  }));
                  alert('좋아요를 눌렀습니다!');
                }
              }}
            />{' '}
            {counter.good}
          </span>
          <span>
            <ThumbDown
              fontSize="small"
              className="cursor-pointer"
              style={{ color: '#818cf8' }}
              onClick={() => {
                // 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!
                if (report.report.bad !== counter.bad) {
                  alert('이미 눌렀습니다');
                } else {
                  badHandler(report.id, 'up');
                  setCounter(() => ({
                    ...counter,
                    bad: counter.bad + 1,
                  }));
                  alert('싫어요를 눌렀습니다!');
                }
              }}
            />{' '}
            {counter.bad}
          </span>
          <LinkIcon
            className="cursor-pointer transform rotate-45"
            onClick={() => {
              copy('http://localhost:3000' + pages.asPath);
            }}
          />
        </div>
      </div>
      <div className={styles.reportInfo}>
        <h4>{report.username}</h4>
        <div>
          조회 {report.report.views} /{' '}
          {report.report.modifiedDate.toString().substr(0, 10)}{' '}
          {report.report.modifiedDate.toString().substr(11)}
        </div>
      </div>
      <div className={styles.content}>
        <p>{report.report.content}</p>
        <div className="h-96">test 공간</div>
      </div>
      <BoardList
        report={reportList.filter((c) => c.id !== report.id)}
        entire={false}
      />
    </div>
  );
};

export default BoardView;
