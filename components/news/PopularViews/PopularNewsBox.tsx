import React from 'react';
import cn from 'classnames';
import type { PostNews } from '../../../types/news/NewsType';
import NewsSearchList from '../NewsSearchList';
import Button from '@material-ui/core/Button';

interface Props {
  className?: string;
  failed: () => void;
}

const PopularNewsBox: React.FC<Props> = ({ className, failed }) => {
  const [popNews, setPopNews] = React.useState<Array<PostNews>>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isDaily, setIsDaily] = React.useState<boolean>(true);

  // const timer = React.useRef<number>();

  const getDailyNews = async () => {
    setLoading(true);
    const response = await fetch(
      process.env.LOCAL_SERVER + 'api/v1/news/pop-url/daily',
    );

    if (!response.ok) {
      setLoading(false);

      failed();
      return window.alert('get failed!');
    }
    const resJson = await response.json();
    setPopNews(resJson);
    setIsDaily(true);
    setLoading(false);
  };

  const getWeeklyNews = async () => {
    setLoading(true);
    const response = await fetch(
      process.env.LOCAL_SERVER + 'api/v1/news/pop-url/weekly',
    );

    if (!response.ok) {
      setLoading(false);

      failed();
      return window.alert('get failed!');
    }
    const resJson = await response.json();
    setPopNews(resJson);
    setIsDaily(false);
    setLoading(false);
  };

  React.useEffect(() => {
    getDailyNews();
    // 타입스크립트에서 setInterval 쓸 때는 window로 해야하는 듯!
    // timer.current = window.setInterval(getDailyNews, 8000);
    // return () => {
    //   clearInterval(timer.current);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)}>
      {!loading ? (
        popNews?.map((arr: PostNews, key: number) => {
          if (key < 5) {
            return (
              <div key={'news' + key}>
                <NewsSearchList
                  className="text-sm py-1"
                  data={arr}></NewsSearchList>
              </div>
            );
          }
          return null;
        })
      ) : (
        <div>loading...</div>
      )}
      <Button
        size="small"
        style={{
          color: `${isDaily ? '#818cf8' : 'black'}`,
          fontWeight: `${isDaily ? 'bold' : 'lighter'}`,
        }}
        onClick={() => getDailyNews()}>
        DAILY
      </Button>
      <Button
        size="small"
        style={{
          color: `${!isDaily ? '#818cf8' : 'black'}`,
          fontWeight: `${!isDaily ? 'bold' : 'lighter'}`,
        }}
        onClick={() => getWeeklyNews()}>
        WEEKLY
      </Button>
    </div>
  );
};

export default PopularNewsBox;
