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
import CurrentTradesList from './CurrentTradesList';

const InfoContainer = styled(Container)`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding: 40px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 0;
    padding: 20px;
    padding-top: 0;
  }
`;
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, trades, setTrades } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return (
    <InfoContainer>
      {!historicalData ? (
        <CircularProgress sx={{ color: '#05595b' }} />
      ) : (
        <>
          <CurrentTradesList />
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
    </InfoContainer>
  );
};

export default CoinInfo;
