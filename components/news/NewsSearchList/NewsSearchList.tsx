import React from 'react';
import cn from 'classnames';
import type { PostNews } from '../../../types/news/NewsType';

interface Props {
  className?: string;
  data: PostNews;
}

const NewsSearchList: React.FC<Props> = ({ className, data }) => {
  const pubDateList = data.pubDate.split(' ');

  const postUrl = async (data: PostNews) => {
    const response = await fetch(
      'http://54.180.68.136:8080/api/v1/news/url/post',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
          postUrl(data);
          var win = window.open(data.link);
          if (win !== null) {
            win.focus();
          }
        }}
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
      <span className="text-xs w-11 text-right">
        {' ' + pubDateList[2] + ' ' + pubDateList[1]}
      </span>
    </div>
  );
};

export default React.memo(NewsSearchList);
