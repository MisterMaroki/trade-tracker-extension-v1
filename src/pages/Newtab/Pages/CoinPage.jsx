import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  Container,
  Input,
  LinearProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../../Content/config/api';
import { numberWithCommas } from '../Components/banner/Carousel';
import CoinInfo from '../Components/CoinInfo';
import { CryptoState } from '../CryptoContext';
const parse = require('html-react-parser');

const Sidebar = styled(Container)`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  padding-top: 3rem;
  border-right: 2px solid whitesmoke;
  @media screen and (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;

const CoinContainer = styled(Container)`
  margin-top: 5rem;
  /* height: 88vh; */
  min-height: 88vh;
  /* max-height: none; */
  width: 95%;
  max-width: 1800px !important;
  padding: 0 !important;
  border-radius: 10px;
  background: #f5f5f5ee;

  display: flex;
  justify-content: center;
  align-items: center;
  place-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const CoinPage = () => {
  const { currency, setCurrency, symbol, trades, setTrades } = CryptoState();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  // const [trades, setTrades] = useState(
  //   JSON.parse(localStorage.getItem('trades'))
  // );
  const [quantity, setQuantity] = useState(0);

  const fetchCoin = async () => {
    const data = await axios.get(SingleCoin(id));
    if (coin?.id !== data.data.id) setCoin(data.data);
  };

  useEffect(() => {
    fetchCoin();
  }, [coin]);

  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

  console.log(
    '🚀 ~ file: CoinPage.jsx ~ line 69 ~ CoinPage ~ currency',
    currency
  );

  const buyNow = async () => {
    console.log(coin);

    quantity &&
      setTrades((prevTrades) => [
        ...prevTrades,
        {
          coin: coin.id,
          ticker: coin.symbol,
          fiat: currency.toLowerCase(),
          price: coin.market_data.current_price[currency.toLowerCase()],
          date: new Date(),
          quantity: quantity,
          invested: numberWithCommas(
            quantity * coin.market_data.current_price[currency.toLowerCase()]
          ),
        },
      ]);
  };
  console.log(trades, 'trades');

  return (
    <CoinContainer>
      {!coin ? (
        <CircularProgress sx={{ color: '#05595b' }} />
      ) : (
        <>
          <Sidebar>
            <img
              src={coin?.image?.large}
              alt={coin?.name}
              height="120"
              style={{ marginBottom: 20 }}
            />
            <Typography
              variant="h4"
              className="heading"
              style={{ fontWeight: 'bold' }}
            >
              {coin?.name}
            </Typography>
            <Typography>
              {parse(`${coin?.description.en.split('. ')[0]}`)}.
            </Typography>
            <div className="market-data">
              <span
                style={{
                  display: 'flex',
                }}
              >
                <Typography variant="h6" style={{ fontWeight: '600' }}>
                  Rank:{' '}
                </Typography>
                &nbsp;&nbsp;
                <Typography variant="h6">{coin?.market_cap_rank} </Typography>
              </span>
              <span
                style={{
                  display: 'flex',
                }}
              >
                <Typography variant="h6" style={{ fontWeight: '600' }}>
                  Current Price:{' '}
                </Typography>
                &nbsp;&nbsp;
                <Typography variant="h6">
                  {coin && symbol}
                  {coin &&
                    numberWithCommas(
                      coin?.market_data.current_price[currency?.toLowerCase()]
                    )}{' '}
                </Typography>
              </span>
              <span
                style={{
                  display: 'flex',
                }}
              >
                <Typography variant="h6" style={{ fontWeight: '600' }}>
                  Market Cap:{' '}
                </Typography>
                &nbsp;&nbsp;
                <Typography variant="h6">
                  {coin && symbol}
                  {coin &&
                    numberWithCommas(
                      coin?.market_data.market_cap[currency?.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                  M
                </Typography>
              </span>
            </div>
            <div className="flex">
              <button onClick={buyNow}>Buy Now</button>
              <Input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              ></Input>
              <button onClick={buyNow}>Buy Now</button>
            </div>
          </Sidebar>

          <CoinInfo coin={coin} />
        </>
      )}
    </CoinContainer>
  );
};

export default CoinPage;
