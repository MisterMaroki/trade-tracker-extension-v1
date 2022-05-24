import React from 'react';
import { Sankey, Tooltip } from 'recharts';
import { CryptoState } from '../CryptoContext';
const data0 = {
  nodes: [
    {
      name: 'Total',
    },
    {
      name: 'Win',
    },
    {
      name: 'Long',
    },
    {
      name: 'Short',
    },
    {
      name: 'Loss',
    },
    {
      name: 'Long',
    },
    {
      name: 'Short',
    },

    {
      name: 'Total Long',
    },
    {
      name: 'Total Short',
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 27,
    },
    {
      source: 0,
      target: 4,
      value: 73,
    },
    {
      source: 1,
      target: 2,
      value: 5,
    },
    {
      source: 1,
      target: 3,
      value: 22,
    },

    {
      source: 4,
      target: 5,
      value: 25,
    },
    {
      source: 4,
      target: 6,
      value: 48,
    },
    {
      source: 5,
      target: 7,
      value: 25,
    },
    {
      source: 6,
      target: 8,
      value: 48,
    },
    {
      source: 2,
      target: 7,
      value: 5,
    },
    {
      source: 3,
      target: 8,
      value: 22,
    },
  ],
};

const PerformanceChart = () => {
  const { currentColor } = CryptoState();
  return (
    <Sankey
      width={960}
      height={500}
      data={data0}
      node={{ stroke: currentColor, strokeWidth: 2 }}
      nodePadding={50}
      margin={{
        left: 200,
        right: 200,
        top: 100,
        bottom: 100,
      }}
      link={{ stroke: currentColor }}
    >
      <Tooltip />
    </Sankey>
  );
};

export default PerformanceChart;
