import React from 'react';
import Banner from '../Components/banner/Banner';
import CoinsTable from '../Components/CoinsTable';
import { DashboardContainer } from '../styles/themeVariables';

const CoinDashboard = () => {
  return (
    <DashboardContainer>
      <Banner />
      <CoinsTable />
    </DashboardContainer>
  );
};

export default CoinDashboard;
