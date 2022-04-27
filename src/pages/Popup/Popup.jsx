import React, { useState } from 'react';
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
  const [state, setstate] = useState(true);
  const handleClick = () => {
    setstate(!state);
    getTickerPrice('BTC');
  };
  const handleSelect = (selectedTicker) => {
    getTickerPrice(selectedTicker);
  };
  return (
    <div className={`App ${state && 'bg'}`}>
      <header className="App-header">
        <p></p>

        <Select
          options={options}
          name="ticker-select"
          id="ticker-select"
          onChange={(e) => handleSelect(e.value)}
        />
        <button onClick={handleClick}>click</button>
      </header>
    </div>
  );
};

export default Popup;

const getTickerPrice = async (ticker) => {
  if (ticker !== undefined) {
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`
    );
    const data = await res.json();
    console.log(`${data.symbol} price: $${data.price}`);
  }
};
