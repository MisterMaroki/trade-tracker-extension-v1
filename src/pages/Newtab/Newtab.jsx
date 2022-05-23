import React from 'react';
import './styles/Newtab.scss';
import Navbar from './Components/Navbar';
import CoinPage from './Pages/CoinPage';
import CoinDashboard from './Pages/CoinDashboard';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import TradesPage from './Pages/TradesPage';
import { black, NewtabContainer } from './styles/themeVariables';
import { CryptoState } from './CryptoContext';
import AppWideSidebar from './Components/AppWideSidebar';

const Newtab = () => {
  const { id, showTrades } = CryptoState();
  return (
    <BrowserRouter>
      <Navbar />
      <AppWideSidebar>
        <NewtabContainer>
          {showTrades ? <TradesPage /> : id ? <CoinPage /> : <CoinDashboard />}
          {/* </AppWideSidebar> */}
        </NewtabContainer>
      </AppWideSidebar>
    </BrowserRouter>
  );
};

export default Newtab;
