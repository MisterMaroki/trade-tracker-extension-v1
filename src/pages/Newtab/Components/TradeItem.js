import { ArrowCircleDown } from '@mui/icons-material';
import { ArrowCircleUp } from '@mui/icons-material';
import { Box, Button, Chip } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { CryptoState } from '../CryptoContext';
import { ColorButton, TradeCard } from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import CloseTradeButton from './CloseTradeButton';
import MyChip from './MyChip';
import { formatDate } from './TradesTable';
import Tilt from 'react-parallax-tilt';
import CoinRangeChart from './CoinRangeChart';

export const checkPnl = (row) => {
  return (row.value - row.invested).toFixed(2);
};
const TradeItem = ({ row, page }) => {
  const { setId, setShowTrades, coins, currency, id } = CryptoState();
  const [chartShowing, setChartShowing] = useState(false);

  useEffect(() => {
    setChartShowing(false);
    return () => {
      setChartShowing(false);
    };
  }, [page, row]);

  return (
    <Tilt
      tiltEnable={false}
      glareEnable={true}
      glareMaxOpacity={0.05}
      glareColor="white"
      glarePosition="bottom"
      perspective={40000}
      style={{ width: '800px', height: '270px', margin: '3rem auto' }}
    >
      <TradeCard
        className="trade carousel"
        key={row?.id}
        onClick={() => {
          setId(row?.coin);
          setShowTrades(false);
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          gridTemplateRows="repeat(4,1fr)"
          height={'270px'}
          width={'100%'}
          style={{ padding: '1rem' }}
        >
          <Box gridColumn="1" gridRow="1" className="flex darkbg nobg">
            <img src={row.img.small} alt="icon" />
          </Box>
          <Box gridColumn="1" gridRow="2">
            <MyChip label={row.ticker} value={row.coin} />
          </Box>

          <Box gridColumn="2" gridRow="1" className="flex darkbg nobg">
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
          </Box>

          <Box gridColumn="2" gridRow="2" className="flex darkbg nobg">
            <CloseTradeButton trade={row} />
          </Box>

          <Box gridColumn="3/6" gridRow="1/4" className="flex">
            {chartShowing ? (
              <Suspense fallback={<div>Loading</div>}>
                <CoinRangeChart trade={row} />
              </Suspense>
            ) : (
              <ColorButton
                onClick={(e) => {
                  e.stopPropagation();
                  setChartShowing(true);
                }}
              >
                view chart snapshot
              </ColorButton>
            )}
          </Box>

          <Box gridColumn="6" gridRow="1" className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
              }}
            >
              PnL
            </span>

            <span
              className={checkPnl(row) >= 0 ? 'green' : 'red'}
              style={{
                fontSize:
                  checkPnl(row) >= 1000 || checkPnl(row) <= -1000 ? 12 : 16,
              }}
            >
              {checkPnl(row) > 0 && '+'}
              {numberWithCommas(checkPnl(row))} {row.fiat.toUpperCase()}
            </span>
          </Box>
          <Box gridColumn="6" gridRow="2" className="flex col darkbg">
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
              className={checkPnl(row) >= 0 ? 'green' : 'red'}
              style={{ fontSize: 18 }}
            >
              {checkPnl(row) > 0 && '+'}
              {`${((checkPnl(row) / row.invested) * 100).toFixed(2)}%`}
            </span>
          </Box>

          <Box gridColumn="6" gridRow="3">
            <MyChip
              label={'Investment'}
              value={numberWithCommas((row?.quantity * row?.price).toFixed(2))}
            />
          </Box>
          <Box gridColumn="6" gridRow="4">
            {row?.value && (
              <MyChip
                label={row.active ? 'Current Value' : 'Closed Value'}
                value={numberWithCommas(row.value.toFixed(2))}
              />
            )}
          </Box>
          {row.closed && (
            <>
              <Box gridColumn={'2'} gridRow="3">
                <MyChip label={'Closed'} value={formatDate(row?.closed)} />
              </Box>
              <Box gridColumn={'2'} gridRow="4">
                <MyChip
                  label={'Duration'}
                  value={
                    row?.duration ||
                    getDurationString(
                      Date.parse(row?.date) - Date.parse(row?.date)
                    )
                  }
                />
              </Box>
            </>
          )}
          <Box gridColumn={'1'} gridRow="3">
            <MyChip label={'Opened'} value={formatDate(row?.date)} />
          </Box>
          <Box gridColumn={'1'} gridRow="4">
            <MyChip
              label={row?.active ? 'Opened: ' : 'Closed: '}
              value={
                <ReactTimeAgo
                  date={Date.parse(row?.active ? row?.date : row?.closed)}
                />
              }
            />
          </Box>
          <Box gridColumn="4" gridRow="4">
            <MyChip
              label={'Entry'}
              value={`${numberWithCommas(
                row?.price
              )} ${row?.fiat.toUpperCase()}`}
            />
          </Box>
          <Box gridColumn="3" gridRow="4">
            <MyChip label={'Quantity'} value={row?.quantity} />
          </Box>
          <Box gridColumn="5" gridRow="4">
            <MyChip
              label={row.active ? 'Current Price' : 'Exit Price'}
              value={`${numberWithCommas(
                row.active ? row.current_price : row.exit
              )} ${row?.fiat.toUpperCase()}`}
            />
          </Box>
        </Box>
      </TradeCard>
    </Tilt>
  );
};

export default TradeItem;
export const getDurationString = (ms) => {
  // var ms = 43411993;
  var d = new Date(1000 * Math.round(ms / 1000)); // round to nearest second
  function pad(i) {
    return ('0' + i).slice(-2);
  }
  var str =
    d.getUTCHours() +
    ':' +
    pad(d.getUTCMinutes()) +
    ':' +
    pad(d.getUTCSeconds());

  return str;
};
