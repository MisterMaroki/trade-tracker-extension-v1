import { ArrowCircleDown } from '@mui/icons-material';
import { ArrowCircleUp } from '@mui/icons-material';
import { Box, Chip } from '@mui/material';
import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { CryptoState } from '../../CryptoContext';
import { MiniTradeCard } from '../../styles/themeVariables';
import { numberWithCommas } from '../banner/Carousel';
import CloseTradeButton from '../CloseTradeButton';
import MyChip from '../MyChip';
import { formatDate } from '../TradesTable';
import Tilt from 'react-parallax-tilt';
import { checkPnl } from './TradeItem';

const MiniTradeItem = ({ row }) => {
  const { setId, setShowTrades, coins, currency } = CryptoState();

  return (
    <Tilt
      tiltEnable={false}
      glareEnable={true}
      glareMaxOpacity={0.05}
      glareColor="white"
      glarePosition="bottom"
      perspective={40000}
      style={{ margin: '3rem auto' }}
    >
      <MiniTradeCard
        className="trade carousel"
        key={row?.id}
        onClick={() => {
          setId(row?.coin);
          setShowTrades(false);
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gridTemplateRows="repeat(3,1fr)"
          style={{ padding: '1rem', width: '100%' }}
        >
          <Box gridColumn="1" gridRow="1" className="flex col darkbg nobg">
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

          <Box gridColumn="3" gridRow="1" className="flex col darkbg">
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
          <Box gridColumn="3" gridRow="2" className="flex col darkbg">
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

          <Box gridColumn="2" gridRow="3">
            <MyChip
              label={'Investment'}
              value={numberWithCommas((row?.quantity * row?.price).toFixed(2))}
            />
          </Box>
          <Box gridColumn="2" gridRow="4">
            {row?.value && (
              <MyChip
                label={row.active ? 'Current Value' : 'Closed Value'}
                value={numberWithCommas(row.value.toFixed(2))}
              />
            )}
          </Box>
          <Box gridColumn="1" gridRow="3">
            <MyChip label={'Opened'} value={formatDate(row?.date)} />
          </Box>
          <Box gridColumn="1" gridRow="4">
            <MyChip
              label={row?.active ? 'Opened: ' : 'Closed: '}
              value={
                <ReactTimeAgo
                  date={Date.parse(row?.active ? row?.date : row?.closed)}
                />
              }
            />
          </Box>
          <Box gridColumn="3" gridRow="3">
            <MyChip
              label={'Entry'}
              value={`${numberWithCommas(
                parseFloat(row?.price).toFixed(2)
              )} ${row?.fiat.toUpperCase()}`}
            />
          </Box>

          <Box gridColumn="3" gridRow="4">
            <MyChip
              label={row.active ? 'Current Price' : 'Exit Price'}
              value={`${numberWithCommas(
                parseFloat(row.active ? row.current_price : row.exit).toFixed(2)
              )} ${row?.fiat.toUpperCase()}`}
            />
          </Box>
        </Box>
      </MiniTradeCard>
    </Tilt>
  );
};

export default MiniTradeItem;
