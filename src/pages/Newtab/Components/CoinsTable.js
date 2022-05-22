import { LinearProgress, Pagination } from '@mui/material';
import React, { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { linearProgressSx, primarytext } from '../styles/themeVariables';

import CoinItem from './CoinItem';

const CoinsTable = () => {
  const [page, setPage] = useState(1);

  const { loading, handleSearch } = CryptoState();

  return (
    <>
      {/* <SectionContainer>
        <Typography variant="h6" style={typographySx}>
          All Coins
        </Typography>
      </SectionContainer> */}
      <>
        <div className="app__flex two-column">
          {loading ? (
            <LinearProgress sx={linearProgressSx} />
          ) : (
            <>
              {handleSearch()
                ?.slice((page - 1) * 9, (page - 1) * 9 + 9)
                .map((row) => {
                  return <CoinItem row={row} />;
                })}
            </>
          )}
        </div>
        {handleSearch() && (
          <Pagination
            className="flex"
            style={{ padding: 10, color: primarytext }}
            page={page}
            color="secondary"
            count={Math.floor(handleSearch()?.length / 9)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 220);
            }}
          />
        )}
      </>
    </>
  );
};

export default CoinsTable;
