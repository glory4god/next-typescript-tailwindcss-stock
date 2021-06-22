import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  failed: () => void;
}

const PopularKeywordBox: React.FC<Props> = ({ className, failed }) => {
  const [popKeyword, setPopKeyword] = React.useState<Array<string>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  // const timer = React.useRef<number>();

  const getKeywordList = async () => {
    setLoading(true);
    const response = await fetch(
      'http://localhost:8080/api/finance/news/popular/keyword',
    );

    if (!response.ok) {
      setLoading(false);
      failed();
      return window.alert('get failed!');
    }
    const resJson = await response.json();
    setPopKeyword(resJson);
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
    </div>
  );
};

export default PopularKeywordBox;
