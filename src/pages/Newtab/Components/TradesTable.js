import { ArrowCircleDown } from '@mui/icons-material';
import { DeleteOutlined } from '@mui/icons-material';
import { ArrowCircleUp } from '@mui/icons-material';
import {
  Chip,
  Container,
  Grid,
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
  TradeCard,
  TradesContainer,
  TradesPageContainer,
  white,
} from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import FadeIn from 'react-fade-in';
import CloseTradeButton from './CloseTradeButton';
import MyChip from './MyChip';
import { getTimeSince } from './CoinPageCoinItem';
import TradeItem from './TradeItem';
import Tilt from 'react-parallax-tilt';

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
    coins,
    handleFilter,
    symbol,
    currentColor,
  } = CryptoState();

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
    <>
      <FadeIn className="trade-container">
        {tradesArray.map((row) => {
          return (
            <Tilt
              tiltEnable={false}
              glareEnable={true}
              glareMaxOpacity={0.05}
              glareColor="white"
              glarePosition="bottom"
              style={{ margin: '2rem auto', maxWidth: '800px' }}
            >
              <TradeItem row={row} />
            </Tilt>
          );
        })}
      </FadeIn>

      {handleSearch() && (
        <Pagination
          className="flex"
          style={{
            padding: 10,
            position: 'fixed',
            bottom: 0,
            backgroundColor: black,
            width: '100%',
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
    </>
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
