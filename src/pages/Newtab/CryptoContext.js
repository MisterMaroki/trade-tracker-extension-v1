import axios from 'axios';
import { nanoid } from 'nanoid';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CoinList, SingleCoin } from '../Content/config/api';
import { numberWithCommas } from './Components/banner/Carousel';
import { blue, gray, purple, tertiary, yellow } from './styles/themeVariables';
import toast, { Toaster } from 'react-hot-toast';
import { getDurationString } from './Components/cards/TradeItem';
import { UserState } from './UserContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState([]);

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [id, setId] = useState('');
  const [showTrades, setShowTrades] = useState(false);
  const [page, setPage] = useState(1);
  const [trades, setTrades] = useState(
    localStorage.getItem('trades')?.length > 5
      ? JSON.parse(localStorage.getItem('trades'))
      : []
  );
  const [search, setSearch] = useState('');
  const [coin, setCoin] = useState();
  const [filter, setFilter] = useState('all');
  const [currentColor, setCurrentColor] = useState(gray);
  const [whichCoinsToShow, setWhichCoinsToShow] = useState('this');
  const [showingOverview, setShowingOverview] = useState(false);

  const { user, setAlert } = UserState();

  const notify = () =>
    toast('Trade closed', {
      icon: '🍾',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

  const handleFilter = (type) => {
    !type
      ? filter === 'closed'
        ? setFilter('all')
        : setFilter('closed')
      : setFilter(type);
    setPage(1);
  };
  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
      setCurrentColor(blue);
    } else if (currency === 'GBP') {
      setSymbol('£');
      setCurrentColor(purple);
    } else if (currency === 'EUR') {
      setSymbol('€');
      setCurrentColor(yellow);
    }
  }, [currency]);

  useEffect(() => {
    if (trades?.length >= 1) {
      localStorage.setItem('trades', JSON.stringify(trades));
    } else {
      localStorage.setItem('trades', ['']);
    }
  }, [trades]);

  useEffect(() => {
    id && setShowTrades(false);
  }, [id]);

  useEffect(() => {
    if (user?.uid) {
      const tradesRef = doc(db, 'trades', user?.uid);
      var unsubscribe = onSnapshot(tradesRef, (trades) => {
        if (trades.exists) {
          setTrades(() => trades.data()?.trades || []);
        } else {
          console.log('Nothing in db trades.');
        }
      });
      return () => unsubscribe();
    }
  }, [user, trades?.length]);

  useEffect(() => {
    const fetchCoin = async () => {
      const data = await axios.get(SingleCoin(id));
      if (coin?.id !== data.data.id) setCoin(data.data);
    };
    id && fetchCoin();
  }, [id, currency, search]);

  useEffect(() => {
    const fetchCoins = async () => {
      if (coins.length === 0) {
        setLoading(true);

        const data = await axios.get(CoinList(currency));
        if (data.data !== coins) setCoins(data.data);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);

  const initalState = 0;
  const [count, setCount] = useState(initalState);

  const tradeNow = (direction, quantity) => {
    if (+quantity > 0) {
      setTrades((prevTrades) => [
        {
          id: nanoid(),
          coin: coin.id,
          ticker: coin.symbol,
          fiat: currency.toLowerCase(),
          price: coin?.market_data?.current_price[currency.toLowerCase()],
          date: new Date().toUTCString(),
          quantity: +quantity,
          direction: direction === 'buy' ? 'buy' : 'sell',
          active: true,
          invested:
            quantity * coin.market_data.current_price[currency.toLowerCase()],
          img: coin.image,
        },
        ...prevTrades,
      ]);
      setCount(count + 1);
    }
    setTimeout(() => {
      setFilter('open');
    }, 700);
  };
  useEffect(() => {
    if (user?.uid && trades.length >= 1) {
      const writeTrades = async () => {
        const tradesRef = doc(db, 'trades', user.uid);

        try {
          console.log('writeTrades()');

          await setDoc(
            tradesRef,
            {
              trades: trades,
            },
            { merge: true }
          );
        } catch (error) {
          setTimeout(
            () =>
              setAlert({
                open: true,
                message: error.message,
                type: 'error',
              }),
            500
          );
        }
      };
      writeTrades();
    }
  }, [setAlert, trades, user?.uid]);

  useEffect(() => {
    setSearch('');
    setWhichCoinsToShow(
      () => coins.filter((coin) => coin.id === id)[0]?.symbol
    );
  }, [id, showTrades]);

  const closeTrade = async (row) => {
    if (row.active) {
      await rowDataEnrichment();
      setTrades((prevTrades) =>
        prevTrades.map((trade) => {
          return trade.id === row.id
            ? {
                ...trade,
                active: false,
                closed: new Date().toUTCString(),
                exit: trade.current_price,
                duration: getDurationString(
                  Date.parse(new Date()) - Date.parse(trade.date)
                ),
              }
            : trade;
        })
      );
    }
  };

  const rowDataEnrichment = async () => {
    console.log('row data enrichment outside useEffect');
    let enrichedRows = await Promise.all(
      trades?.map(async (trade) => {
        const currentPrice = await findProfits(trade, 'current-price');
        const currentMarketValue = await findProfits(trade, 'current-value');
        const percentChange = await findProfits(trade, 'percent-change');

        return trade?.active
          ? {
              ...trade,
              current_price: currentPrice,
              value: currentMarketValue,
              change: percentChange,
            }
          : trade;
      })
    );
    setTrades(enrichedRows);
    console.log('PnL updated');
  };

  useEffect(() => {
    const rowDataEnrichment = async () => {
      console.log('rowDataEnrichment');
      let enrichedRows = await Promise.all(
        trades?.map(async (trade) => {
          const currentPrice = await findProfits(trade, 'current-price');

          const currentMarketValue = await findProfits(trade, 'current-value');
          const percentChange = await findProfits(trade, 'percent-change');

          return trade?.active
            ? {
                ...trade,
                current_price: currentPrice,
                value: currentMarketValue,
                change: percentChange,
              }
            : trade;
        })
      );
      setTrades(enrichedRows);
      console.log('PnL updated');
    };
    rowDataEnrichment();
  }, [count, filter, showTrades, whichCoinsToShow, user?.uid, id]);

  const handleSearch = useCallback(() => {
    if (coins?.length > 20 && !loading) {
      return coins?.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    }
  }, [loading, search]);

  const findProfits = async (trade, type) => {
    const { data } = await axios.get(SingleCoin(trade.coin));
    const differenceMultiplier =
      (await data?.market_data?.current_price[trade.fiat.toLowerCase()]) /
      trade.price;

    const currentValue =
      trade.direction === 'buy'
        ? trade.invested * differenceMultiplier
        : trade.invested +
          (trade.invested - trade.invested * differenceMultiplier);

    if (type === 'current-price') {
      return +data?.market_data?.current_price[trade.fiat.toLowerCase()];
    }
    if (type === 'current-value') {
      return +currentValue;
    }
    if (type === 'percent-change') {
      return +differenceMultiplier;
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
        currentColor,
        whichCoinsToShow,
        setWhichCoinsToShow,
        rowDataEnrichment,
        notify,
        showingOverview,
        setShowingOverview,
      }}
    >
      <Toaster position="bottom-center" />
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
