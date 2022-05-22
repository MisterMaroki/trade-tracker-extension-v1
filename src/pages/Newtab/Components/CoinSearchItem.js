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

export default function CoinSearchItem({ product }) {
  console.log(
    '🚀 ~ file: CoinSearchItem.js ~ line 13 ~ CoinSearchItem ~ product',
    product
  );
  console.log('🚀 ~ file: CoinItem.js ~ line 13 ~ CoinItem ~ product', product);
  // console.log('🚀 ~ file: CoinItem.js ~ line 14 ~ CoinItem ~ product', product);
  const { symbol, id, setId, setSearch } = CryptoState();
  const profit = product.price_change_percentage_24h >= 0;
  return (
    <CoinCard key={product.name}>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <div className="darkbg nobg">
            <img
              src={product.image}
              alt={product.name}
              height="38"
              style={{ margin: '5' }}
            />
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
              {product.symbol}
            </span>
            <span
              style={{
                color: 'darkgrey',
                fontSize:
                  product.name.length > 10
                    ? product.name.length > 13
                      ? 10
                      : 15
                    : 18,
              }}
            >
              {product.name}
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
              Rank
            </span>
            <span style={{ color: 'darkgrey', fontSize: 18 }}>
              #{product.market_cap_rank}
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
              {symbol}{' '}
              {numberWithCommas(
                symbol === '$'
                  ? product.current_price.toFixed(2)
                  : (product.current_price * 0.8).toFixed(2)
              )}
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
              {numberWithCommas(product.market_cap.toString().slice(0, -6))}M
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
              {product.price_change_percentage_24h.toFixed(2)}%
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
              {numberWithCommas(product.ath.toFixed(2).toString())}
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
              {product.ath_change_percentage.toFixed(2)}
            </span>
          </div>
        </Grid>
        <Grid item>
          <ColorButton
            onClick={() => {
              setId(product.id);
              setSearch('');
            }}
          >
            Trade Now
          </ColorButton>
        </Grid>
      </Grid>
    </CoinCard>
  );
}
