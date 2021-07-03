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

type Menu = {
  keyword: boolean;
  news: boolean;
};

type SearchCondition = {
  daily: boolean;
  weekly: boolean;
};

const PopularViews: React.FC<Props> = ({ className }) => {
  const [menu, setMenu] = React.useState<Menu>({
    keyword: false,
    news: false,
  });

  const clickKeyword = () => {
    setMenu(() => ({
      keyword: !menu.keyword,
      news: false,
    }));
  };
  const clickNews = () => {
    setMenu(() => ({
      keyword: false,
      news: !menu.news,
    }));
  };
  return (
    <div className={cn(className)}>
      <Paper
        className={`${menu.keyword === true ? 'max-h-96' : 'h-12'} pt-3`}
        elevation={3}>
        <h2 className="cursor-pointer" onClick={() => clickKeyword()}>
          Popular Keyword
          {!menu.keyword ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </h2>
        <Paper elevation={4}>
          <div
            className={`${
              menu.keyword === true ? 'max-h-80' : 'max-h-0'
            } transition:max-height duration-300 ease-out mt-1`}>
            {menu.keyword && (
              <PopularKeywordBox
                className="px-3 py-2"
                failed={() => setMenu(() => ({ ...menu, keyword: false }))}
              />
            )}
          </div>
        </Paper>
      </Paper>
      <Paper
        className={`${menu.news === true ? 'max-h-96' : 'h-12'} pt-3`}
        elevation={3}>
        <h2 className="cursor-pointer" onClick={() => clickNews()}>
          Popular News
          {!menu.news ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </h2>
        <Paper elevation={4}>
          <div
            className={`${
              menu.news === true ? 'max-h-96' : 'max-h-0'
            } transition:max-height duration-300 ease-out mt-1`}>
            {menu.news && (
              <PopularNewsBox
                className="px-2 pt-2"
                failed={() => setMenu(() => ({ ...menu, news: false }))}
              />
            )}
          </div>
        </Paper>
      </Paper>
    </div>
  );
};

export default PopularViews;
