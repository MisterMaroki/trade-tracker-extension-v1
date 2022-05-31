import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts';
import { ChartState } from '../../ChartContext';
import { CryptoState } from '../../CryptoContext';
import { numberWithCommas } from '../banner/Carousel';

const AccountLineChart = () => {
  const { trades, currency } = CryptoState();
  const sortedClosedTrades = trades
    ?.filter((a) => !a.active)
    ?.sort((a, b) => Date.parse(a.closed) - Date.parse(b.closed));
  const cumulativePnlData = sortedClosedTrades.map((trade, index) => {
    const currentAcumPnl = sortedClosedTrades
      .slice(0, index + 1)
      .reduce((acc, current) => {
        return acc + (current.value - current.invested);
      }, 0);

    return {
      name: index,
      result: (trade.value - trade.invested).toFixed(2),
      cumulative: currentAcumPnl.toFixed(2),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="value">{`return:${numberWithCommas(
            payload[0].value
          )} ${currency}`}</p>
          <p className="value">{`cumulative:${numberWithCommas(
            payload[0].payload.cumulative
          )} ${currency}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        height: '70%',
        width: '100%',
        position: 'absolute',
        bottom: '20px',
      }}
    >
      <ResponsiveContainer height="100%">
        <ComposedChart
          data={cumulativePnlData}
          margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar type="monotone" dataKey="result" stroke="#8884d8" />
          {/* <Bar dataKey="pv" barSize={20} fill="#413ea0" /> */}
          <Line
            type="monotone"
            dataKey="cumulative"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export { AccountLineChart };
