import React from 'react';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NewsSearchList from '../NewsSearchList/NewsSearchList';
import Paper from '@material-ui/core/Paper';
import { KeywordFetcher, News } from '../../../types/news/NewsType';

interface Props {
  className?: string;
  topic: Array<string>;
}

const SearchBar: React.FC<Props> = ({ className, topic }) => {
  const [newsList, setNewsList] = React.useState<Array<News>>([]);
  const [fetchData, setFetchData] = React.useState<KeywordFetcher>({
    keyword: topic[Math.floor(Math.random() * 9)],
    sort: 'sim',
  });
  const [isShowNews, setIsShowNews] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [temp, setTemp] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (fetchData !== undefined) {
      getKeyWordNews(fetchData);
    }
  }, [fetchData]);

  const getKeyWordNews = async (fetchData: KeywordFetcher) => {
    if (fetchData.keyword !== undefined) {
      setLoading(true);
      const response = await fetch(
        `http://54.180.68.136:8080/api/v1/news/${fetchData.keyword}?sort=${fetchData.sort}`,
      );

      if (!response.ok) {
        setIsShowNews(false);
        setLoading(false);
        return window.alert('get failed');
      }
      const resJson = await response.json();

      setNewsList(resJson.items);
      setLoading(false);
      console.log('getNewsList!');
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTemp(e.target.value);
    setIsShowNews(true);
  };

  const keyEventHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (temp !== '') {
        setFetchData(() => ({
          ...fetchData,
          keyword: temp,
        }));
        setTemp(undefined);
      }
    }
    if (e.key === 'Escape' || e.key === 'ArrowUp') {
      setIsShowNews(false);
    }
    if (e.key === 'ArrowDown') {
      setIsShowNews(true);
    }
  };

  return (
    <Paper elevation={4} className={cn(className)}>
      <div className="flex">
        <TextField
          style={{ padding: '0px 16px' }}
          fullWidth
          onKeyDown={keyEventHandler}
          onClick={() => setIsShowNews(true)}
          onChange={onChange}
          placeholder="NEWS"
          value={temp}
          margin="dense"
        />
        <Button
          onClick={() => {
            setFetchData(() => ({
              ...fetchData,
              keyword: temp,
            }));
            setTemp(undefined);
            setIsShowNews(true);
          }}
          disabled={temp === '' || temp === undefined}>
          검색
        </Button>
      </div>
      <Paper elevation={2}>
        <div
          className={`${
            isShowNews === true ? 'md:max-h-96 max-h-52' : 'max-h-0'
          } transition:max-height duration-200 md:h-96 h-52 px-2 overflow-y-scroll bg-white`}>
          {loading
            ? 'loading...'
            : newsList.map((arr, key) => {
                return (
                  <div key={'news' + key}>
                    <NewsSearchList
                      className="text-sm py-1 px-2 flex justify-between "
                      data={{
                        ...arr,
                        keyword:
                          fetchData.keyword === undefined
                            ? ''
                            : fetchData.keyword,
                      }}
                    />
                  </div>
                );
              })}
        </div>
        {isShowNews && (
          <div className="flex justify-between px-2 border-t-2  border-gray-100">
            <div>
              <Button
                style={{
                  color: `${fetchData.sort === 'date' ? '#818cf8' : 'black'}`,
                }}
                onClick={() =>
                  setFetchData(() => ({
                    ...fetchData,
                    sort: 'date',
                  }))
                }>
                {fetchData.sort === 'date' ? <b>최신순</b> : '최신순'}
              </Button>
              <Button
                style={{
                  color: `${fetchData.sort === 'sim' ? '#818cf8' : 'black'}`,
                }}
                onClick={() =>
                  setFetchData(() => ({
                    ...fetchData,
                    sort: 'sim',
                  }))
                }>
                {fetchData.sort === 'sim' ? <b>관련도순</b> : '관련도순'}
              </Button>
            </div>
            <div>
              <Button onClick={() => setIsShowNews(false)}>닫기</Button>
            </div>
          </div>
        )}
      </Paper>
    </Paper>
  );
};

export default React.memo(SearchBar);
