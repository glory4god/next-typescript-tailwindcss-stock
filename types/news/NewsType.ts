export type KeywordFetcher = {
  keyword: string | undefined;
  sort: string;
};

export type News = {
  title: string;
  link: string;
  originallink: string;
  description: string;
  pubDate: string;
};
export type PostUrlData = {
  title: string;
  url: string;
};
