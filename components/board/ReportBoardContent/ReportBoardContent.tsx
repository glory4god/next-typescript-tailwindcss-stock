import React from 'react';
import Link from 'next/link';
import styles from './ReportBoardContent.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import type { ChartReport } from '../../../types/report/ReportType';
import { viewsHandler } from '../../../lib/redux/report/reportApis';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectReport } from '../../../lib/redux/report/reportSlice';

interface Props {
  item: ChartReport;
}

const ReportBoardContent: React.FC<Props> = ({ item }) => {
  const { loading } = useSelector(selectReport);
  const [viewLoading, setViewLoading] = React.useState<boolean>(false);

  const viewClick = async () => {
    await viewsHandler('chart', item.id);
    setViewLoading(true);
  };

  return (
    <div className={styles.grid}>
      <Link href={`/board/chart/${item.id}`}>
        <a>
          <Image
            src={'/KakaoTalk_20210703_202158153.png'}
            alt="test-image"
            width={100}
            height={64}
            layout="fixed"
          />
        </a>
      </Link>
      <Link href={`/board/chart/${item.id}`}>
        <a
          className="font-bold text-left md:text-base text-xs pl-2"
          onClick={() => {
            if (viewLoading === false) {
              viewClick();
            }
          }}>
          {loading ? 'loading...' : item.report.title}
        </a>
      </Link>
      <div className={styles.detailGrid}>
        <span className="my-auto">
          {loading ? 'loading...' : item.chart.companyName}
        </span>
        <span className={styles.hidden}>
          <ThumbUp fontSize="small" style={{ color: '#818cf8' }} />{' '}
          {loading ? '0' : item.report.good}
        </span>
        <span className={styles.hidden}>
          <ThumbDown fontSize="small" style={{ color: '#818cf8' }} />{' '}
          {loading ? '0' : item.report.bad}
        </span>
        <span>views {loading ? '0' : item.report.views}</span>
        <span className={styles.hidden}>
          {loading
            ? 'loading...'
            : item.report.modifiedDate.toString().substr(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default React.memo(ReportBoardContent);
