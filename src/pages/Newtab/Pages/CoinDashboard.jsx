import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import Banner from '../Components/banner/Banner';
import CoinsTable from '../Components/CoinsTable';
import { primarybg } from '../styles/themeVariables';

export const DashboardContainer = styled(Container)`
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
`;
const CoinDashboard = () => {
  return (
    <DashboardContainer>
      <Banner />
      <CoinsTable />
    </DashboardContainer>
  );
};

export default CoinDashboard;
