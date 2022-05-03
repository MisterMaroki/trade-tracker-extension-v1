/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../../Content/config/api';
import { CryptoState } from '../../CryptoContext';

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  //   const { currency } = CryptoState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const fetchTrendingCoins = async () => {
  //     const { data } = await axios.get(TrendingCoins(currency));
  //     setTrending(data);
  //   };
  //   useEffect(() => {
  //     fetchTrendingCoins();
  //   }, [currency]);

  //   const items = trending.map((coin) => {
  //     return (
  //       <Container onClick={() => console.log('first')}>
  //         <img src={coin.image} />
  //       </Container>
  //     );
  //   });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div>
      <p>hi</p>
      {/* <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      /> */}
    </div>
  );
};

export default Carousel;
