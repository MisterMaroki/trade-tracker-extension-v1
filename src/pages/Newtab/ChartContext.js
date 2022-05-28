import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { HistoricalChart } from '../Content/config/api';
import { CryptoState } from './CryptoContext';

const Chart = createContext();
const ChartContext = ({ children }) => {
  const [historicalData, setHistoricalData] = useState();

  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const { currency, coin, trades } = CryptoState();

  const fetchHistoricalData = async (id) => {
    setLoading(true);
    const { data } = await axios.get(
      HistoricalChart(id || coin?.id, days, currency)
    );

    setHistoricalData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days, coin]);

  const volatilitydataset = {
    data: historicalData?.map((coin, index) => {
      if (index + 1 < historicalData?.length) {
        return historicalData[index][1] - historicalData[index + 1][1];
      } else {
        return historicalData[index - 1][1] - historicalData[index][1];
      }
    }),
    label: 'Volatility',
    borderColor: '#05595b',
  };

  const allClosedTrades = trades.filter((trade) => trade.value);

  const totalClosedPositions = allClosedTrades?.length;
  const allLongs = allClosedTrades?.filter(
    (trade) => trade.direction === 'buy'
  );
  const allShorts = allClosedTrades?.filter(
    (trade) => trade.direction === 'sell'
  );

  const allWins = allClosedTrades?.filter(
    (trade) => trade.value >= trade.invested
  );
  const allLosses = allClosedTrades?.filter(
    (trade) => trade.value < trade.invested
  );
  const allWinsShort = allWins?.filter((trade) => trade.direction === 'sell');
  const allWinsLong = allWins?.filter((trade) => trade.direction === 'buy');
  const allLossesLong = allLosses?.filter((trade) => trade.direction === 'buy');

  const allLossesShort = allLosses?.filter(
    (trade) => trade.direction === 'sell'
  );

  const averagePercentGain = (arr) =>
    arr.reduce((acc, x) => {
      return acc + 100 * ((x.value - x.invested) / x.invested);
    }, 0) / arr.length;
  const totalInvested = (arr) =>
    arr.reduce((acc, x) => {
      return acc + x.invested;
    }, 0);
  const totalReturns = (arr) =>
    arr.reduce((acc, x) => {
      return acc + x.value;
    }, 0);

  const averageInvestment = (arr) => totalInvested(arr) / arr.length;

  const netProfit = (arr) => averageInvestment(arr) * averagePercentGain(arr);

  return (
    <Chart.Provider
      value={{
        days,
        setDays,
        historicalData,
        setHistoricalData,
        fetchHistoricalData,
        loading,
        setLoading,
        volatilitydataset,
        allClosedTrades,
        totalClosedPositions,
        allWins,
        allLosses,
        allLongs,
        allShorts,
        allWinsLong,
        allWinsShort,
        allLossesLong,
        allLossesShort,
        averagePercentGain,
        averageInvestment,
        totalInvested,
        totalReturns,
        netProfit,
      }}
    >
      {children}
    </Chart.Provider>
  );
};

export const ChartState = () => useContext(Chart);

export default ChartContext;
