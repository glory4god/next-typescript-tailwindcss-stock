export type PostChartReport = {
  username: string;
  companyName: string | undefined;
  value: string | undefined;
  graphEffect: string | undefined;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
};

export type ChartReport = {
  id: number;
  username: string;
  chart: {
    companyName: string | undefined;
    value: string | undefined;
    graphEffect: string | undefined;
    startDate: string;
    endDate: string;
  };
  report: {
    title: string;
    content: string;
    createDate: Date;
    modifiedDate: Date;
    good: number;
    bad: number;
    views: number;
  };
};

export type FreeBoard = {
  id: number;
  username: string;
  title: string;
  content: string;
  good: number;
  views: number;
  createDate: Date;
  modifiedDate: Date;
};
