import React, { useEffect, useState } from 'react';
import './styles/Newtab.scss';
import Navbar, { fontbase } from './Components/Navbar';
import CoinPage from './Pages/CoinPage';
import CoinDashboard from './Pages/CoinDashboard';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import TradesPage from './Pages/TradesPage';
import { black } from './styles/themeVariables';
import { CryptoState } from './CryptoContext';

const NewtabContainer = styled(Container)`
  width: 100%;
  max-width: 1800px !important;

  height: 100%;
  margin: 0;
  padding: 0 !important;
  background-color: ${black};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Newtab = () => {
  const { id, showTrades } = CryptoState();
  return (
    <BrowserRouter>
      <NewtabContainer className="newTab__primarybg">
        <Navbar />

        {showTrades ? <TradesPage /> : id ? <CoinPage /> : <CoinDashboard />}
      </NewtabContainer>
    </BrowserRouter>
  );
};

export default Newtab;
