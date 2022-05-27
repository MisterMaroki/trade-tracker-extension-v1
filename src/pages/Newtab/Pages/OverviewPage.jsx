import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useRef } from 'react';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageContainer,
  tertiaryalt,
  GridItem,
  primarytext,
  purple,
  primarybg,
} from '../styles/themeVariables';
import CoinPageCoinItem from '../Components/CoinPageCoinItem';
import TradeTools from '../Components/TradeTools';
import { ChartState } from '../ChartContext';
import { chartDays } from '../../Content/config/data';
import PerformanceChart from '../Components/PerformanceChart';
import TradesTable from '../Components/TradesTable';
import MiniTradesTable from '../Components/MiniTradesTable';
import PerformanceSummary from '../Components/PerformanceSummary';
import WinLossPie from '../Components/WinLossPie';
import LongShortPie from '../Components/LongShortPie';

const OverviewPage = () => {
  const { trades } = CryptoState();

  return (
    <CoinPageContainer>
      <>
        <Box
          display="grid"
          gridTemplateColumns="repeat(16, 1fr)"
          gridTemplateRows="repeat(16,1fr)"
          height={'90vh'}
          gap={4}
          rowGap={4}
        >
          <Box gridColumn="1/7 " gridRow="2/8" className="chart-container">
            <GridItem className="carousel">
              <PerformanceSummary />
            </GridItem>
          </Box>
          <Box gridColumn="7/12 " gridRow="2/8" className="chart-container">
            <GridItem className="carousel">
              <WinLossPie />
            </GridItem>
          </Box>
          <Box gridColumn="12/-1" gridRow="2/8">
            <GridItem className="carousel">
              <LongShortPie />
            </GridItem>
          </Box>
          <Box gridColumn="span 10" gridRow="8/-1 ">
            <GridItem className="carousel">
              <PerformanceChart />
            </GridItem>
          </Box>
          <Box gridColumn="span 6" gridRow="8/-1">
            <GridItem className="carousel"></GridItem>
          </Box>
        </Box>
      </>
    </CoinPageContainer>
  );
};

export default OverviewPage;
