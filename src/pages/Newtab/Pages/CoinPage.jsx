import { CircularProgress, Stack } from '@mui/material';
import React from 'react';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import { CoinCard, tertiaryalt } from '../styles/themeVariables';
import CoinDetails from '../Components/CoinDetails';

const CoinPage = () => {
  const { coin } = CryptoState();

  return (
    <div class="container">
      {!coin ? (
        <CircularProgress sx={{ color: tertiaryalt }} />
      ) : (
        <>
          <CoinChart coin={coin} />
          <CoinDetails />
        </>
      )}
    </div>
  );
};

export default CoinPage;
