import { CancelOutlined } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageCoinCard,
  tertiary,
  textFieldSx,
} from '../styles/themeVariables';
import SnackbarButton from './SnackBarButton';
import Ticker from './Ticker';

const TradeTools = () => {
  const {
    currency,
    symbol,
    coin,
    tradeNow,
    quantity,
    setQuantity,
    showTrades,
    currentColor,
    setShowTrades,
  } = CryptoState();
  const [tempQuantity, setTempQuantity] = useState(0);
  const func = (direction, quantity) => {
    tradeNow(direction, quantity);
  };

  return (
    <CoinPageCoinCard>
      <Grid item container direction="column" spacing={2} key={quantity * 123}>
        <Grid item>
          <TextField
            value={tempQuantity}
            label={'Set quantity'}
            type="number"
            sx={textFieldSx}
            className="carousel"
            size="small"
            onChange={(e) => setTempQuantity(() => e.target.value)}
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
        </Grid>
        <Grid item>
          <SnackbarButton
            direction="buy"
            func={() => func('buy', tempQuantity)}
            quantity={tempQuantity}
            ticker={coin?.symbol}
          />
        </Grid>
        <Grid item>
          <SnackbarButton
            direction="sell"
            func={() => func('sell', tempQuantity)}
            quantity={tempQuantity}
            ticker={coin?.symbol}
          />
        </Grid>
      </Grid>

      <Grid item>
        <button onClick={() => setShowTrades(true)}>View Trades</button>
        {/* <Ticker /> */}
      </Grid>
    </CoinPageCoinCard>
  );
};

export default TradeTools;
