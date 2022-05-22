import * as React from 'react';
import Grid from '@mui/material/Grid';
import { CoinCard, ColorButton } from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import { CryptoState } from '../CryptoContext';

export default function CoinItem({ row }) {
  // console.log('🚀 ~ file: CoinItem.js ~ line 14 ~ CoinItem ~ row', row);
  const { symbol, setId, setSearch } = CryptoState();
  const profit = row.price_change_percentage_24h >= 0;
  return (
    <CoinCard key={row.name} className="search-dropdown-item">
      <Grid item container direction="column" spacing={2} key={row.name * 2}>
        <Grid item>
          <div className="darkbg nobg">
            <img
              src={row.image}
              alt={row.name}
              height="38"
              style={{ margin: '5' }}
            />
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
              {row.symbol}
            </span>
            <span
              style={{
                fontSize:
                  row.name.length > 10 ? (row.name.length > 13 ? 12 : 16) : 18,
              }}
            >
              {row.name}
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
              Rank
            </span>
            <span style={{ fontSize: 18 }}>#{row.market_cap_rank}</span>
          </div>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        spacing={2}
        key={row.market_cap_rank}
      >
        <Grid item>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                color: 'darkgrey',
              }}
            >
              mkt. price
            </span>
            <span style={{ fontSize: 18 }}>
              {symbol} {numberWithCommas(row.current_price.toFixed(2))}
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
              mkt. cap
            </span>
            <span style={{ fontSize: 18 }}>
              {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
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
        <Grid item>
          <div className="flex col darkbg">
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                color: 'darkgrey',
              }}
            >
              ath
            </span>
            <span style={{ fontSize: 18 }}>
              {numberWithCommas(row.ath.toFixed(2).toString())}
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
              % from ath
            </span>
            <span style={{ fontSize: 18 }}>
              {row.ath_change_percentage.toFixed(2)}
            </span>
          </div>
        </Grid>
        <Grid item>
          <ColorButton
            className="darkbg"
            onClick={() => {
              setId(row.id);
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
