import React from 'react';
import cn from 'classnames';
import LineChartGraph from '../graph/LineGraph';
import HistoChartGraph from '../graph/HistoGraph';
import type {
  DataCondition,
  CompanyValueData,
} from '../../../types/chart/ChartType';
import CustomStockChart from '../graph/CustomGraph';
import ChartVolumeGraph from '../graph/VolumeHistoGraph';
import useWindowSize from '../../../lib/hooks/useWindowSize';

interface Props {
  className?: string;
  dataCondition: DataCondition;
  dateRange: Array<Date | null>;
  valueData: Array<CompanyValueData>;
}

export type WindowSize = {
  width: number;
  height: number;
};

const GraphHeader: React.FC<Props> = ({
  className,
  valueData,
  dataCondition,
  dateRange,
}) => {
  const windowSize: WindowSize = useWindowSize();

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
          />
        </>
      )}
      <CustomStockChart data={valueData} windowSize={windowSize} />
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
