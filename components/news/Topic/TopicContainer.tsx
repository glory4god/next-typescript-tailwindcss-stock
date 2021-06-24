import React from 'react';
import cn from 'classnames';
import TopicTag from './TopicTag';
import fetcher from '../../../lib/fetcher';
import TopicView from './TopicView';
import type { PostNews } from '../../../types/news/NewsType';

interface Props {
  className?: string;
  topic: Array<string>;
}

const TopicContainer: React.FC<Props> = ({ className, topic }) => {
  const [hotKeywordList, setHotKeywordList] = React.useState<Array<PostNews>>(
    [],
  );
  const getHotKeyword = async (topic: string) => {
    const value = (await fetcher(
      `http://localhost:8080/api/finance/url/${topic}`,
    )) as Array<PostNews>;

    setHotKeywordList(value);
    console.log(value);
  };

  React.useEffect(() => {
    getHotKeyword(topic[0]);
  }, [topic]);

  const [property, setProperty] = React.useState<string>(topic[0]);

  return (
    <div className={cn(className)}>
      <h2 className="py-2">#Hot Keyword</h2>
      <div className="flex space-x-2 mt-2 ">
        {topic?.map((arr: string, key: number) => {
          if (key < 5) {
            return (
              <TopicTag
                title={'#' + arr}
                key={arr + key}
                onClick={() => {
                  const temp: Array<string> = topic.filter((value: string) => {
                    if (value === arr) {
                      return value;
                    }
                  });
                  setProperty(temp[0]);
                  getHotKeyword(arr);
                }}
                clicked={property === arr}
              />
            );
          }
        })}
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-y-6 lg:justify-items-center mt-8 flex flex-col items-center">
        {hotKeywordList.map((news, key) => {
          return (
            <TopicView
              key={key}
              topic={news.keyword}
              link={news.link}
              title={news.title}
              description={news.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopicContainer;
