import styled from '@emotion/styled';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import {
  primarybg,
  primarytext,
  secondarybg,
  secondarytext,
  SectionContainer,
  CoinCard,
  tertiary,
  tertiaryalt,
  textFieldSx,
  typographySx,
} from '../styles/themeVariables';

import { numberWithCommas } from './banner/Carousel';
import CoinGrid from './CoinGrid';

const CoinsTable = () => {
  const [page, setPage] = useState(1);

  const { currency, symbol, coins, setCoins, loading, setLoading, search } =
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
              {/* <TableHead style={{ backgroundColor: secondarybg }}>
                <TableRow style={{ borderRadius: '10px' }}>
                  {['Coin', 'Rank', 'Price', '24h Change', 'Market Cap'].map(
                    (head, index) => (
                      <TableCell
                        style={{
                          fontWeight: 700,
                          borderRadius:
                            index === 0
                              ? '10px 0 0 10px'
                              : index === 4
                              ? '0 10px 10px 0'
                              : '0',
                        }}
                        key={head}
                        align={head === 'Coin' ? 'center' : 'right'}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead> */}

              {handleSearch()
                ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  return (
                    // <CoinCard
                    //   className="table-row"
                    // key={row.name}
                    // onClick={() => navigate(`/coins/${row.id}`)}
                    // >
                    //   <TableCell
                    //     component="th"
                    //     scope="row"
                    //     style={{ display: 'flex', gap: 15 }}
                    //   >
                    // <img src={row.image} alt={row.name} height="50" />
                    // <div className="flex col">
                    //   <span
                    //     style={{
                    //       fontSize: 20,
                    //       textTransform: 'uppercase',
                    //     }}
                    //   >
                    //     {row.symbol}
                    //   </span>
                    //   <span style={{ color: 'darkgrey' }}>{row.name}</span>
                    // </div>
                    //   </TableCell>
                    //   <TableCell align="right">
                    //     #{row.market_cap_rank}
                    //   </TableCell>
                    //   <TableCell align="right">
                    //     {symbol}{' '}
                    //     {numberWithCommas(row.current_price.toFixed(2))}
                    //   </TableCell>
                    //   <TableCell
                    //     align="right"
                    //     style={{
                    //       color: profit > 0 ? 'green' : 'red',
                    //       fontWeight: 500,
                    //     }}
                    //   >
                    //     {profit && '+'}{' '}
                    //     {row.price_change_percentage_24h.toFixed(2)}%
                    //   </TableCell>
                    //   <TableCell align="right">
                    //     {symbol}{' '}
                    //     {numberWithCommas(
                    //       row.market_cap.toString().slice(0, -6)
                    //     )}
                    //     M
                    //   </TableCell>
                    // </CoinCard>
                    <CoinGrid row={row} />
                  );
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
