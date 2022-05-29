import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useRef } from 'react';
import CoinChart from '../Components/charts/CoinChart';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageContainer,
  tertiaryalt,
  GridItem,
  primarytext,
  purple,
  primarybg,
} from '../styles/themeVariables';
import CoinPageCoinItem from '../Components/cards/CoinPageCoinItem';
import TradeTools from '../Components/TradeTools';
import { ChartState } from '../ChartContext';
import { chartDays } from '../../Content/config/data';
import SankeyChart from '../Components/charts/SankeyChart';
import TradesTable from '../Components/TradesTable';
import MiniTradesTable from '../Components/MiniTradesTable';

const CoinPage = () => {
  const {
    symbol,
    setId,
    setSearch,
    setCoin,
    coin,
    coins,
    currency,
    currentColor,

    id,
  } = CryptoState();

  const { days, setDays, historicalData } = ChartState();

  const ref = useRef();

  return (
    <CoinPageContainer>
      {!coin ? (
        <CircularProgress sx={{ color: currentColor }} />
      ) : (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(16, 1fr)"
            gridTemplateRows="repeat(16,1fr)"
            height={'90vh'}
            gap={4}
            rowGap={4}
          >
            <Box gridColumn="1/11 " gridRow="2/ 12" className="chart-container">
              <ToggleButtonGroup
                value={days}
                sx={{
                  position: 'absolute',
                  top: '2px',
                  transform: 'translateX(2px)',
                }}
              >
                {chartDays.map((day) => (
                  <ToggleButton
                    value={day.value}
                    exclusive={true}
                    style={{
                      color: day.value === days ? currentColor : primarytext,
                      backgroundColor: primarybg,
                      '&:hover': {
                        backgroundColor: '#09111b',
                      },
                    }}
                    key={day.label}
                    onClick={() => setDays(day.value)}
                  >
                    {day.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <CoinChart />
            </Box>
            <Box gridColumn="11/-1" gridRow="2/12">
              <GridItem
                className="carousel"
                sx={{ overflowY: 'scroll' }}
                ref={ref}
              >
                {/* Carousel banner style container, scrollable list of trades of
                this coin. Each trade will show a snapshot of the chart at that
                time! */}
                <MiniTradesTable refs={ref} />
              </GridItem>
            </Box>
            <Box gridColumn="span 8" gridRow="12/-1 ">
              {coin && coins && (
                <CoinPageCoinItem
                  row={coins.find((item) => item.id === coin.id)}
                />
              )}
            </Box>
            <Box gridColumn="span 8" gridRow="12/-1">
              <TradeTools />
            </Box>
          </Box>
        </>
      )}
    </CoinPageContainer>
  );
};

export default CoinPage;
