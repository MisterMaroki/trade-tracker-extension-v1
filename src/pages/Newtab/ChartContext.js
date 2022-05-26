import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { HistoricalChart } from '../Content/config/api';
import { CryptoState } from './CryptoContext';

const Chart = createContext();
const ChartContext = ({ children }) => {
  const [historicalData, setHistoricalData] = useState();

  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const { currency, coin } = CryptoState();

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
      }}
    >
      {children}
    </Chart.Provider>
  );
};

export const ChartState = () => useContext(Chart);

export default ChartContext;
