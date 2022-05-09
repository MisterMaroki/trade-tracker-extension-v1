import { ArrowCircleDown } from '@mui/icons-material';
import { DeleteOutlined } from '@mui/icons-material';
import { ArrowCircleUp } from '@mui/icons-material';
import {
  Button,
  Chip,
  Container,
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
import { CryptoState, deepEqual } from '../CryptoContext';
import { numberWithCommas } from './banner/Carousel';

const TradesTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  //   const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState();

  const {
    currency,
    symbol,
    trades,
    setTrades,
    coins,
    setCoins,
    deleteRow,
    rowDataEnrichment,
  } = CryptoState();

  const navigate = useNavigate();

  //   useEffect(() => {
  //     localStorage.getItem('trades')
  //       ? !deepEqual(trades, JSON.parse(localStorage.getItem('trades'))) &&
  //         localStorage.setItem('trades', JSON.stringify(trades))
  //       : localStorage.setItem('trades', []);
  //   }, [trades]);

  useEffect(() => {
    rowDataEnrichment();
  }, [filter]);

  const renderPnl = (row) => {
    let data =
      row.direction === 'buy'
        ? (row.value - row.invested).toFixed(2)
        : (row.invested - row.value).toFixed(2);
    return data;
  };

  const handleSearch = () => {
    if (search !== '') {
      return trades.filter(
        (trade) =>
          trade.coin.toLowerCase().includes(search) ||
          trade.ticker.toLowerCase().includes(search)
      );
    } else return trades;
  };

  const handleFilter = () => {
    filter === 'all' ? setFilter('') : setFilter('all');
  };

  return (
    <Container style={{ paddingTop: 25, maxWidth: 'none' }}>
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
        >
          {filter === 'all' ? 'All Trades' : 'Active Trades'}
        </Typography>
        <Button onClick={handleFilter}>
          Show {filter === 'all' ? 'Active Trades' : 'All Trades'}
        </Button>
      </div>

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
                ?.filter((item) =>
                  filter === 'all' ? { item } : item.active === true
                )
                ?.slice((page - 1) * 8, (page - 1) * 8 + 8)
                .map((row) => {
                  return (
                    <TableRow
                      className="table-row"
                      key={row?.id}
                      onClick={(e) => {
                        var element = e.target.textContent;
                        if (element === 'close') {
                          deleteRow(row);
                        } else {
                          navigate(`/coins/${row?.coin}`);
                        }
                      }}
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
                        style={{
                          color: renderPnl(row) >= 0 ? 'green' : 'red',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {filter !== 'all' && (
                            <Chip
                              label="close"
                              color="primary"
                              icon={<DeleteOutlined />}
                              size="small"
                              onClick={() => deleteRow(row)}
                            />
                          )}
                          {`${(
                            (row.change > 0
                              ? row.change - 1
                              : 1 - row?.change) * 100
                          ).toFixed(2)}%`}
                        </div>
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
                        {numberWithCommas(
                          (row?.quantity * row?.price).toFixed(2)
                        )}
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

export const formatDate = (date) => {
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
