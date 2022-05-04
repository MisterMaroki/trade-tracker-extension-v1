import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './banner/Carousel';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const data = await axios.get(CoinList(currency));
    if (data.data !== coins) setCoins(data.data);
    setLoading(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    if (coins.length > 20 && !loading) {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    }
  };

  return (
    <Container style={{ paddingTop: 25, maxWidth: 'none' }}>
      <Typography
        variant="h6"
        style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
      >
        By Market Cap
      </Typography>

      <TextField
        variant="outlined"
        label="Search for a coin..."
        style={{ marginBottom: 20, width: '100%' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: 'whitesmoke' }}>
              <TableRow style={{ borderRadius: '10px' }}>
                {['Coin', 'Price', '24h Change', 'Market Cap'].map(
                  (head, index) => (
                    <TableCell
                      style={{
                        fontWeight: 700,
                        borderRadius:
                          index === 0
                            ? '10px 0 0 10px'
                            : index === 3
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
            </TableHead>
            <TableBody>
              {handleSearch()?.map((row) => {
                const profit = row.price_change_percentage_24h > 0;

                return (
                  <TableRow className="table-row" key={row.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ display: 'flex', gap: 15, paddingLeft: 0 }}
                    >
                      <img
                        src={row.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 0 }}
                      />
                      <div className="app__flex col">
                        <span
                          style={{ fontSize: 20, textTransform: 'uppercase' }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: 'darkgrey' }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? 'black' : 'red',
                        fontWeight: 500,
                      }}
                    >
                      {profit && '+'}{' '}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{' '}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      M
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default CoinsTable;
