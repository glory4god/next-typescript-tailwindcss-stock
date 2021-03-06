import React from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';
// import useWindowXSize from '../../../lib/hooks/useWindowSize';
// import type { WindowSize } from '../../chart/GraphHeader/GraphHeader';

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
      process.env.LOCAL_SERVER + 'api/v1/news/pop-keyword/daily',
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
      process.env.LOCAL_SERVER + 'api/v1/news/pop-keyword/weekly',
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

  // const windowSize: WindowSize = useWindowXSize();

  return (
    <div className={cn(className)}>
      {!loading ? (
        popKeyword?.map((arr: string, idx: number) => {
          if (idx < 10) {
            return (
              <h3
                key={arr + idx}
                title={arr}
                className="text-left text-sm pt-1">
                {idx + 1}. {arr.length > 10 ? arr.substr(0, 10) + '...' : arr}
                {/* {windowSize.width > 768 && windowSize.width < 820
                  ? `${idx + 1}. ${
                      arr.length > 7 ? arr.substr(0, 7) + '...' : arr
                    }`
                  : `${idx + 1}. ${arr}`} */}
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
