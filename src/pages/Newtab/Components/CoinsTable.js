import { LinearProgress, Pagination } from '@mui/material';
import React from 'react';
import { CryptoState } from '../CryptoContext';
import { linearProgressSx, primarytext } from '../styles/themeVariables';
import Tilt from 'react-parallax-tilt';
import FadeIn from 'react-fade-in';

import CoinItem from './CoinItem';

const CoinsTable = () => {
  const { loading, handleSearch, page, setPage } = CryptoState();

  return (
    <>
      <div className="app__flex two-column ">
        {loading ? (
          <LinearProgress sx={linearProgressSx} />
        ) : (
          <>
            {handleSearch()
              ?.sort(() => 0.5 - Math.random())
              ?.slice((page - 1) * 6, (page - 1) * 6 + 6)
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
              })}
          </>
        )}
      </div>
      {handleSearch() && (
        <Pagination
          className="flex"
          style={{
            padding: 10,
            color: primarytext,
            position: 'fixed',
            bottom: 20,
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
