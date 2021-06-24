import React from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import PopularKeywordBox from './PopularKeywordBox';
import PopularNewsBox from './PopularNewsBox';

interface Props {
  className?: string;
}

const PopularViews: React.FC<Props> = ({ className }) => {
  const [isClicked, setIsClicked] = React.useState({
    keyword: false,
    news: false,
  });

  const clickPopularKeyword = () => {
    setIsClicked(() => ({
      keyword: !isClicked.keyword,
      news: false,
    }));
  };
  const clickPopularNews = () => {
    setIsClicked(() => ({
      keyword: false,
      news: !isClicked.news,
    }));
  };
  return (
    <div className={cn(className)}>
      <Paper
        className={`${isClicked.keyword === true ? 'max-h-96' : 'h-12'} pt-3`}
        elevation={3}>
        <h2 className="cursor-pointer" onClick={() => clickPopularKeyword()}>
          Popular Keyword
          {!isClicked.keyword ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </h2>
        <Paper elevation={4}>
          <div
            className={`${
              isClicked.keyword === true ? 'max-h-72' : 'max-h-0'
            } transition:max-height duration-300 ease-out h-72 mt-1`}>
            {isClicked.keyword && (
              <PopularKeywordBox
                className="px-4 py-2"
                failed={() =>
                  setIsClicked(() => ({ ...isClicked, keyword: false }))
                }
              />
            )}
          </div>
        </Paper>
      </Paper>
      <Paper
        className={`${isClicked.news === true ? 'max-h-96' : 'h-12'} pt-3`}
        elevation={3}>
        <h2 className="cursor-pointer" onClick={() => clickPopularNews()}>
          Popular News
          {!isClicked.news ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </h2>
        <Paper elevation={4}>
          <div
            className={`${
              isClicked.news === true ? 'max-h-80' : 'max-h-0'
            } transition:max-height duration-300 ease-out md:h-80 h-52 mt-1`}>
            {isClicked.news && (
              <PopularNewsBox
                className="px-3 pt-2 h-full grid grid-cols-1"
                failed={() =>
                  setIsClicked(() => ({ ...isClicked, news: false }))
                }
              />
            )}
          </div>
        </Paper>
      </Paper>
    </div>
  );
};

export default PopularViews;
