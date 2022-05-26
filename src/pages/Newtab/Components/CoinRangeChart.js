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

export function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
const CoinRangeChart = ({ trade }) => {
  console.log(
    '🚀 ~ file: CoinRangeChart.js ~ line 26 ~ CoinRangeChart ~ trade',
    trade
  );
  const { currency, currentColor, coins } = CryptoState();
  console.log(
    '🚀 ~ file: CoinRangeChart.js ~ line 28 ~ CoinRangeChart ~ coins',
    numberWithCommas(
      coins
        .find((coin) => coin?.symbol === trade.ticker)
        ?.current_price.toFixed(2)
    )
  );

  const [historicalData, setHistoricalData] = useState();

  const [loading, setLoading] = useState(false);

  const fetchHistoricalData = async () => {
    setLoading(true);

    const { data } = await axios.get(
      HistoricalRangeChart(
        trade.coin,
        currency.toLowerCase(),
        Math.floor(new Date(trade.date).getTime() / 1000),
        Math.floor(new Date(trade.closed || Date.now()).getTime() / 1000)
      )
    );

    setHistoricalData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  return (
    <>
      {!historicalData ? (
        <CircularProgress sx={{ color: currentColor }} />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData?.map((coin) => {
                let date = new Date(coin[0]);

                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                // return '';
                return historicalData?.length < 300
                  ? time
                  : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData?.map((coin) => coin[1]),
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
