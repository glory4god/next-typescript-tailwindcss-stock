import type { CompanyValueData } from '../../types/chart/ChartType';
import {
  InitialMaxMinData,
  maxMinData,
} from '../../components/chart/DataInfo/DataInfo';

export const conditionList = ['STOCK'];

export const countryList = ['KOREA', 'AMERICA'];

export const marketList = [
  ['KOSPI', 'KOSDAQ'],
  ['NASDAQ', 'S&P500', 'DOW'],
];

export const value = [
  'CLOSE',
  'OPEN',
  'HIGH',
  'LOW',
  'CLOSE&OPEN',
  'CLOSE&OPEN&HIGH&LOW',
];

export const graphEffect = ['LINE', 'HISTOGRAM'];

export const getToday = (date: Date) => {
  var year = date.getFullYear();
  var month = ('0' + (1 + date.getMonth())).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

export const minPrice = (valueData: Array<CompanyValueData>) => {
  if (valueData.length === 0) {
    return InitialMaxMinData;
  } else {
    var min: maxMinData = [valueData[0].low, valueData[0].date];
    Array.from(valueData, (element: CompanyValueData) => {
      if (min[0] > element.low) {
        min[0] = element.low;
        min[1] = element.date;
        return min;
      } else {
        return min;
      }
    });
    return min;
  }
};

export const maxPrice = (valueData: Array<CompanyValueData>) => {
  if (valueData.length === 0) {
    return InitialMaxMinData;
  } else {
    var max: maxMinData = [valueData[0].high, valueData[0].date];
    Array.from(valueData, (element: CompanyValueData) => {
      if (max[0] < element.high) {
        max[0] = element.high;
        max[1] = element.date;
        return max;
      } else {
        return max;
      }
    });
    return max;
  }
};

export const volumeMaxPrice = (valueData: Array<CompanyValueData>) => {
  if (valueData.length === 0) {
    return InitialMaxMinData;
  } else {
    var max: maxMinData = [valueData[0].volume, valueData[0].date];
    Array.from(valueData, (element: CompanyValueData) => {
      if (max[0] < element.volume) {
        max[0] = element.volume;
        max[1] = element.date;
        return max;
      } else {
        return max;
      }
    });
    return max;
  }
};

export const volumeMinPrice = (valueData: Array<CompanyValueData>) => {
  if (valueData.length === 0) {
    return InitialMaxMinData;
  } else {
    var min: maxMinData = [valueData[0].volume, valueData[0].date];
    Array.from(valueData, (element: CompanyValueData) => {
      if (min[0] > element.volume) {
        min[0] = element.volume;
        min[1] = element.date;
        return min;
      } else {
        return min;
      }
    });
    return min;
  }
};
