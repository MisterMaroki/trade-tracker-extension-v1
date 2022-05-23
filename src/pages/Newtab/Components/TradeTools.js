import { CancelOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React from 'react';
import { CryptoState } from '../CryptoContext';
import {
  CoinPageCoinCard,
  tertiary,
  textFieldSx,
} from '../styles/themeVariables';
import SnackbarButton from './SnackBarButton';

const TradeTools = () => {
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
    <CoinPageCoinCard>
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
    </CoinPageCoinCard>
  );
};

export default TradeTools;
