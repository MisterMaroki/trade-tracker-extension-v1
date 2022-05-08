import { styled } from '@mui/material';
import React from 'react';
import TradesTable from '../Components/TradesTable';
import { DashboardContainer } from './CoinDashboard';

const TradesContainer = styled(DashboardContainer)`
  width: 90%;
  justify-content: center;
  align-items: center;
`;
const TradesPage = () => {
  return (
    <TradesContainer>
      <TradesTable />
    </TradesContainer>
  );
};

export default TradesPage;
