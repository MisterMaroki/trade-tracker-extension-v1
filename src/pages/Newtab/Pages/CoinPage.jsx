import styled from '@emotion/styled';
import CustomizedSnackbars from '../Components/SuccessSnackbar';
import {
  Button,
  CircularProgress,
  Container,
  Input,
  LinearProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../../Content/config/api';
import { numberWithCommas } from '../Components/banner/Carousel';
import CoinInfo from '../Components/CoinInfo';
import { CryptoState, deepEqual } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { CoinContainer, Sidebar } from '../styles/themeVariables';
const parse = require('html-react-parser');

const CoinPage = () => {
  const {
    currency,
    setCurrency,
    symbol,
    trades,
    setTrades,
    coin,
    setCoin,
    tradeNow,
    quantity,
    setQuantity,
    id,
    setShowTrades,
  } = CryptoState();

  const fetchCoin = async () => {
    const data = await axios.get(SingleCoin(id));
    if (coin?.id !== data.data.id) setCoin(data.data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchCoin();
  }, [coin]);

  return (
    <CoinContainer>
      {!coin ? (
        <CircularProgress sx={{ color: '#05595b' }} />
      ) : (
        <>
          <Sidebar>
            <Link to={'/trades'}>
              <img
                src={coin?.image?.large}
                alt={coin?.name}
                height="120"
                style={{ marginBottom: 20 }}
              />
            </Link>
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
              <CustomizedSnackbars
                direction="buy"
                func={tradeNow}
                quantity={quantity}
                ticker={coin?.symbol}
              />
              <Input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              ></Input>
              <CustomizedSnackbars
                direction="sell"
                func={tradeNow}
                quantity={quantity}
                ticker={coin?.symbol}
              />
            </div>
            <div className="flex">
              <button onClick={() => setShowTrades(true)}>View Trades</button>
            </div>
          </Sidebar>

          <CoinInfo coin={coin} />
        </>
      )}
    </CoinContainer>
  );
};

export default CoinPage;
