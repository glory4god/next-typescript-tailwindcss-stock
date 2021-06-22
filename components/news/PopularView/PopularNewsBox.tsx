import React from 'react';
import cn from 'classnames';
import type { News } from '../../../types/news/NewsType';
import NewsSearchList from '../NewsSearchList';

interface Props {
  className?: string;
  failed: () => void;
}

const PopularNewsBox: React.FC<Props> = ({ className, failed }) => {
  const [popNews, setPopNews] = React.useState<Array<News>>();
  const [loading, setLoading] = React.useState<boolean>(false);
  // const timer = React.useRef<number>();

  const getKeywordList = async () => {
    setLoading(true);
    const response = await fetch(
      'http://localhost:8080/api/finance/news/popular/url',
    );

    if (!response.ok) {
      setLoading(false);

      failed();
      return window.alert('get failed!');
    }
    const resJson = await response.json();
    setPopNews(resJson);
    console.log(resJson);
    setLoading(false);
  };

  React.useEffect(() => {
    getKeywordList();
    // 타입스크립트에서 setInterval 쓸 때는 window로 해야하는 듯!
    // timer.current = window.setInterval(getKeywordList, 8000);
    // return () => {
    //   clearInterval(timer.current);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)}>
      {!loading ? (
        popNews?.map((arr: News, key: number) => {
          if (key < 5) {
            return (
              <div key={'news' + key}>
                <NewsSearchList
                  className="text-sm py-1"
                  arr={arr}></NewsSearchList>
              </div>
            );
          }
          return null;
        })
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default PopularNewsBox;
