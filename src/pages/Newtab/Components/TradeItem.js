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
import { formatDate } from './TradesTable';

const TradeItem = ({ row }) => {
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

  const checkPnl = (row) => {
    let data =
      row.direction === 'buy'
        ? (row.value - row.invested).toFixed(2)
        : (row.invested - row.value).toFixed(2);
    return data;
  };

  return (
    <TradeCard
      className="trade carousel"
      key={row?.id}
      onClick={(e) => {
        setId(row?.coin);
        setShowTrades(false);
      }}
    >
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          {' '}
          <div className="flex col darkbg nobg">
            {' '}
            <img src={row.img.small} alt="icon" />
          </div>
        </Grid>
        <Grid item>
          <MyChip label={row.ticker} value={row.coin} />
        </Grid>
      </Grid>

      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <div className="flex col darkbg nobg">
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
        </Grid>
        <Grid item>
          <div className="flex col darkbg nobg">
            <CloseTradeButton trade={row} />
          </div>
        </Grid>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          {' '}
          <MyChip
            label={'Investment'}
            value={numberWithCommas((row?.quantity * row?.price).toFixed(2))}
          />
        </Grid>
        {row?.value && (
          <Grid item>
            {' '}
            <MyChip
              label={'Current Value'}
              value={
                row.direction === 'buy'
                  ? numberWithCommas(row.value.toFixed(2))
                  : numberWithCommas(
                      (row.invested + (row.invested - row.value)).toFixed(2)
                    )
              }
            />
          </Grid>
        )}
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          {' '}
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                color: 'darkgrey',
              }}
            >
              PnL
            </span>

            <span
              className={checkPnl(row) >= 0 ? currentColor : 'red'}
              style={{ fontSize: 18 }}
            >
              {checkPnl(row) > 0 && '+'}
              {numberWithCommas(checkPnl(row))} {row.fiat.toUpperCase()}
            </span>
          </div>
        </Grid>
        <Grid item>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                color: 'darkgrey',
              }}
            >
              PnL(%)
            </span>

            <span
              className={checkPnl(row) >= 0 ? currentColor : 'red'}
              style={{ fontSize: 18 }}
            >
              {checkPnl(row) > 0 && '+'}
              {`${(
                (row.change > 0 ? row.change - 1 : 1 - row?.change) * 100
              ).toFixed(2)}%`}
            </span>
          </div>
        </Grid>
      </Grid>

      <Grid item container direction="column" spacing={2}>
        <Grid item>
          {' '}
          <MyChip label={'Opened'} value={formatDate(row?.date)} />
        </Grid>
        <Grid item>
          {' '}
          <MyChip
            label={row?.active ? 'Opened: ' : 'Closed: '}
            value={
              <ReactTimeAgo
                date={Date.parse(row?.active ? row?.date : row?.closed)}
              />
            }
          />
        </Grid>
      </Grid>

      <Grid item container direction="column" spacing={2}>
        <Grid item>
          {' '}
          <MyChip label={'Entry'} value={parseFloat(row?.price)?.toFixed(2)} />
        </Grid>
        <Grid item>
          {' '}
          <MyChip label={'Quantity'} value={row?.quantity} />
        </Grid>
      </Grid>
    </TradeCard>
  );
};

export default TradeItem;
