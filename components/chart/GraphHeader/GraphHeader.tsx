import React from 'react';
import cn from 'classnames';
import LineChartGraph from '../graph/LineGraph';
import HistoChartGraph from '../graph/HistoGraph';
import type {
  DataCondition,
  CompanyValueData,
  CustomOpenCloseData,
} from '../../../types/chart/ChartType';
import CustomStockChart from '../graph/CustomStockChart';
import ChartVolumeGraph from '../graph/VolumeHistoGraph';
import useWindowSize from '../../../lib/hooks/useWindowSize';
import { maxMinData } from '../DataInfo/DataInfo';
import { maxPrice, minPrice } from '../../../lib/context/ChartContext';

interface Props {
  className?: string;
  dataCondition: DataCondition;
  valueData: Array<CompanyValueData>;
  customData: Array<CustomOpenCloseData>;
}

export type WindowSize = {
  width: number;
  height: number;
};

const GraphHeader: React.FC<Props> = ({
  className,
  valueData,
  dataCondition,
  customData,
}) => {
  const windowSize: WindowSize = useWindowSize();

  const max: maxMinData = maxPrice(valueData);
  const min: maxMinData = minPrice(valueData);

  return (
    <div className={cn(className)}>
      <h2 className="font-bold text-lg">CHART INFOMATION</h2>
      {(dataCondition.graphEffect === 'LINE' ||
        dataCondition.graphEffect === undefined) && (
        <>
          <LineChartGraph
            data={valueData}
            windowSize={windowSize}
            YValue={
              dataCondition.value === undefined || dataCondition.value === null
                ? 'close'
                : dataCondition.value.toLowerCase()
            }
            max={max}
            min={min}
          />
        </>
      )}
      {dataCondition.graphEffect === 'HISTOGRAM' && (
        <>
          <HistoChartGraph
            data={valueData}
            windowSize={windowSize}
            YValue={
              dataCondition.value === undefined || dataCondition.value === null
                ? 'close'
                : dataCondition.value.toLowerCase()
            }
            max={max}
            min={min}
          />
        </>
      )}
      <CustomStockChart
        customData={customData}
        windowSize={windowSize}
        max={max}
        min={min}
      />
      <ChartVolumeGraph
        data={valueData}
        windowSize={windowSize}
        YValue={
          dataCondition.value === undefined || dataCondition.value === null
            ? 'close'
            : dataCondition.value.toLowerCase()
        }
      />
    </div>
  );
};

export default React.memo(GraphHeader);
