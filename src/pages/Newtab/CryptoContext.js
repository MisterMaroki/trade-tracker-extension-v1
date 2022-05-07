import React, { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  const [trades, setTrades] = useState(
    JSON.parse(localStorage.getItem('trades')) || []
  );

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'GBP') setSymbol('£');
  }, [currency]);

  return (
    <Crypto.Provider
      value={{ currency, setCurrency, symbol, trades, setTrades }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
