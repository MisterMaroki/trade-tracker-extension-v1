import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import Banner from './banner/Banner';

const Containerr = styled(Container)`
  margin-top: 4rem;
  height: 88vh;
  width: 95vw;

  border-radius: 10px;
  background: #f5f5f5e8;
`;
const CoinDashboard = ({}) => {
  return (
    <Containerr className="dashboard--container">
      <Banner />
    </Containerr>
  );
};

export default CoinDashboard;
