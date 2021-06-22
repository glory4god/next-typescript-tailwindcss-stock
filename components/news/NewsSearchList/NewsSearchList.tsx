import React from 'react';
import cn from 'classnames';
import type { News } from '../../../types/news/NewsType';

interface Props {
  className?: string;
  arr: News;
}

export type PostUrlData = {
  title: string;
  url: string;
};

const NewsSearchList: React.FC<Props> = ({ className, arr }) => {
  const pubDateList = arr.pubDate.split(' ');

  const postUrl = async (arr: News) => {
    const response = await fetch(
      'http://localhost:8080/api/finance/url/post/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arr),
      },
    );

    console.log('postUrl!');
    if (!response.ok) {
      return window.alert('failed');
    }
  };

  return (
    <div className={cn(className)}>
      <span
        className="cursor-pointer max-w-xl overflow-x-hidden"
        onClick={() => {
          postUrl(arr);
          var win = window.open(arr.link);
          if (win !== null) {
            win.focus();
          }
        }}
        dangerouslySetInnerHTML={{ __html: arr.title }}
      />
      <span className="text-xs">
        {' ' + pubDateList[2] + ' ' + pubDateList[1]}
      </span>
    </div>
  );
};

export default React.memo(NewsSearchList);
