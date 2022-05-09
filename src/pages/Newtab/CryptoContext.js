import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SingleCoin } from '../Content/config/api';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(0);

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
  }, [trades]);

  const tradeNow = (direction) => {
    quantity > 0 &&
      setTrades((prevTrades) => [
        {
          id: nanoid(),
          coin: coin.id,
          ticker: coin.symbol,
          fiat: currency.toLowerCase(),
          price: coin.market_data.current_price[currency.toLowerCase()],
          date: new Date(),
          quantity: quantity,
          direction: direction === 'buy' ? 'buy' : 'sell',
          invested:
            quantity * coin.market_data.current_price[currency.toLowerCase()],
          active: true,
        },
        ...prevTrades,
      ]);
  };

  const deleteRow = async (row) => {
    if (row.active) {
      setTrades((prevRows) =>
        prevRows.map((trade) =>
          trade.id === row.id ? { ...trade, active: false } : trade
        )
      );
    }
  };

  // setRows(() =>
  const rowDataEnrichment = async () => {
    let enrichedRows = await Promise.all(
      trades.map(async (trade) => {
        const currentMarketValue = await findProfits(trade, 'current-value');
        const percentChange = await findProfits(trade, 'percent-change');

        return {
          ...trade,
          value: currentMarketValue,
          change: percentChange,
        };
      })
    );

    setTrades([...enrichedRows]);
  };

  // );

  const findProfits = async (trade, type) => {
    const { data } = await axios.get(SingleCoin(trade.coin));
    const differenceMultiplier =
      (await data?.market_data.current_price.usd) / trade.price;

    const currentValue = trade.invested * differenceMultiplier;
    if (type === 'current-value') {
      return currentValue;
    }
    if (type === 'percent-change') {
      return differenceMultiplier;
    }
  };

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
        quantity,
        setQuantity,
        tradeNow,
        deleteRow,
        rowDataEnrichment,
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
