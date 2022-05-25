import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
  CoinCard,
  CoinPageCoinCard,
  ColorButton,
} from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';
import { CryptoState } from '../CryptoContext';
import MyChip from './MyChip';

export const getTimeSince = (date) => {
  let date_now = new Date();
  let date_ath = Date.parse(date);

  let seconds = Math.floor((date_now - date_ath) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);

  weeks = weeks - months * 4;
  days = days - weeks * 7;
  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return months + ' months, ' + weeks + ' weeks.';
};

export default function CoinPageCoinItem({ row }) {
  const { symbol, setId, setSearch, coin, currency, currentColor } =
    CryptoState();
  const profit = row.price_change_percentage_24h >= 0;
  const profit7 =
    coin.market_data.price_change_percentage_7d_in_currency[
      currency.toLowerCase()
    ] >= 0;
  const profit30 =
    coin.market_data.price_change_percentage_30d_in_currency[
      currency.toLowerCase()
    ] >= 0;
  return (
    <CoinPageCoinCard key={row.name} className="carousel">
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
            value={`${symbol} ${numberWithCommas(
              row.ath.toFixed(2).toString()
            )}`}
          />
        </Grid>
        <Grid item>
          <MyChip
            label={'% from ath'}
            value={`${row.ath_change_percentage.toFixed(2)}`}
          />
        </Grid>
        <Grid item>
          <MyChip
            label={'Time Since ATH'}
            value={getTimeSince(coin?.market_data?.ath_date.usd)}
          />
        </Grid>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <MyChip
            label={'atl'}
            value={`${symbol} ${numberWithCommas(
              row.atl.toFixed(2).toString()
            )}`}
          />
        </Grid>
        <Grid item>
          <MyChip
            label={'% from atl'}
            value={`${numberWithCommas(row.atl_change_percentage.toFixed(2))}`}
          />
        </Grid>
        <Grid item>
          <MyChip
            label={'Time Since ATL'}
            value={getTimeSince(coin?.market_data?.atl_date.usd)}
          />
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
              7d change
            </span>

            <span
              className={profit7 ? 'green' : 'red'}
              style={{ fontSize: 18 }}
            >
              {profit7 && '+'}
              {coin.market_data.price_change_percentage_7d_in_currency[
                currency.toLowerCase()
              ].toFixed(2)}
              %
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
              30d change
            </span>

            <span
              className={profit30 ? 'green' : 'red'}
              style={{ fontSize: 18 }}
            >
              {profit30 && '+'}
              {coin.market_data.price_change_percentage_30d_in_currency[
                currency.toLowerCase()
              ].toFixed(2)}
              %
            </span>
          </div>
        </Grid>
        <Grid item>
          <ColorButton className="darkbg">
            <a
              style={{ padding: '1rem', color: currentColor }}
              href={coin?.links?.homepage[0]}
            >
              Website
            </a>
          </ColorButton>
        </Grid>
      </Grid>
    </CoinPageCoinCard>
  );
}
