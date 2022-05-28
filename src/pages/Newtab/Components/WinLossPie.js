import { Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import ChartContext, { ChartState } from '../ChartContext';
import { CryptoState } from '../CryptoContext';
import {
  PieContainer,
  primarytext,
  secondarybg,
  typographySx,
  white,
} from '../styles/themeVariables';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  //   const sx = cx + (outerRadius - 50) * cos;
  //   const sy = cy + (outerRadius + 50) * sin;
  //   const mx = cx + (outerRadius - 90) * cos;
  //   const my = cy + (outerRadius + 50) * sin;
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={primarytext}
      >{`${payload.name === 'Wins' ? 'Wins: ' : 'Losses: '} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={white}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function LongShortPie() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { allWins, allLosses } = ChartState();
  const { trades, currentColor } = CryptoState();
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const data = [
    { name: 'Wins', value: allWins?.length },
    { name: 'Losses', value: allLosses?.length },
  ];

  return (
    <PieContainer>
      <div>
        <Typography variant="h6" style={typographySx}>
          Win Rate
        </Typography>
      </div>
      <ResponsiveContainer className="carousel">
        <PieChart style={{ marginTop: '-12px' }}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={45}
            outerRadius={60}
            fill={currentColor}
            dataKey="value"
            onMouseEnter={onPieEnter}
            cy={100}
          />
        </PieChart>
      </ResponsiveContainer>
    </PieContainer>
  );
}
