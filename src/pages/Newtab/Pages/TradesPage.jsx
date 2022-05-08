import React from 'react';
import CurrentTradesList from '../Components/CurrentTradesList';
import { CoinContainer } from './CoinPage';

const TradesPage = () => {
  return (
    <CoinContainer>
      <CurrentTradesList />
    </CoinContainer>
  );
};

export default TradesPage;
