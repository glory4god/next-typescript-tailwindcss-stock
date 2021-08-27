import React from 'react';
import Link from 'next/link';
import styles from './FreeBoardContent.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import type { FreeBoard } from '../../../types/report/ReportType';
import { viewsHandler } from '../../../lib/redux/report/reportApis';
import { useSelector } from 'react-redux';
import { selectFreeBoard } from '../../../lib/redux/freeBoard/freeBoardSlice';

interface Props {
  item: FreeBoard;
}

const FreeBoardContent: React.FC<Props> = ({ item }) => {
  const { loading } = useSelector(selectFreeBoard);

  const [viewLoading, setViewLoading] = React.useState<boolean>(false);

  const viewClick = async () => {
    viewsHandler('free', item.id);
    setViewLoading(true);
  };

  return (
    <div className={styles.grid}>
      <Link href={`/board/free/${item.id}`}>
        <a
          className="font-bold text-left md:text-base text-xs pl-2"
          onClick={() => {
            if (viewLoading === false) {
              viewClick();
            }
          }}>
          {loading ? 'loading...' : item.id}
        </a>
      </Link>
      <Link href={`/board/free/${item.id}`}>
        <a
          className="font-bold text-left md:text-base text-xs pl-2"
          onClick={() => {
            if (viewLoading === false) {
              viewClick();
            }
          }}>
          {loading ? 'loading...' : item.title}
        </a>
      </Link>
      <div className={styles.detailGrid}>
        <span> {loading ? '' : item.username}</span>
        <span className={styles.hidden}>
          <ThumbUp fontSize="small" style={{ color: '#818cf8' }} />{' '}
          {loading ? '0' : item.good}
        </span>
        <span>views {loading ? '0' : item.views}</span>
        <span className={styles.hidden}>
          {loading ? 'loading...' : item.modifiedDate.toString().substr(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default React.memo(FreeBoardContent);
