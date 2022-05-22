import * as React from 'react';
import Grid from '@mui/material/Grid';
import { CoinCard, ColorButton } from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import { CryptoState } from '../CryptoContext';
import MyChip from './MyChip';

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
          <MyChip label={row.symbol} value={row.name} />
        </Grid>
        <Grid item>
          <MyChip label={'rank'} value={row.market_cap_rank} />
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
          <MyChip
            label={'price'}
            value={`${symbol} ${numberWithCommas(
              row.current_price.toFixed(2)
            )}`}
          />
        </Grid>
        <Grid item>
          <MyChip
            label={'market cap'}
            value={`${numberWithCommas(
              row.market_cap.toString().slice(0, -6)
            )}M`}
          />
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
          <MyChip
            label={'ath'}
            value={`${numberWithCommas(row.ath.toFixed(2).toString())}`}
          />
        </Grid>
        <Grid item>
          <MyChip
            label={'% from ath'}
            value={`${row.ath_change_percentage.toFixed(2)}`}
          />
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
