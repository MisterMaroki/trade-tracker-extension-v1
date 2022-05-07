import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

import { CryptoState } from '../Newtab/CryptoContext';
import { Select } from '@mui/material';

const options = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'binancecoin', label: 'Binance' },
];
const Popup = () => {
  const [currentTicker, setCurrentTicker] = useState('bitcoin');
  const [currentPrice, setCurrentPrice] = useState(
    async () => getTickerPrice(currentTicker) || 0
  );

  const priceEl = useRef(null);
  const getTickerPrice = async (ticker) => {
    if (ticker !== undefined) {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ticker}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true`
      );
      const data = await res.json();
      setCurrentPrice(data[Object.keys(data)[0]]?.usd);
    }
  };

  useEffect(() => {
    getTickerPrice(currentTicker);
    priceEl.current.textContent = `${currentTicker.toUpperCase()}: $${parseFloat(
      currentPrice
    ).toFixed(2)}`;
  }, [currentPrice, currentTicker]);

  const handleSelect = (selectedTicker) => {
    setCurrentTicker(selectedTicker);
    getTickerPrice(selectedTicker);
  };

  const { currency } = CryptoState();
  console.log('🚀 ~ file: Popup.jsx ~ line 45 ~ Popup ~ currency', currency);

  return (
    <div className={`__container `}>
      <p ref={priceEl}>BTC: $39225.00</p>

      <Select
        options={options}
        name="ticker-select"
        id="ticker-select"
        value={currentTicker}
        onChange={(e) => handleSelect(e.value)}
      />
      <button>Buy</button>
    </div>
  );
};

export default Popup;
