import { CircularProgress, Stack } from '@mui/material';
import React from 'react';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import { CoinCard, tertiaryalt } from '../styles/themeVariables';
import CoinDetails from '../Components/CoinDetails';

const CoinPage = () => {
  const { coin } = CryptoState();

  return (
    <Stack direction="row" spacing={2} sx>
      {!coin ? (
        <CircularProgress sx={{ color: tertiaryalt }} />
      ) : (
        <>
          <CoinDetails />

          <CoinCard>
            <CoinChart coin={coin} />
          </CoinCard>
        </>
      )}
    </Stack>
  );
};

export default CoinPage;
