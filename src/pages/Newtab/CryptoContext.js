import React, { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [trades, setTrades] = useState(
    JSON.parse(localStorage.getItem('trades')) || []
  );
  const [coin, setCoin] = useState();

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'GBP') setSymbol('£');
  }, [currency]);

  useEffect(() => {
    localStorage.getItem('trades')
      ? localStorage.setItem('trades', JSON.stringify(trades))
      : localStorage.setItem('trades', []);
  }, []);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        trades,
        setTrades,
        coin,
        setCoin,
        coins,
        setCoins,
        loading,
        setLoading,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

export function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
export function isObject(object) {
  return object != null && typeof object === 'object';
}
