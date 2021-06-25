import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Label,
  ReferenceLine,
} from 'recharts';
import type { CompanyValueData } from '../../../types/chart/ChartType';
import type { WindowSize } from '../GraphHeader/GraphHeader';
import { maxMinData } from '../DataInfo/DataInfo';

interface Props {
  data: Array<CompanyValueData>;
  YValue: string;
  windowSize: WindowSize;
  max: maxMinData;
  min: maxMinData;
}

const HistoGraph: React.FC<Props> = ({
  data,
  YValue,
  windowSize,
  max,
  min,
}) => {
  return (
    <>
      <h3>HISTO GRAPH</h3>
      <BarChart
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
          fontSize={10}
          tickSize={2}
          domain={[min[0] - min[0] * 0.15, max[0] + max[0] * 0.05]}
        />
        <ReferenceLine x={min[1]} stroke="#c1d1fc" label={`${min[0]}`} />
        <ReferenceLine x={max[1]} stroke="#ffc5c5" label={`${max[0]}`} />
        <Legend />
        <Tooltip />
        <Bar type="monotone" dataKey={YValue} fill="#8b85ff" />
      </BarChart>
    </>
  );
};
export default HistoGraph;
