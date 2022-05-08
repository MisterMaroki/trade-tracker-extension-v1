import { styled } from '@mui/material';
import React from 'react';
import CurrentTradesList from '../Components/CurrentTradesList';
import { DashboardContainer } from './CoinDashboard';

const TradesContainer = styled(DashboardContainer)`
  width: 90%;
  justify-content: center;
  align-items: center;
`;
const TradesPage = () => {
  return (
    <TradesContainer>
      <CurrentTradesList />
    </TradesContainer>
  );
};

export default TradesPage;
