import { Box, CircularProgress, Paper, Stack } from '@mui/material';
import React from 'react';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import {
  CoinCard,
  CoinPageContainer,
  tertiaryalt,
  GridItem,
  ChartContainer,
} from '../styles/themeVariables';
import CoinDetails from '../Components/CoinDetails';
import styled from '@mui/material/styles';
import CoinItem from '../Components/CoinItem';
import CoinPageCoinItem from '../Components/CoinPageCoinItem';
import TradeTools from '../Components/TradeTools';

const CoinPage = () => {
  const { coin, coins } = CryptoState();
  console.log('🚀 ~ file: CoinPage.jsx ~ line 17 ~ CoinPage ~ coin', coin);

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
              <CoinChart coin={coin} />
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
