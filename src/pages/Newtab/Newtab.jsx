import React, { useState } from 'react';
import './Newtab.css';
import Navbar from './Components/Navbar';
import CoinPage from './Components/coinPage';
import styled from '@emotion/styled';
import CryptoContext from './CryptoContext';
import CoinDashboard from './Components/CoinDashboard';

const Newtab = () => {
  const [inCoinPage, setInCoinPage] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  return (
    <CryptoContext>
      <div className="newTab__container newTab__primarybg">
        <Navbar inCoinPage={inCoinPage} setInCoinPage={setInCoinPage} />
        <CoinDashboard />
        {selectedCoinId && inCoinPage && <CoinPage id={selectedCoinId} />}
      </div>
    </CryptoContext>
  );
};

export default Newtab;
