import { Box, CircularProgress, Paper, Stack } from '@mui/material';
import React from 'react';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import {
  CoinCard,
  CoinPageContainer,
  tertiaryalt,
  GridItem,
} from '../styles/themeVariables';
import CoinDetails from '../Components/CoinDetails';
import styled from '@mui/material/styles';
import CoinItem from '../Components/CoinItem';
import CoinPageCoinItem from '../Components/CoinPageCoinItem';

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
            gridTemplateColumns="repeat(12, 1fr)"
            gridTemplateRows="repeat(12,1fr)"
            height={'90vh'}
            gap={2}
            rowGap={2}
          >
            <Box gridColumn="span 8" gridRow="span 7">
              <GridItem>
                <CoinChart coin={coin} />
              </GridItem>
            </Box>
            <Box gridColumn="span 4" gridRow="span 7">
              <GridItem>xs=4</GridItem>
            </Box>
            <Box gridColumn="span 8" gridRow="span 5">
              {coin && coins && (
                <CoinPageCoinItem
                  row={coins.find((item) => item.id === coin.id)}
                />
              )}
            </Box>
            <Box gridColumn="span 4" gridRow="span 5">
              <GridItem>xs=4</GridItem>
            </Box>
          </Box>
        </Box>
      )}
    </CoinPageContainer>
  );
};

export default CoinPage;
