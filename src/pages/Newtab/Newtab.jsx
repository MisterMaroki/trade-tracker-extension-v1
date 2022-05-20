import React, { useEffect, useState } from 'react';
import './styles/Newtab.css';
import Navbar from './Components/Navbar';
import CoinPage from './Pages/CoinPage';
import CoinDashboard from './Pages/CoinDashboard';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import TradesPage from './Pages/TradesPage';

const NewtabContainer = styled(Container)`
  width: 100%;
  max-width: 1800px !important;

  height: 100%;
  margin: 0;
  padding: 0 !important;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Newtab = () => {
  return (
    <BrowserRouter>
      <NewtabContainer className="newTab__primarybg">
        <Navbar />

        <Routes>
          <Route path="/newTab.html" element={<CoinDashboard />} />
          <Route path="/" element={<CoinDashboard />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/trades" element={<TradesPage />} />
        </Routes>
      </NewtabContainer>
    </BrowserRouter>
  );
};

export default Newtab;
