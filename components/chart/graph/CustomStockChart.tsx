import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ComposedChart,
  Label,
  ReferenceLine,
} from 'recharts';
import type { CustomOpenCloseData } from '../../../types/chart/ChartType';
import type { WindowSize } from '../GraphHeader/GraphHeader';
import { maxMinData } from '../DataInfo/DataInfo';

interface Props {
  customData: Array<CustomOpenCloseData>;
  windowSize: WindowSize;
  max: maxMinData;
  min: maxMinData;
}

const CustomStockChart: React.FC<Props> = ({
  customData,
  windowSize,
  max,
  min,
}) => {
  //TODO: 나중에 서버에서 만들어서 가져오는 거로 ()
  // 서버에서 가져오는거로 변경함
  // let customData2: Array<CustomOpenCloseData> = [];
  // Array.from(data, (element: CompanyValueData) => {
  //   customData2 = [
  //     ...customData2,
  //     {
  //       date: element.date,
  //       openClose: [element.open, element.close],
  //       lowHigh: [element.low, element.high],
  //     },
  //   ];
  //   return customData2;
  // });

  return (
    <>
      <ComposedChart
        width={
          windowSize.width === 1000
            ? windowSize.width - 25
            : windowSize.width - 50
        }
        height={windowSize.width > 1000 ? 300 : 220}
        data={customData}
        margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis fontSize={10} tickSize={2} dataKey="date">
          <Label value="date" fontSize={12} position="insideBottom" />
        </XAxis>
        <YAxis
          fontSize={10}
          tickSize={2}
          dataKey="lowHigh"
          domain={[min[0] - min[0] * 0.15, max[0] + max[0] * 0.05]}
        />
        <Tooltip />
        <ReferenceLine x={min[1]} stroke="#c1d1fc" label={`${min[0]}`} />
        <ReferenceLine x={max[1]} stroke="#ffc5c5" label={`${max[0]}`} />
        <Bar
          type="monotone"
          stackId="a"
          barSize={2}
          dataKey="low"
          fill="#ffffff"
        />
        <Bar type="monotone" barSize={2} dataKey="lowHigh" fill="#8b85ff" />
        <Bar type="monotone" barSize={10} dataKey="openClose" fill="#fc46d4" />
      </ComposedChart>
    </>
  );
};

export default CustomStockChart;
