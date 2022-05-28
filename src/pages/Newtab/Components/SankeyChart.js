import React from 'react';
import { Layer, Rectangle, Sankey, Tooltip } from 'recharts';
import { ChartState } from '../ChartContext';
import { CryptoState } from '../CryptoContext';
import { white } from '../styles/themeVariables';

const SankeyChart = () => {
  const { currentColor, trades } = CryptoState();
  const {
    allClosedTrades,
    totalClosedPositions,
    allWins,
    allLosses,
    allWinsLong,
    allWinsShort,
    allLossesLong,
    allLossesShort,
  } = ChartState();

  const data0 = {
    nodes: [
      {
        name: 'Closed',
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
        value: allWins?.length,
      },
      {
        source: 0,
        target: 4,
        value: allLosses?.length,
      },
      {
        source: 1,
        target: 2,
        value: allWinsLong?.length,
      },
      {
        source: 1,
        target: 3,
        value: allWinsShort?.length,
      },

      {
        source: 4,
        target: 5,
        value: allLossesLong?.length,
      },
      {
        source: 4,
        target: 6,
        value: allLossesShort?.length,
      },
      {
        source: 5,
        target: 7,
        value: allLossesLong?.length,
      },
      {
        source: 6,
        target: 8,
        value: allLossesShort?.length,
      },
      {
        source: 2,
        target: 7,
        value: allWinsLong?.length,
      },
      {
        source: 3,
        target: 8,
        value: allLossesShort?.length,
      },
    ],
  };

  const MyCustomNode = ({
    x,
    y,
    width,
    height,
    index,
    payload,
    containerWidth,
  }) => {
    const isOut = x + width + 6 > containerWidth;
    return (
      <Layer key={`CustomNode${index}`}>
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill={currentColor}
          fillOpacity="1"
        />
        <text
          textAnchor={isOut ? 'end' : 'start'}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2}
          fontSize="14"
          stroke={white}
        >
          {payload.name}
        </text>
        <text
          textAnchor={isOut ? 'end' : 'start'}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2 + 13}
          fontSize="12"
          stroke={currentColor}
          strokeWidth={2}
        >
          {`${payload.value}`}
        </text>
      </Layer>
    );
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Sankey
        width={750}
        height={400}
        data={data0}
        node={MyCustomNode}
        nodePadding={50}
        margin={{
          left: 70,
          right: 0,
          top: 100,
          bottom: 20,
        }}
        link={{ stroke: currentColor }}
      >
        <Tooltip />
      </Sankey>
    </div>
  );
};

export default SankeyChart;
