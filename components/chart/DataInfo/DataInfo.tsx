import cn from 'classnames';
import React from 'react';
import type {
  DataCondition,
  CompanyValueData,
} from '../../../types/chart/ChartType';
import {
  getToday,
  maxPrice,
  minPrice,
} from '../../../lib/context/ChartContext';

interface Props {
  className?: string;
  data: DataCondition;
  dateRange: Array<Date | null>;
  valueData: Array<CompanyValueData>;
}

export type maxMinData = [number, string | undefined];

export const InitialMaxMinData: maxMinData = [0, ''];

const DataInfo: React.FC<Props> = ({
  className,
  data,
  dateRange,
  valueData,
}) => {
  const [minValue, setMinValue] = React.useState<maxMinData>(InitialMaxMinData);
  const [maxValue, setMaxValue] = React.useState<maxMinData>(InitialMaxMinData);

  React.useEffect(() => {
    setMinValue(minPrice(valueData));
    setMaxValue(maxPrice(valueData));
  }, [valueData]);

  return (
    <div className={cn(className, 'ml-4 text-lg')}>
      <h2 className="font-bold text-lg pb-4">DATA INFOMATION</h2>{' '}
      <p>종목 : {data.company}</p>
      <p>
        날짜 :{' '}
        {dateRange.length === 2 && (
          <span>
            {dateRange[0] ? getToday(dateRange[0]) : ''} ~{' '}
            {dateRange[1] ? getToday(dateRange[1]) : ''}
          </span>
        )}
      </p>
      <p>
        최고가 : {maxValue[1]} : {maxValue[0]}
      </p>
      <p>
        최저가 : {minValue[1]} : {minValue[0]}
      </p>
    </div>
  );
};

export default React.memo(DataInfo);
