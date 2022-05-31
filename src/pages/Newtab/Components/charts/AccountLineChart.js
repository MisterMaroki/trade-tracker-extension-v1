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
} from 'recharts';
import { ChartState } from '../../ChartContext';
import { CryptoState } from '../../CryptoContext';

const AccountLineChart = () => {
  const { trades } = CryptoState();
  const sortedClosedTrades = trades
    ?.filter((a) => !a.active)
    ?.sort((a, b) => Date.parse(a.closed) - Date.parse(b.closed));
  const cumulativePnlData = sortedClosedTrades.map((trade, index) => {
    const currentAcumPnl = trades.slice(0, index).reduce((acc, current) => {
      console.log(
        '🚀 ~ file: AccountLineChart.js ~ line 58 ~ .reduce ~ current',
        current
      );

      return acc + (current.value - current.invested);
    }, 0);

    return {
      name: index,
      result: (trade.value - trade.invested).toFixed(2),
      cumulative: currentAcumPnl.toFixed(2),
    };
  });

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
        <LineChart
          data={cumulativePnlData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="result"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export { AccountLineChart };
