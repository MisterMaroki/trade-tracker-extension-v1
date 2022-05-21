import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { CoinCard, ColorButton, tertiaryalt } from '../styles/themeVariables';
import { Box, Button } from '@mui/material';
import { numberWithCommas } from './banner/Carousel';
import { CryptoState } from '../CryptoContext';

export default function CoinGrid({ row }) {
  console.log('🚀 ~ file: CoinGrid.js ~ line 14 ~ CoinGrid ~ row', row);
  const { symbol, setId } = CryptoState();
  const profit = row.price_change_percentage_24h >= 0;
  return (
    <CoinCard key={row.name}>
      <Grid item container direction="column" spacing={2}>
        <Grid item style={{}}>
          <img
            src={row.image}
            alt={row.name}
            height="38"
            style={{ margin: '5' }}
          />
        </Grid>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              {row.symbol}
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>{row.name}</span>
          </div>
        </Grid>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              Rank
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>
              #{row.market_cap_rank}
            </span>
          </div>
        </Grid>
      </Grid>

      <Grid item container direction="column" spacing={2}>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              mkt. price
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>
              {symbol} {numberWithCommas(row.current_price.toFixed(2))}
            </span>
          </div>
        </Grid>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              mkt. cap
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>
              {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
            </span>
          </div>
        </Grid>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              24H change
            </span>

            <span className={profit ? 'green' : 'red'} style={{ fontSize: 18 }}>
              {profit && '+'}
              {row.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </Grid>
      </Grid>

      <Grid item container direction="column" spacing={2}>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              ath
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>
              {numberWithCommas(row.ath.toString())}
            </span>
          </div>
        </Grid>
        <Grid item style={{}}>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              % from ath
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>
              {row.ath_change_percentage.toFixed(2)}
            </span>
          </div>
        </Grid>
        <Grid item>
          <ColorButton onClick={() => setId(row.id)}>Trade Now</ColorButton>
        </Grid>
      </Grid>
    </CoinCard>
  );
}
