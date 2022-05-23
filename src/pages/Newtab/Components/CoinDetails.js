import { CancelOutlined } from '@mui/icons-material';
import { IconButton, Input, TextField, Typography } from '@mui/material';
import React from 'react';
import { CryptoState } from '../CryptoContext';
import {
  ChartContainer,
  Sidebar,
  tertiary,
  textFieldSx,
} from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import SnackbarButton from './SnackBarButton';
const parse = require('html-react-parser');

const CoinDetails = () => {
  const {
    currency,
    symbol,
    coin,
    tradeNow,
    quantity,
    setQuantity,
    showTrades,
    setShowTrades,
  } = CryptoState();
  return (
    <ChartContainer>
      <img
        src={coin?.image?.large}
        alt={coin?.name}
        height="120"
        style={{ marginBottom: 20 }}
      />

      <Typography
        variant="h4"
        className="heading"
        style={{ fontWeight: 'bold' }}
      >
        {coin?.name}
      </Typography>
      <Typography>
        {parse(`${coin?.description.en.split('. ')[0]}`)}.
      </Typography>
      <div className="market-data">
        <span
          style={{
            display: 'flex',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: '600' }}>
            Rank:{' '}
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h6">{coin?.market_cap_rank} </Typography>
        </span>
        <span
          style={{
            display: 'flex',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: '600' }}>
            Current Price:{' '}
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h6">
            {coin && symbol}
            {coin &&
              numberWithCommas(
                coin?.market_data.current_price[currency?.toLowerCase()]
              )}{' '}
          </Typography>
        </span>
        <span
          style={{
            display: 'flex',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: '600' }}>
            Market Cap:{' '}
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h6">
            {coin && symbol}
            {coin &&
              numberWithCommas(
                coin?.market_data.market_cap[currency?.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            M
          </Typography>
        </span>
      </div>
      <div className="flex">
        <SnackbarButton
          direction="buy"
          func={tradeNow}
          quantity={quantity}
          ticker={coin?.symbol}
        />

        <TextField
          value={quantity}
          type="number"
          label={'Set quantity'}
          sx={textFieldSx}
          size="small"
          onChange={(e) => setQuantity(e.target.value)}
          autoComplete="off"
          InputProps={{
            endAdornment: quantity > 0 && (
              <IconButton
                variant="outlined"
                onClick={() => setQuantity(0)}
                sx={{
                  padding: 0,
                  position: 'absolute',
                  right: 10,
                  top: 8,
                }}
              >
                <CancelOutlined sx={{ color: tertiary, fontSize: 16 }} />
              </IconButton>
            ),
          }}
        />
        <SnackbarButton
          direction="sell"
          func={tradeNow}
          quantity={quantity}
          ticker={coin?.symbol}
        />
      </div>
      <div className="flex">
        <button onClick={() => setShowTrades(true)}>View Trades</button>
      </div>
    </ChartContainer>
  );
};

export default CoinDetails;
