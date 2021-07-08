import React from 'react';
import Link from 'next/link';
import styles from './BoardContent.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import type { ChartReport } from '../../../types/report/ReportType';
import { viewsHandler } from '../../../lib/report';
import Image from 'next/image';

interface Props {
  item: ChartReport;
}

const BoardContent: React.FC<Props> = ({ item }) => {
  const [viewCount, setViewCount] = React.useState<number>(item.report.views);
  return (
    <div className={styles.boardgrid}>
      <Link href={`/report/total/${item.id}`}>
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
      <Link href={`/report/total/${item.id}`}>
        <a
          className="font-bold text-left md:text-base text-xs pl-2"
          onClick={() => {
            if (viewCount === item.report.views) {
              setViewCount((c) => c + 1);
              viewsHandler(item.id);
            }
          }}>
          {item.report.title}
        </a>
      </Link>
      <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-x-2">
        <span className=" lg:block hidden my-auto">{item.username}</span>
        <span className=" lg:block hidden">
          <ThumbUp fontSize="small" style={{ color: '#818cf8' }} />{' '}
          {item.report.good}
        </span>
        <span className=" lg:block hidden">
          <ThumbDown fontSize="small" style={{ color: '#818cf8' }} />{' '}
          {item.report.bad}
        </span>
        <span>views {item.report.views}</span>
        <span>{item.report.modifiedDate.toString().substr(0, 10)}</span>
      </div>
    </div>
  );
};

export default React.memo(BoardContent);
