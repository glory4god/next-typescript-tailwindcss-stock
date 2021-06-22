import React from 'react';
import cn from 'classnames';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Label,
  ReferenceLine,
} from 'recharts';

import {
  volumeMaxPrice,
  volumeMinPrice,
} from '../../../lib/context/ChartContext';
import type { CompanyValueData } from '../../../types/chart/ChartType';
import type { WindowSize } from '../GraphHeader/GraphHeader';
import { maxMinData } from '../DataInfo/DataInfo';
interface Props {
  className?: string;
  data: Array<CompanyValueData>;
  YValue: string;
  windowSize: WindowSize;
}

type VolumeData = {
  date: string | undefined;
  volumeRed?: number;
  volumeBlue?: number;
};

const VolumHistoGraph: React.FC<Props> = React.memo(
  ({ className, data, YValue, windowSize }) => {
    let customData: Array<VolumeData> = [];

    // 나중에 서버에서 만들어서 가져오는 걸로
    Array.from(data, (element: CompanyValueData) => {
      customData = [
        ...customData,
        {
          date: element.date,
          volumeRed: element.close >= element.open ? element.volume : 0,
          volumeBlue: element.close >= element.open ? 0 : element.volume,
        },
      ];
      return customData;
    });
    const max: maxMinData = volumeMaxPrice(data);
    const min: maxMinData = volumeMinPrice(data);

    return (
      <div className={cn(className)}>
        <h3>VOLUME</h3>
        <BarChart
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
            domain={[
              ((min[0] - min[0]) / 1000) * 0.15,
              ((max[0] + max[0]) / 1000) * 0.05,
            ]}
          />
          <ReferenceLine x={max[1]} stroke="#ffeeee" label={`${max[0]}`} />
          <Tooltip />
          <Bar type="monotone" dataKey="volumeRed" fill="#ff0000" />
          <Bar type="monotone" dataKey="volumeBlue" fill="#0004ff" />
        </BarChart>
      </div>
    );
  },
);

export default VolumHistoGraph;
