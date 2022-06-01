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
import { UserState } from '../../UserContext';
import { IconButton } from '@mui/material';
import { DeleteForeverRounded, DeleteOutlined } from '@mui/icons-material';

export default function WatchlistCoinItem({ row, price }) {
  const { symbol, setId, setSearch, currentColor } = CryptoState();
  const { user, setAlert, watchlist, addToWatchlist, removeFromWatchlist } =
    UserState();
  const profit = row.price_change_percentage_24h >= 0;
  const inWatchlist =
    watchlist?.filter((x) => x.id.includes(row?.id)).length !== 0;
  return (
    <WatchlistCoinCard
      className="carousel"
      onClick={() => {
        setId(row.id);
        setSearch('');
      }}
    >
      {user && (
        <IconButton
          style={{
            position: 'absolute',
            top: 1,
            left: 1,
            color: currentColor,
            zIndex: 100,
          }}
          onClick={() => inWatchlist && removeFromWatchlist(row)}
        >
          {<DeleteForeverRounded />}
        </IconButton>
      )}
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
