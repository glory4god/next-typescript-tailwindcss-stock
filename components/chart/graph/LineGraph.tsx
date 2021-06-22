import React from 'react';
import cn from 'classnames';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Label,
  ReferenceLine,
} from 'recharts';
import { maxPrice, minPrice } from '../../../lib/context/Context';
import type { CompanyValueData } from '../../../types/chart/ChartType';
import type { WindowSize } from '../GraphHeader/GraphHeader';
import { maxMinData } from '../DataInfo/DataInfo';

interface Props {
  className?: string;
  data: Array<CompanyValueData>;
  YValue: string;
  windowSize: WindowSize;
}

const LineGraph: React.FC<Props> = ({
  className,
  data,
  YValue,
  windowSize,
}) => {
  const splitY = YValue.split('&');

  const max: maxMinData = maxPrice(data);
  const min: maxMinData = minPrice(data);

  return (
    <div className={cn(className, {})}>
      <h3>LINE GRAPH</h3>
      <LineChart
        width={
          windowSize.width === 1000
            ? windowSize.width - 25
            : windowSize.width - 50
        }
        height={windowSize.width > 1000 ? 300 : 220}
        data={data}
        margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis fontSize={10} tickSize={2} dataKey="date">
          <Label value="date" fontSize={12} position="insideBottom" />
        </XAxis>
        <YAxis
          tickSize={2}
          fontSize={10}
          domain={[min[0] - min[0] * 0.15, max[0] + max[0] * 0.05]}
        />
        <ReferenceLine x={min[1]} stroke="#c1d1fc" label={`${min[0]}`} />
        <ReferenceLine x={max[1]} stroke="#ffc5c5" label={`${max[0]}`} />
        <Tooltip />
        {splitY.map((element: string, key: number) => {
          return (
            <Line
              key={key}
              type="monotone"
              dot={false}
              dataKey={element}
              stroke={lineColor[key]}
            />
          );
        })}
      </LineChart>
    </div>
  );
};
export default LineGraph;

const lineColor = ['#8b85ff', ' #ff3f58', ' #3fc9ff', ' #ff3ff5'];
