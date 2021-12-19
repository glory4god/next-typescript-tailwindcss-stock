import React from 'react';
import cn from 'classnames';
import { ChartReport } from '../../../types/report/ReportType';
import styles from './ReportBoardView.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import copy from 'copy-to-clipboard'; // url 클립보드 복사 기능
import { useRouter } from 'next/dist/client/router';
import { goodAndBadHandler } from '../../../lib/redux/report/reportApis';
import BoardList from '../BoardList';
import { useDispatch, useSelector } from 'react-redux';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';
import fetcher from '../../../lib/fetcher';
import {
  selectReport,
  userIdCheck,
} from '../../../lib/redux/report/reportSlice';

interface Props {
  className?: string;
  report: ChartReport;
  reportList: Array<ChartReport>;
}

type CounterType = {
  good: number;
  bad: number;
};
type PressedType = {
  good: boolean;
  bad: boolean;
};

const ReportBoardView: React.FC<Props> = ({
  className,
  report,
  reportList,
}) => {
  const pages = useRouter();

  const { login, id, nickname } = useSelector(selectKakaoLogin);
  const { isWriter } = useSelector(selectReport);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [pressed, setPressed] = React.useState<PressedType>({
    good: false,
    bad: false,
  });
  const [counter, setCounter] = React.useState<CounterType>({
    good: report.report.good,
    bad: report.report.bad,
  });
  const [chartOpen, setChartOpen] = React.useState<boolean>(false);

  const pressCheck = async (userId: number, reportId: number) => {
    const press = (await fetcher(
      process.env.LOCAL_SERVER +
        `api/v1/user/chart-report/press?user=${userId}&report=${reportId}`,
    )) as PressedType;
    setPressed(press);
  };

  const deleteReport = async (reportId: number, userId: number) => {
    const result = confirm('게시글을 삭제하시겠습니까?');
    if (result) {
      const res = await fetch(
        process.env.LOCAL_SERVER +
          `api/v1/user/chart-report/post/${reportId}/${userId}`,
        {
          method: 'DELETE',
        },
      );
      if (res.ok) {
        pages.push('/board/chart');
      } else {
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  // TODO : 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!
  // 완료
  const goodHandler = async () => {
    if (login) {
      if (pressed.good === false && pressed.bad === false) {
        setCounter(() => ({
          ...counter,
          good: counter.good + 1,
        }));
      } else if (pressed.good === false && pressed.bad === true) {
        setCounter(() => ({
          good: counter.good + 1,
          bad: counter.bad - 1,
        }));
      } else if (pressed.bad === false && pressed.good === true) {
        setCounter(() => ({
          ...counter,
          good: counter.good - 1,
        }));
      }
      setLoading(true);
      await goodAndBadHandler('chart', 'good', id, report.id);
      setLoading(false);
      pressCheck(id, report.id);
    } else {
      alert('로그인 후 이용 가능합니다!');
    }
  };

  // TODO : 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!
  // 구현 완료
  const badHandler = async () => {
    if (login) {
      if (pressed.bad === false && pressed.good === false) {
        setCounter(() => ({
          ...counter,
          bad: counter.bad + 1,
        }));
      } else if (pressed.bad === false && pressed.good === true) {
        setCounter(() => ({
          good: counter.good - 1,
          bad: counter.bad + 1,
        }));
      } else if (pressed.good === false && pressed.bad === true) {
        setCounter(() => ({
          ...counter,
          bad: counter.bad - 1,
        }));
      }
      setLoading(true);
      await goodAndBadHandler('chart', 'bad', id, report.id);
      setLoading(false);

      pressCheck(id, report.id);
    } else {
      alert('로그인 후 이용 가능합니다!');
    }
  };

  React.useEffect(() => {
    if (login === true) {
      pressCheck(id, report.id);
      dispatch(userIdCheck(id, report.username));
    }
  }, [counter, login, id, report.id, nickname]);

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
              style={{
                color: `${
                  login === true && pressed.good === true
                    ? '#818cf8'
                    : '#a7a8a8'
                }`,
              }}
              onClick={() => {
                if (loading === false) {
                  goodHandler();
                }
              }}
            />{' '}
            {counter.good}
            <ThumbDown
              fontSize="small"
              className="cursor-pointer"
              style={{
                color: `${
                  login === true && pressed.bad === true ? '#818cf8' : '#a7a8a8'
                }`,
              }}
              onClick={() => {
                if (loading === false) {
                  badHandler();
                }
              }}
            />{' '}
            {counter.bad}
          </div>
          {isWriter && (
            <div>
              <Button>수정</Button>
              <Button
                onClick={() => {
                  if (login) {
                    if (report.username === nickname) {
                      deleteReport(report.id, id);
                    } else {
                      alert('게시글을 삭제할 수 없습니다.');
                    }
                  } else {
                    alert('로그인 후 이용 가능합니다!');
                  }
                }}>
                삭제
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.comment}>
        <h4>댓글</h4>
      </div>
      <BoardList
        reportList={reportList?.filter((c) => c.id !== report.id)}
        listNumber={5}
      />
    </div>
  );
};

export default ReportBoardView;
