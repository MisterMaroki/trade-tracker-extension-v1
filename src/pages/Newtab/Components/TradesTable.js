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
import ReactTimeAgo from 'react-time-ago';
import { SingleCoin } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './banner/Carousel';

const TradesTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  const { currency, symbol, trades, setTrades, coins, setCoins } =
    CryptoState();

  const navigate = useNavigate();

  useEffect(() => {
    // setRows(() =>
    async function rowDataEnrichment() {
      let enrichedRows = await Promise.all(
        trades.map(async (trade) => {
          const currentMarketValue = await findProfits(trade, 'current-value');
          const percentChange = await findProfits(trade, 'percent-change');

          return {
            ...trade,
            invested: trade.quantity * trade.price,
            value: currentMarketValue,
            change: percentChange,
          };
        })
      );

      setRows(enrichedRows);
    }
    rowDataEnrichment();
    // );
  }, [trades]);

  const findProfits = async (trade, type) => {
    const { data } = await axios.get(SingleCoin(trade.coin));
    const differenceMultiplier =
      (await data?.market_data.current_price.usd) / trade.price;

    const currentValue = trade.invested * differenceMultiplier;
    if (type === 'current-value') {
      return currentValue;
    }
    if (type === 'percent-change') {
      return differenceMultiplier;
    }
  };

  const renderPnl = (row) => {
    let data =
      row.direction === 'buy'
        ? (row.value - row.invested).toFixed(2)
        : (row.invested - row.value).toFixed(2);
    return data;
  };

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
                  '% Change',
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
                          : index === 7
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
                      <TableCell
                        align="right"
                        style={{ color: renderPnl(row) >= 0 ? 'green' : 'red' }}
                      >
                        {numberWithCommas(renderPnl(row))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ color: renderPnl(row) >= 0 ? 'green' : 'red' }}
                      >
                        {`${(
                          (row.change > 0 ? row.change - 1 : 1 - row?.change) *
                          100
                        ).toFixed(2)}%`}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(row?.date)}
                        <div>
                          Opened: <ReactTimeAgo date={row?.date} />
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {parseFloat(row?.price)?.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{row?.quantity}</TableCell>
                      <TableCell align="right">
                        {numberWithCommas(row?.invested.toFixed(2))}
                      </TableCell>
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
