import { Typography } from '@mui/material';
import React from 'react';
import TradesTable from '../Components/TradesTable';
import { CryptoState } from '../CryptoContext';
import { TradesContainer } from '../styles/themeVariables';

const TradesPage = () => {
  const { filter, handleFilter } = CryptoState();
  return (
    <TradesContainer>
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Ubuntu' }}
        >
          {filter === 'closed' ? 'Closed Trades' : 'Active Trades'}
        </Typography>
        <button onClick={() => handleFilter('')}>
          Show {filter === 'closed' ? 'Active Trades' : 'Closed Trades'}
        </button>
      </div>

      <TradesTable />
    </TradesContainer>
  );
};

export default TradesPage;
