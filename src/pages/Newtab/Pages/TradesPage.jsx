import React from 'react';
import TradesTable from '../Components/TradesTable';
import { TradesContainer } from '../styles/themeVariables';

const TradesPage = () => {
  return (
    <TradesContainer>
      <TradesTable />
    </TradesContainer>
  );
};

export default TradesPage;
