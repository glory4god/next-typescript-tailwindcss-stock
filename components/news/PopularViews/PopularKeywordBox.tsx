import React from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';

interface Props {
  className?: string;
  failed: () => void;
}

const PopularKeywordBox: React.FC<Props> = ({ className, failed }) => {
  const [popKeyword, setPopKeyword] = React.useState<Array<string>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isDaily, setIsDaily] = React.useState<boolean>(true);
  // const timer = React.useRef<number>();

  const getDailyKeyword = async () => {
    setLoading(true);
    const response = await fetch(
      'http://54.180.68.136:8080/api/v1/news/pop-keyword/daily',
    );

    if (!response.ok) {
      setLoading(false);
      failed();
      return window.alert('get failed!');
    }

    const resJson = await response.json();
    setPopKeyword(resJson);
    setIsDaily(true);
    setLoading(false);
  };
  const getWeeklyKeyword = async () => {
    setLoading(true);
    const response = await fetch(
      'http://54.180.68.136:8080/api/v1/news/pop-keyword/weekly',
    );

    if (!response.ok) {
      setLoading(false);
      failed();
      return window.alert('get failed!');
    }

    const resJson = await response.json();
    setPopKeyword(resJson);
    setIsDaily(false);
    setLoading(false);
  };
  React.useEffect(() => {
    getDailyKeyword();
    // 타입스크립트에서 setInterval 쓸 때는 window로 해야하는 듯!
    // timer.current = window.setInterval(getDailyKeyword, 8000);
    // return () => {
    //   clearInterval(timer.current);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)}>
      {!loading ? (
        popKeyword?.map((arr: string, idx: number) => {
          if (idx < 10) {
            return (
              <h3 key={arr + idx} title={arr} className="text-left pb-1">
                {idx + 1}위: {arr.length > 9 ? arr.substr(0, 9) + '...' : arr}
              </h3>
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
        onClick={() => getDailyKeyword()}>
        DAILY
      </Button>
      <Button
        size="small"
        style={{
          color: `${!isDaily ? '#818cf8' : 'black'}`,
          fontWeight: `${!isDaily ? 'bold' : 'lighter'}`,
        }}
        onClick={() => getWeeklyKeyword()}>
        WEEKLY
      </Button>
    </div>
  );
};

export default PopularKeywordBox;
