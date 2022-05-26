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

  const [historicalRangeData, setHistoricalRangeData] = useState();

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

    if (data?.prices.length > 10) {
      setHistoricalRangeData(data.prices);
    } else {
      fetchHistoricalData(trade?.coin);
    }
    setLoading(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      !historicalRangeData && setHistoricalRangeData(historicalData);
    }, 500);

    return () => clearInterval(intervalId); //This is important
  }, [historicalRangeData]);

  useEffect(() => {
    fetchHistoricalRangeData();
  }, []);

  return (
    <>
      {!historicalRangeData ? (
        <CircularProgress sx={{ color: currentColor }} />
      ) : (
        <>
          <Line
            data={{
              labels: historicalRangeData?.map((coin) => {
                let date = new Date(coin[0]);

                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                // return '';
                return historicalRangeData?.length < 300
                  ? time
                  : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalRangeData?.map((coin) => coin[1]),
                  label: `Price`,
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
                  display: false,
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
