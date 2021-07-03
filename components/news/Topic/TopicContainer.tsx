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
  const [property, setProperty] = React.useState<string>(topic[0]);

  // const {
  //   keywordList,
  //   isLoading,
  //   isError,
  // }: { keywordList: Array<PostNews>; isLoading: boolean; isError: boolean } =
  //   useKeyword(topic[0]);

  const getHotKeyword = async (topic: string) => {
    const value = (await fetcher(
      `http://54.180.68.136:8080/api/v1/news/pop-url/${topic}`,
    )) as Array<PostNews>;

    setHotKeywordList(value);
  };

  React.useEffect(() => {
    getHotKeyword(topic[0]);
    setProperty(topic[0]);
  }, [topic]);

  return (
    <div className={cn(className)}>
      <h2 className="py-2 text-left">#Daily Hot Keyword</h2>
      <div className="flex space-x-2 my-6 ">
        {topic.length !== 0 ? (
          topic.map((arr: string, key: number) => {
            if (key < 5) {
              return (
                <TopicTag
                  title={'#' + arr}
                  key={arr + key}
                  onClick={() => {
                    const temp: Array<string> = topic.filter(
                      (value: string) => {
                        if (value === arr) {
                          return value;
                        }
                      },
                    );
                    setProperty(temp[0]);
                    getHotKeyword(arr);
                  }}
                  clicked={property === arr}
                />
              );
            }
          })
        ) : (
          <>
            <TopicTag title="..." clicked={true} />
            <TopicTag title="..." clicked={false} />
            <TopicTag title="..." clicked={false} />
            <TopicTag title="..." clicked={false} />
            <TopicTag title="..." clicked={false} />
          </>
        )}
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-y-6 lg:justify-items-center mt-12 flex flex-col items-center">
        {hotKeywordList.length !== 0 ? (
          hotKeywordList.map((news, key) => {
            return (
              <TopicView
                key={key}
                topic={news.keyword}
                link={news.link}
                title={news.title}
                description={news.description}
                skeleton={false}
              />
            );
          })
        ) : (
          <>
            {[0, 1, 2, 3].map((arr) => {
              return (
                <TopicView
                  key={'skeleton' + arr}
                  topic="..."
                  link="..."
                  title="아직 뉴스가 없습니다!"
                  description="..."
                  skeleton={true}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default TopicContainer;
