import { ArrowCircleDown } from '@mui/icons-material';
import { ArrowCircleUp } from '@mui/icons-material';
import {
  Chip,
  Container,
  LinearProgress,
  Pagination,
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
import { SingleCoin } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './banner/Carousel';

const TradesTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  const { currency, symbol, trades, setTrades, coins, setCoins } =
    CryptoState();
  console.log(
    '🚀 ~ file: TradesTable.js ~ line 30 ~ TradesTable ~ coins',
    coins
  );

  const navigate = useNavigate();

  useEffect(() => {
    // setRows(() =>
    async function setData() {
      let x = await Promise.all(
        trades.map(async (trade) => {
          //here I want the PromiseResult
          let j = await findProfits(trade, 'current-value');
          console.log('🚀 ~ file: TradesTable.js ~ line 43 ~ x ~ j', j);

          return {
            ...trade,
            invested: numberWithCommas(trade.quantity * trade.price),
            date: formatDate(trade.date),
            value: j,
          };
        })
      );
      console.log('🚀 ~ file: TradesTable.js ~ line 53 ~ x ~ x', x);
    }
    setData();
    // );
  }, [trades]);

  const findProfits = async (trade, type) => {
    const { data } = await axios.get(SingleCoin(trade.coin));
    const differenceMultiplier =
      (await data?.market_data.current_price.usd) / trade.price;

    const currentValue = trade.invested * differenceMultiplier;
    if (type === 'current-value') {
      //this returns a promise when i call it on line 79
      return currentValue;
    }
  };
  const currentValue = async (trade) =>
    await findProfits(trade, 'current-value');

  const handleSearch = () => {
    if (rows.length) {
      return rows.filter(
        (trade) =>
          trade.coin.toLowerCase().includes(search) ||
          trade.ticker.toLowerCase().includes(search)
      );
    }
  };

  return (
    <Container style={{ paddingTop: 25, maxWidth: 'none' }}>
      <Typography
        variant="h6"
        style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
      >
        Trades History
      </Typography>

      <TextField
        variant="outlined"
        label="Search for a coin..."
        style={{ marginBottom: 20, width: '100%' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        {
          <Table>
            <TableHead style={{ backgroundColor: 'whitesmoke' }}>
              <TableRow style={{ borderRadius: '10px' }}>
                {[
                  'Ticker',
                  'PnL',
                  'Date',
                  'Price',
                  'Quantity',
                  'Invested',
                  'Fiat',
                ].map((head, index) => (
                  <TableCell
                    style={{
                      fontWeight: 700,
                      borderRadius:
                        index === 0
                          ? '10px 0 0 10px'
                          : index === 6
                          ? '0 10px 10px 0'
                          : '0',
                    }}
                    key={head}
                    align={head === 'Ticker' ? 'left' : 'right'}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                ?.slice((page - 1) * 8, (page - 1) * 8 + 8)
                .map((row) => {
                  return (
                    <TableRow
                      className="table-row"
                      key={row?.id}
                      onClick={() => navigate(`/coins/${row?.coin}`)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: 'flex',
                          gap: 15,
                          justifyContent: 'flex-start',
                          width: 50,
                        }}
                      >
                        <div className="flex col">
                          <span
                            style={{
                              fontSize: 20,
                              textTransform: 'uppercase',
                            }}
                          >
                            {row?.ticker}
                          </span>
                          <span style={{ color: 'darkgrey' }}>{row?.coin}</span>
                        </div>
                        <div className="flex">
                          {row?.direction === 'buy' ? (
                            <Chip
                              label="buy"
                              color="success"
                              size="small"
                              icon={<ArrowCircleUp />}
                            />
                          ) : (
                            <Chip
                              label="sell"
                              color="warning"
                              icon={<ArrowCircleDown />}
                              size="small"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {async () => JSON.stringify(await currentValue(row))}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(row?.date)}
                      </TableCell>
                      <TableCell align="right">{row?.price}</TableCell>
                      <TableCell align="right">{row?.quantity}</TableCell>
                      <TableCell align="right">{row?.invested}</TableCell>
                      <TableCell align="right">
                        {row?.fiat?.toUpperCase()}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        }
      </TableContainer>
      {handleSearch() && (
        <Pagination
          className="flex"
          style={{ padding: 10 }}
          count={Math.ceil(handleSearch()?.length / 8)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 120);
          }}
        />
      )}
    </Container>
  );
};

export default TradesTable;

const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};
