import { LinearProgress, Pagination } from '@mui/material';
import React, { useMemo } from 'react';
import { CryptoState } from '../CryptoContext';
import {
  black,
  linearProgressSx,
  primarytext,
  white,
} from '../styles/themeVariables';
import Tilt from 'react-parallax-tilt';
import FadeIn from 'react-fade-in';

import CoinItem from '../Components/cards/CoinItem';
import chroma from 'chroma-js';

const CoinsTable = () => {
  const { loading, handleSearch, page, setPage, currentColor, coins } =
    CryptoState();

  const coinItems = useMemo(
    () =>
      handleSearch()
        ?.sort(() => 0.5 - Math.random())

        .map((row) => {
          return (
            <Tilt
              tiltEnable={false}
              glareEnable={true}
              glareMaxOpacity={0.05}
              glareColor="white"
              glarePosition="bottom"
            >
              <CoinItem row={row} />
            </Tilt>
          );
        }),
    [coins]
  );

  return (
    <>
      <div className="app__flex two-column ">
        {loading ? (
          <LinearProgress sx={linearProgressSx} />
        ) : (
          <>{coinItems?.slice((page - 1) * 6, (page - 1) * 6 + 6)}</>
        )}
      </div>
      {handleSearch() && (
        <Pagination
          className="flex"
          style={{
            padding: 10,
            position: 'fixed',
            bottom: 20,
            color: 'white',
          }}
          sx={{
            '& .css-19micn4-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
              { backgroundColor: currentColor, color: `${black} !important` },
            '& .css-19micn4-MuiButtonBase-root-MuiPaginationItem-root': {
              color: white,
            },
          }}
          page={page}
          color="secondary"
          count={Math.floor(handleSearch()?.length / 6)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 220);
          }}
        />
      )}
    </>
  );
};

export default CoinsTable;
