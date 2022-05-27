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
import OverviewPage from './Pages/OverviewPage';

const Newtab = () => {
  const { id, showTrades, showingOverview } = CryptoState();
  return (
    <>
      <Navbar />
      <AppWideSidebar>
        <NewtabContainer>
          {showingOverview ? (
            <OverviewPage />
          ) : showTrades ? (
            <TradesPage />
          ) : id ? (
            <CoinPage />
          ) : (
            <CoinDashboard />
          )}
        </NewtabContainer>
      </AppWideSidebar>
    </>
  );
};

export default Newtab;
