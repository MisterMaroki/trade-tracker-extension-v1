import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { HistoricalRangeChart } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { numberWithCommas } from './banner/Carousel';
import { ChartState } from '../ChartContext';

export function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
const CoinRangeChart = ({ trade }) => {
  console.log(
    '🚀 ~ file: CoinRangeChart.js ~ line 18 ~ CoinRangeChart ~ trade',
    trade
  );
  const { currency, currentColor, coins } = CryptoState();
  const {
    days,
    setDays,
    historicalData,
    setHistoricalData,
    fetchHistoricalData,
  } = ChartState();

  const [historicalRangeData, setHistoricalRangeData] = useState([]);
  const [suppliedData, setSuppliedData] = useState([]);
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHistoricalRangeData = async () => {
    setLoading(true);

    const { data } = await axios.get(
      HistoricalRangeChart(
        trade.coin,
        currency.toLowerCase(),
        Math.floor(new Date(trade.date).getTime() / 1000),
        Math.floor(new Date(trade.closed || Date.now()).getTime() / 1000)
      )
    );
    const { prices } = data;

    if (prices.length > 1) {
      setHistoricalRangeData(prices);
      setLoading(false);
      setLabel('Trade snapshot');
    } else {
      fetchHistoricalData(trade?.coin);
      setLabel('Past 24 hours');
    }
  };

  useEffect(() => {
    if (true) {
      historicalRangeData?.length > 2
        ? setSuppliedData(historicalRangeData)
        : setSuppliedData(historicalData);
      console.log(
        '🚀 ~ file: CoinRangeChart.js ~ line 67 ~ useEffect ~ historicalData',
        historicalData
      );
      console.log(
        '🚀 ~ file: CoinRangeChart.js ~ line 32 ~ CoinRangeChart ~ historicalRangeData',
        historicalRangeData
      );
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      historicalRangeData?.length > 1 && setLoading(false);
      //assign interval to a variable to clear it.
      historicalRangeData === undefined &&
        loading &&
        setHistoricalRangeData(historicalData);
    }, 500);

    // This is important
  }, []);

  useEffect(() => {
    fetchHistoricalRangeData();
  }, []);

  return (
    <>
      {!suppliedData ? (
        <CircularProgress sx={{ color: currentColor }} />
      ) : (
        <>
          <Line
            data={{
              labels: suppliedData?.map((coin) => {
                let date = new Date(coin[0]);

                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                // return '';
                return suppliedData?.length < 300
                  ? time
                  : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: suppliedData?.map((coin) => coin[1]),
                  label: label,
                  borderColor: currentColor,
                  color: 'transparent',
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 1,
                },
              },
              plugins: {
                legend: {
                  display: true,
                },
              },
            }}
          />
        </>
      )}
    </>
  );
};

export default CoinRangeChart;
