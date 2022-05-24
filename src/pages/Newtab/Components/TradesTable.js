import { ArrowCircleDown } from '@mui/icons-material';
import { DeleteOutlined } from '@mui/icons-material';
import { ArrowCircleUp } from '@mui/icons-material';
import {
  Chip,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { CryptoState } from '../CryptoContext';
import {
  black,
  primarytext,
  TradesPageContainer,
  white,
} from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import FadeIn from 'react-fade-in';

const TradesTable = () => {
  // const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  //   const [rows, setRows] = useState([]);

  const {
    trades,
    closeTrade,
    rowDataEnrichment,
    setId,
    search,
    setShowTrades,
    filter,
    handleFilter,
    currentColor,
  } = CryptoState();

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

  const tradesArray = handleSearch()
    ?.filter((item) => (filter === 'closed' ? !item.active : item.active))
    ?.sort((a, b) => {
      return filter === 'closed'
        ? Date.parse(b.closed) - Date.parse(a.closed)
        : Date.parse(b.date) - Date.parse(a.date);
    })
    ?.slice((page - 1) * 8, (page - 1) * 8 + 8);
  return (
    <TradesPageContainer>
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Ubuntu' }}
        >
          {filter === 'closed' ? 'Closed Trades' : 'Active Trades'}
        </Typography>
        <button onClick={() => handleFilter('')}>
          Show {filter === 'closed' ? 'Active Trades' : 'Closed Trades'}
        </button>
      </div>

      <TableContainer>
        <FadeIn>
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
                    `${filter === 'closed' ? 'Closed' : 'Current'} Value`,
                    'Fiat',
                  ].map((head, index) => (
                    <TableCell
                      style={{
                        fontWeight: 700,
                        borderRadius:
                          index === 0
                            ? '10px 0 0 10px'
                            : index === 8
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
                {tradesArray.map((row) => {
                  return (
                    <TableRow
                      className="table-row"
                      key={row?.id}
                      onClick={(e) => {
                        var element = e.target.textContent;
                        if (element === 'close') {
                          closeTrade(row);
                        } else {
                          setId(row?.coin);
                          setShowTrades(false);
                        }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          background: 'whitesmoke',
                        }}
                      >
                        <div
                          className="flex"
                          style={{
                            justifyContent: 'flex-start',
                            width: '100%',
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
                            <span style={{ color: 'darkgrey' }}>
                              {row?.coin}
                            </span>
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
                          {filter !== 'closed' && (
                            <Chip
                              label="close"
                              color="primary"
                              icon={<DeleteOutlined />}
                              size="small"
                              onClick={() => closeTrade(row)}
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
                          {row?.active ? 'Opened: ' : 'Closed: '}
                          {
                            <ReactTimeAgo
                              date={Date.parse(
                                row?.active ? row?.date : row?.closed
                              )}
                            />
                          }
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
                      {row?.value && (
                        <TableCell align="right">
                          {row.direction === 'buy'
                            ? numberWithCommas(row.value.toFixed(2))
                            : numberWithCommas(
                                (
                                  row.invested +
                                  (row.invested - row.value)
                                ).toFixed(2)
                              )}
                        </TableCell>
                      )}
                      <TableCell align="right">
                        {row?.fiat?.toUpperCase()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          }
        </FadeIn>
      </TableContainer>
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
          color="secondary"
          count={Math.ceil(
            handleSearch()?.filter((item) =>
              filter === 'closed' ? !item.active : item.active
            )?.length / 8
          )}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 120);
          }}
        />
      )}
    </TradesPageContainer>
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
