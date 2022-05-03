import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../../../Content/config/api';
import { CryptoState } from '../../CryptoContext';

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  return <div>Carousel</div>;
};

export default Carousel;
