import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import {
  CoinCard,
  CoinPageContainer,
  tertiaryalt,
  GridItem,
  ChartContainer,
  tertiary,
  primarytext,
  ColorButton,
} from '../styles/themeVariables';
import CoinDetails from '../Components/CoinDetails';
import styled from '@mui/material/styles';
import CoinItem from '../Components/CoinItem';
import CoinPageCoinItem from '../Components/CoinPageCoinItem';
import TradeTools from '../Components/TradeTools';
import { ChartComponent, initialData } from '../Components/ChartComponent';
import { ChartState } from '../ChartContext';
import { chartDays } from '../../Content/config/data';

const CoinPage = () => {
  const { coin, coins } = CryptoState();
  const { days, setDays, historicalData } = ChartState();

  return (
    <CoinPageContainer>
      {!coin ? (
        <CircularProgress sx={{ color: tertiaryalt }} />
      ) : (
        <Box sx={{ width: 1 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(16, 1fr)"
            gridTemplateRows="repeat(16,1fr)"
            height={'90vh'}
            gap={4}
            rowGap={4}
          >
            <Box gridColumn="1/11 " gridRow="2/ 12">
              <CoinChart />
              {/* {historicalData && <ChartComponent />} */}
            </Box>
            <Box
              gridColumn="1/11 "
              gridRow="11/ 12"
              className="flex"
              justifyContent={'center'}
            >
              <ToggleButtonGroup value={days}>
                {chartDays.map((day) => (
                  <ToggleButton
                    value={day.value}
                    exclusive
                    style={{
                      color: day.value === days ? tertiary : primarytext,
                      backgroundColor: 'none',
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
            </Box>
            <Box gridColumn="11/-1" gridRow="2/12">
              <GridItem></GridItem>
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
              {/* <CoinDetails />{' '} */}
            </Box>
          </Box>
        </Box>
      )}
    </CoinPageContainer>
  );
};

export default CoinPage;
