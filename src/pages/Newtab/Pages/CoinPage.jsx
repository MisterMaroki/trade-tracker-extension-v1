import styled from '@emotion/styled';
import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../../Content/config/api';
import CoinInfo from '../Components/CoinInfo';
import { CryptoState } from '../CryptoContext';

const Sidebar = styled(Container)`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background: #f5f5f5e8;

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

    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, [coin]);

  const { currency, symbol } = CryptoState();

  return (
    <CoinContainer>
      <Sidebar>{/* {sidebar} */}sidebar</Sidebar>

      {/* {chart} */}
      <CoinInfo coin={coin} />
    </CoinContainer>
  );
};

export default CoinPage;
