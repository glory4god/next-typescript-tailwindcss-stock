import React from 'react';
import Link from 'next/link';
import styles from './BoardContent.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import type { ChartReport } from '../../../types/report/ReportType';
import { viewsHandler } from '../../../lib/report';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectReport } from '../../../lib/redux/report/reportSlice';

interface Props {
  item: ChartReport;
}

const BoardContent: React.FC<Props> = ({ item }) => {
  const { loading } = useSelector(selectReport);

  return (
    <div className={styles.grid}>
      <Link href={`/report/chart/${item.id}`}>
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
      <Link href={`/report/chart/${item.id}`}>
        <a
          className="font-bold text-left md:text-base text-xs pl-2"
          onClick={() => {
            viewsHandler(item.id);
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

export default React.memo(BoardContent);
