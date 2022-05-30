import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
  CoinCard,
  ColorButton,
  WatchlistCoinCard,
} from '../../styles/themeVariables';
import { numberWithCommas } from '../banner/Carousel';
import { CryptoState } from '../../CryptoContext';
import MyChip from '../MyChip';

export default function WatchlistCoinItem({ row, price }) {
  const { symbol, setId, setSearch } = CryptoState();
  const profit = row.price_change_percentage_24h >= 0;
  return (
    <WatchlistCoinCard
      key={row.name}
      className="carousel"
      onClick={() => {
        setId(row.id);
        setSearch('');
      }}
    >
      <div className="flex col">
        <div className="darkbg nobg">
          <img
            src={row.image}
            alt={row.name}
            height="38"
            style={{ margin: '5' }}
          />
        </div>

        <MyChip label={row.symbol} value={row.name} />
      </div>
      <div className="flex col">
        <MyChip
          label={'price'}
          value={`${symbol} ${numberWithCommas(row.current_price.toFixed(2))}`}
        />

        <MyChip
          label={'watched price'}
          value={`${symbol} ${numberWithCommas(price.toFixed(2))}`}
        />
      </div>

      <div className="flex col">
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
        <MyChip
          label={'market cap'}
          value={`${numberWithCommas(row.market_cap.toString().slice(0, -6))}M`}
        />
      </div>
    </WatchlistCoinCard>
  );
}
