import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import Banner from '../Components/banner/Banner';
import CoinsTable from '../Components/CoinsTable';

const DashboardContainer = styled(Container)`
  margin-top: 5rem;
  /* height: 88vh; */
  min-height: 88vh;
  max-height: none;
  max-width: none !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 95vw;

  border-radius: 10px;
  background: #f5f5f5e8;
`;
const CoinDashboard = () => {
  return (
    <>
      <Banner />
      <CoinsTable />
    </>
  );
};

export default CoinDashboard;
