import styled from '@emotion/styled';
import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { HistoricalChart } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';
import 'chart.js/auto';
import { Bar, Chart, Line } from 'react-chartjs-2';
import { chartDays } from '../../Content/config/data';
import { ChartContainer, primarytext, purple } from '../styles/themeVariables';
import { ChartState } from '../ChartContext';

const CoinChart = () => {
  const { currency, trades, setTrades, coin } = CryptoState();
  const {
    days,
    setDays,
    historicalData,
    setHistoricalData,
    fetchHistoricalData,
    loading,
    setLoading,
  } = ChartState();

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
                return ' ';
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: ``,
                  borderColor: purple,
                  color: primarytext,
                },
              ],
            }}
            options={{
              height: '100%',
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
    </ChartContainer>
  );
};

export default CoinChart;
