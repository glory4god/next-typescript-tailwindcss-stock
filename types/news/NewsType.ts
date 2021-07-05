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

export type PostNews = {
  title: string;
  link: string;
  originallink: string;
  description: string;
  pubDate: string;
  keyword: string;
};

export type NewsWithImageUrl<T extends News = News> = {
  keyword: string;
  imageUrl: string;
};
