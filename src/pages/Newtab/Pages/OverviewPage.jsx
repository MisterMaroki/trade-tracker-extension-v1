import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import CoinChart from '../Components/charts/CoinChart';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageContainer,
  tertiaryalt,
  GridItem,
  primarytext,
  purple,
  primarybg,
  GridChartItem,
} from '../styles/themeVariables';
import CoinPageCoinItem from '../Components/cards/CoinPageCoinItem';
import TradeTools from '../Components/TradeTools';
import { ChartState } from '../ChartContext';
import { chartDays } from '../../Content/config/data';
import SankeyChart from '../Components/charts/SankeyChart';
import TradesTable from '../Components/TradesTable';
import MiniTradesTable from '../Components/MiniTradesTable';
import PerformanceSummary from '../Components/cards/PerformanceSummary';
import WinLossPie from '../Components/charts/WinLossPie';
import LongShortPie from '../Components/charts/LongShortPie';
import { ResponsiveContainer } from 'recharts';

const OverviewPage = () => {
  const { trades } = CryptoState();
  const [currentChart, setCurrentChart] = useState('sankey');

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
          <GridChartItem className="carousel">
            <ResponsiveContainer width="100%" height="100%">
              <SankeyChart />
            </ResponsiveContainer>
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
