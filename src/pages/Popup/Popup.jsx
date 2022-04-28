import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import Select from 'react-select';

const options = [
  { value: 'BTC', label: 'Bitcoin' },
  { value: 'ETH', label: 'Ethereum' },
  { value: 'BNB', label: 'Binance' },
];
const Popup = () => {
  const [currentTicker, setCurrentTicker] = useState('BTC');
  const [currentPrice, setCurrentPrice] = useState(
    async () => await getTickerPrice(currentTicker)
  );

  const priceEl = useRef(null);

  const getTickerPrice = async (ticker) => {
    if (ticker !== undefined) {
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`
      );
      const data = await res.json();

      setCurrentPrice(data.price);
      priceEl.current.textContent = `${currentTicker}: $${parseFloat(
        data.price
      ).toFixed(2)}`;
    }
  };
  // console.log(currentPrice);
  getTickerPrice(currentTicker);

  const handleSelect = (selectedTicker) => {
    setCurrentTicker(selectedTicker);
  };

  return (
    <div className={`App`}>
      <header className="App-header">
        <p ref={priceEl}>BTC: $39225.00</p>

        <Select
          options={options}
          name="ticker-select"
          id="ticker-select"
          value={currentTicker}
          onChange={(e) => handleSelect(e.value)}
        />
        <button>Buy</button>
      </header>
    </div>
  );
};

export default Popup;
