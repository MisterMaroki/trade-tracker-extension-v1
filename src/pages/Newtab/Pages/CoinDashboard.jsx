import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import Banner from '../Components/banner/Banner';
import CoinsTable from '../Components/CoinsTable';

const DashboardContainer = styled(Container)`
  margin-top: 4rem;
  height: 88vh;
  width: 95vw;

  border-radius: 10px;
  background: #f5f5f5e8;
`;
const CoinDashboard = () => {
  return (
    <DashboardContainer className="dashboard--container">
      <Banner />
      <CoinsTable />
    </DashboardContainer>
  );
};

export default CoinDashboard;
