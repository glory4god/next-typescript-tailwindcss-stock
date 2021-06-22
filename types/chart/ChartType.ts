export type DataCondition = {
  condition: string;
  country: string;
  market: string;
  company: string | undefined;
  value: string | undefined;
  graphEffect: string | undefined;
};

export type CompanyValueData = {
  date: string | undefined;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  companyName: string | null;
};

export type CustomOpenCloseData = {
  date: string | undefined;
  openClose: [number, number];
  lowHigh: [number, number];
};
