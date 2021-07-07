import React from 'react';
import Link from 'next/link';
import styles from './ReportItem.module.css';
import cn from 'classnames';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import type { ChartReport } from '../../../types/report/ReportType';
import { viewsHandler } from '../../../lib/report';

interface Props {
  item: ChartReport;
}

const BoradItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={cn(styles.boardgrid, styles.marginy)}>
      <Link href={`/report/total/${item.id}`}>
        <a
          className="font-bold text-base text-left cursor-pointer pl-4"
          onClick={() => {
            viewsHandler(item.id);
          }}>
          · {item.report.title}
        </a>
      </Link>
      <div>{item.username}</div>
      <div>
        <ThumbUp fontSize="small" style={{ color: '#818cf8' }} />{' '}
        {item.report.good}
      </div>
      <div>
        <ThumbDown fontSize="small" style={{ color: '#818cf8' }} />{' '}
        {item.report.bad}
      </div>
      <div>views {item.report.views}</div>
      <div>{item.report.modifiedDate.toString().substr(0, 10)}</div>
    </div>
  );
};

export default React.memo(BoradItem);
