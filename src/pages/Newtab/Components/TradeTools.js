import styled from '@emotion/styled';
import { Calculate, CancelOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Slider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageCoinCard,
  CoinPageTradeTools,
  ColorButton,
  textFieldSx,
  tradeTextFieldSx,
} from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import SnackbarButton from './SnackBarButton';

const boxSx = {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-around',
};

const marks = [
  {
    value: 1,
    label: '1X',
  },
  {
    value: 5,
    label: '5X',
  },
  {
    value: 10,
    label: '10X',
  },
  {
    value: 25,
    label: '25X',
  },
];

const TradeTools = () => {
  const {
    coin,
    tradeNow,
    quantity,
    currentColor,
    setShowTrades,
    currency,
    trades,
  } = CryptoState();

  let price = coin?.market_data.current_price[currency.toLowerCase()];
  const [leverage, setLeverage] = useState(1);
  const [margin, setMargin] = useState('');
  const [tempQuantity, setTempQuantity] = useState('');
  const func = (direction, quantity) => {
    tradeNow(direction, quantity);
  };
  const handleMargin = (val) => {
    if (val >= 0.01) {
      setMargin(val);
      setTempQuantity((leverage * (margin / price)).toFixed(2) || null);
    }
  };
  const handleTempQuantity = (val) => {
    if (val >= 0.01) {
      setTempQuantity(val);
      setMargin(((val * price) / leverage).toFixed(2) || null);
    }
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleSlider = (event, newValue) => {
    if (typeof newValue === 'number') {
      setLeverage(() => newValue);
      handleMargin(margin);
    }
  };
  const openTrades = trades?.filter((x) => x.active);
  const currentPosition = openTrades?.reduce((acc, current) => {
    return acc + (current.value - current.invested);
  }, 0);

  const sliderSx = {
    color: currentColor,
    height: 8,
    '& .MuiSlider-track': {
      border: '1px solid black',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: `2px solid ${currentColor}`,
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-markLabel': {
      color: 'whitesmoke',
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#500007',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  };
  return (
    <CoinPageTradeTools>
      <Box sx={boxSx}>
        <TextField
          value={margin}
          label={margin <= 0.01 ? 'Set margin' : 'Margin'}
          type="number"
          sx={tradeTextFieldSx}
          size="small"
          onChange={(e) => handleMargin(e.target.value)}
          autoComplete="off"
          InputProps={{
            endAdornment: margin > 0 && (
              <IconButton
                variant="outlined"
                onClick={() => setMargin(0)}
                sx={{
                  padding: 0,
                  position: 'absolute',
                  right: 40,
                  top: 8,
                }}
              >
                <CancelOutlined sx={{ color: currentColor, fontSize: 16 }} />
              </IconButton>
            ),
          }}
        />
        <p style={{ textAlign: 'center', fontSize: '1rem' }}>OR</p>
        <TextField
          value={tempQuantity}
          label={tempQuantity <= 0.01 ? 'Set quantity' : 'Quantity'}
          type="number"
          sx={tradeTextFieldSx}
          size="small"
          onChange={(e) => handleTempQuantity(e.target.value)}
          autoComplete="off"
          InputProps={{
            endAdornment: tempQuantity > 0 && (
              <IconButton
                variant="outlined"
                onClick={() => setTempQuantity(0)}
                sx={{
                  padding: 0,
                  position: 'absolute',
                  right: 40,
                  top: 8,
                }}
              >
                <CancelOutlined sx={{ color: currentColor, fontSize: 16 }} />
              </IconButton>
            ),
          }}
        />
        <p
          style={{
            marginTop: '1rem',
            textAlign: 'left',
            fontSize: '0.85rem',
            fontWeight: 'bold',
          }}
        >
          Leverage: {leverage}X
        </p>
        <Box sx={{ width: '90%', margin: '0 auto' }}>
          <Slider
            aria-label="Small steps"
            defaultValue={1}
            getAriaValueText={valuetext}
            step={1}
            marks={marks}
            min={1}
            max={25}
            onChange={handleSlider}
            sx={sliderSx}
            // valueLabelDisplay="auto"
          />
        </Box>
      </Box>
      <Box sx={{ ...boxSx, justifyContent: 'space-evenly', gap: '0.5rem' }}>
        <h6
          style={{
            marginTop: '0.3rem',
            textAlign: 'left',
            fontSize: '0.95rem',
            fontWeight: 'bold',
          }}
        >
          Order Info
        </h6>
        <p style={{ fontSize: '0.85rem' }}>
          {coin?.name}: {numberWithCommas((margin * leverage).toFixed(2))}{' '}
          {currency}
        </p>
        <Box display="flex" gap={1}>
          <SnackbarButton
            direction="buy"
            func={() => func('buy', tempQuantity)}
            quantity={tempQuantity}
            ticker={coin?.symbol}
          />

          <SnackbarButton
            direction="sell"
            func={() => func('sell', tempQuantity)}
            quantity={tempQuantity}
            ticker={coin?.symbol}
          />
        </Box>
        <h6
          style={{
            marginTop: '0.3rem',
            textAlign: 'left',
            fontSize: '0.95rem',
            fontWeight: 'bold',
          }}
        >
          Current Position
        </h6>
        {openTrades ? (
          <p style={{ fontSize: '0.85rem' }}>
            {openTrades.length} Open Trades: {currentPosition > 0 && '+'}
            {numberWithCommas(currentPosition.toFixed(2))} {currency}
          </p>
        ) : (
          <p style={{ fontSize: '0.85rem' }}>No open trades.</p>
        )}
        <ColorButton onClick={() => setShowTrades(true)}>
          View Trades
        </ColorButton>
      </Box>
      {/* <Ticker /> */}
    </CoinPageTradeTools>
  );
};

export default TradeTools;
