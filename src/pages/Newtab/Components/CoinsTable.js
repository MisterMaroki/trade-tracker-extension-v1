import { LinearProgress, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import {
  primarytext,
  SectionContainer,
  tertiaryalt,
  typographySx,
} from '../styles/themeVariables';

import CoinItem from './CoinItem';

const CoinsTable = () => {
  const [page, setPage] = useState(1);

  const { currency, coins, setCoins, loading, setLoading, search } =
    CryptoState();

  const fetchCoins = async () => {
    setLoading(true);

    const data = await axios.get(CoinList(currency));
    if (data.data !== coins) setCoins(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    if (coins?.length > 20 && !loading) {
      return coins?.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    }
  };

  return (
    <>
      <SectionContainer>
        <Typography variant="h6" style={typographySx}>
          All Coins
        </Typography>
      </SectionContainer>
      <>
        <div className="app__flex two-column">
          {loading ? (
            <LinearProgress sx={{ color: tertiaryalt }} />
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
