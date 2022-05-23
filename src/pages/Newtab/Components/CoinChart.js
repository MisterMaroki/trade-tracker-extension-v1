import styled from '@emotion/styled';
import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { HistoricalChart } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { chartDays } from '../../Content/config/data';
import { ChartContainer } from '../styles/themeVariables';

const CoinChart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const { currency, trades, setTrades } = CryptoState();

  const fetchHistoricalData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricalData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days, coin]);

  return (
    <ChartContainer>
      {!historicalData ? (
        <CircularProgress sx={{ color: '#05595b' }} />
      ) : (
        <>
          {/* <CurrentTradesList /> */}
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);

                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past ${days} days) in ${currency}`,
                  borderColor: '#05595b',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            className="flex"
            style={{
              marginTop: 20,
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            {chartDays.map((day) => (
              <button
                key={day.label}
                onClick={() => setDays(day.value)}
                className={days === day.value ? 'selected' : ''}
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </ChartContainer>
  );
};

export default CoinChart;
