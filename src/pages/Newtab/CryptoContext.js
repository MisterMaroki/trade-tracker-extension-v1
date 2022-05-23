import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoinList, SingleCoin } from '../Content/config/api';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [id, setId] = useState('');
  const [showTrades, setShowTrades] = useState('');
  const [page, setPage] = useState(1);
  const [trades, setTrades] = useState(() =>
    localStorage.getItem('trades')?.length > 1
      ? JSON.parse(localStorage.getItem('trades'))
      : []
  );
  const [search, setSearch] = useState('');
  const [coin, setCoin] = useState();
  const [filter, setFilter] = useState();

  const handleFilter = (type) => {
    !type
      ? filter === 'closed'
        ? setFilter('')
        : setFilter('closed')
      : setFilter(type);
    setPage(1);
  };

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'GBP') setSymbol('£');
    else if (currency === 'EUR') setSymbol('€');
  }, [currency]);

  useEffect(() => {
    trades?.length >= 1
      ? localStorage.setItem('trades', JSON.stringify(trades))
      : localStorage.setItem('trades', ['']);
  }, [trades]);

  useEffect(() => {
    const fetchCoin = async () => {
      const data = await axios.get(SingleCoin(id));
      if (coin?.id !== data.data.id && data.data.length === undefined)
        setCoin(data.data);
    };
    fetchCoin();
  }, [id, symbol, coin, search]);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);

      const data = await axios.get(CoinList(currency));
      if (data.data !== coins) setCoins(data.data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

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
          active: true,
          invested:
            quantity * coin.market_data.current_price[currency.toLowerCase()],
        },
        ...prevTrades,
      ]);
  };

  const closeTrade = async (row) => {
    if (row.active) {
      setTrades((prevTrades) =>
        prevTrades.map((trade) => {
          return trade.id === row.id
            ? { ...trade, active: false, closed: new Date() }
            : trade;
        })
      );
    }
  };

  // setRows(() =>
  const rowDataEnrichment = async () => {
    let enrichedRows = await Promise.all(
      trades.map(async (trade) => {
        const currentMarketValue = await findProfits(trade, 'current-value');
        const percentChange = await findProfits(trade, 'percent-change');

        return trade.active
          ? {
              ...trade,
              value: currentMarketValue,
              change: percentChange,
              exit: currentMarketValue / trade.quantity,
            }
          : trade;
      })
    );
    setTrades(enrichedRows);
  };

  const handleSearch = () => {
    if (coins?.length > 20 && !loading) {
      return coins?.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    }
  };

  const findProfits = async (trade, type) => {
    const { data } = await axios.get(SingleCoin(trade.coin));
    const differenceMultiplier =
      (await data?.market_data.current_price[trade.fiat.toLowerCase()]) /
      trade.price;

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
        closeTrade,
        rowDataEnrichment,
        search,
        setSearch,
        id,
        setId,
        showTrades,
        setShowTrades,
        handleSearch,
        page,
        setPage,
        filter,
        handleFilter,
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
