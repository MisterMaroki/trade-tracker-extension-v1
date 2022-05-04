import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const data = await axios.get(SingleCoin(id));

    if (coin?.id !== data.data.id) setCoin(data.data);
  };
  useEffect(() => {
    fetchCoin();
  }, [coin]);

  const { currency, symbol } = CryptoState();

  console.log(coin);

  return (
    <CoinContainer>
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
      </Sidebar>

      {/* {chart} */}
      <CoinInfo coin={coin} />
    </CoinContainer>
  );
};

export default CoinPage;