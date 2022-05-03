/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../../Content/config/api';
import { CryptoState } from '../../CryptoContext';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = CryptoState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className="carousel-item" to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="60"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol.toUpperCase()}
          &nbsp;
          <span className={profit ? 'green' : 'red'}>
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    612: {
      items: 4,
    },
  };

  return (
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
