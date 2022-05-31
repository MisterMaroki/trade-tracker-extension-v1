import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageContainer,
  GridChartItem,
  primarybg,
  primarytext,
} from '../styles/themeVariables';
import SankeyChart from '../Components/charts/SankeyChart';
import PerformanceSummary from '../Components/cards/PerformanceSummary';
import WinLossPie from '../Components/charts/WinLossPie';
import LongShortPie from '../Components/charts/LongShortPie';
import { ResponsiveContainer } from 'recharts';
import { AccountLineChart } from '../Components/charts/AccountLineChart';

const OverviewPage = () => {
  const { trades, currentColor } = CryptoState();
  const [currentChart, setCurrentChart] = useState('line');

  return (
    <CoinPageContainer>
      <Box
        display="grid"
        gridTemplateColumns="repeat(16, 1fr)"
        gridTemplateRows="repeat(16,1fr)"
        height={'90vh'}
        gap={4}
        rowGap={4}
      >
        <Box gridColumn="1/7 " gridRow="2/8" className="chart-container">
          <GridChartItem>
            <PerformanceSummary />
          </GridChartItem>
        </Box>
        <Box gridColumn="7/12 " gridRow="2/8" className="chart-container">
          <GridChartItem className="carousel">
            <WinLossPie />
          </GridChartItem>
        </Box>
        <Box gridColumn="12/-1" gridRow="2/8" className="chart-container">
          <GridChartItem className="carousel">
            <LongShortPie />
          </GridChartItem>
        </Box>
        <Box gridColumn="span 10" gridRow="8/-1" className="chart-container">
          <GridChartItem className="carousel" s>
            <ToggleButtonGroup
              value={currentChart}
              sx={{
                position: 'sticky',
                zIndex: 10,
                top: '0',
                left: '0',
              }}
            >
              {['line', 'sankey', 'bars', 'treemap'].map((option) => (
                <ToggleButton
                  exclusive="true"
                  value={option}
                  style={{
                    color: currentChart === option ? currentColor : primarytext,
                    backgroundColor: primarybg,
                    '&:hover': {
                      backgroundColor: '#09111b',
                    },
                  }}
                  key={option}
                  onClick={() => setCurrentChart(() => option)}
                >
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            {currentChart === 'sankey' && <SankeyChart />}
            {currentChart === 'line' && <AccountLineChart />}
          </GridChartItem>
        </Box>
        <Box gridColumn="span 6" gridRow="8/-1" className="chart-container">
          <GridChartItem></GridChartItem>
        </Box>
      </Box>
    </CoinPageContainer>
  );
};

export default OverviewPage;
