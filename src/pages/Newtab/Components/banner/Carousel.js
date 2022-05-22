/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../../../Content/config/api';
import { CryptoState } from '../../CryptoContext';
import { primarytext } from '../../styles/themeVariables';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol, setId } = CryptoState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <div
        className="carousel-item"
        onClick={() => setId(coin.id)}
        style={{ cursor: 'pointer' }}
      >
        <>
          {' '}
          <img
            src={coin.image}
            alt={coin.name}
            height="60"
            style={{ marginBottom: 10 }}
          />
          <Stack direction="row" spacing={2}>
            <Typography sx={{ color: primarytext }}>
              {coin?.symbol.toUpperCase()}
            </Typography>
            <Typography className={profit ? 'green' : 'red'}>
              {profit && '+'}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: 22, fontWeight: 500, color: primarytext }}
          >
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </Typography>
        </>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    612: {
      items: 4,
    },
    850: {
      items: 5,
    },
    1100: {
      items: 6,
    },
    1300: { items: 8 },
  };

  return loading ? (
    <div className="carousel flex carousel-loading ">
      {['1', '2', '3', '4'].map((i) => (
        <Stack spacing={1} key={i}>
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="rectangular" width={180} height={60} />
        </Stack>
      ))}
    </div>
  ) : (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
