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

import CoinGrid from './CoinGrid';

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
                ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  return <CoinGrid row={row} />;
                })}
            </>
          )}
        </div>
        {handleSearch() && (
          <Pagination
            className="flex"
            style={{ padding: 10, color: primarytext }}
            count={handleSearch()?.length / 10}
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
