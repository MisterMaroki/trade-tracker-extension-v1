import React, { useEffect, useState } from 'react';
import './Newtab.css';
import Navbar from './Components/Navbar';
import CoinPage from './Pages/CoinPage';
import CoinDashboard from './Pages/CoinDashboard';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

const Containerr = styled(Container)`
  margin-top: 5rem;
  /* height: 88vh; */
  min-height: 88vh;
  /* max-height: none; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  max-width: 1800px !important;

  border-radius: 10px;
  background: #f5f5f5e8;
`;
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
        <Containerr>
          <Routes>
            <Route path="/newTab.html" element={<CoinDashboard />} />
            <Route path="/" element={<CoinDashboard />} exact />
            <Route path="/coins/:id" component={<CoinPage />} exact />
          </Routes>
        </Containerr>
      </NewtabContainer>
    </BrowserRouter>
  );
};

export default Newtab;
