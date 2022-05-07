import React from 'react';
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'ticker', headerName: 'Ticker' },
  { field: 'date', headerName: 'Date', type: 'date' },
  { field: 'price', headerName: 'Price', type: 'number' },
  { field: 'quantity', headerName: 'Quantity', type: 'number' },
  {
    field: 'invested',
    headerName: 'Invested',
    type: 'number',
    width: 90,
  },
  { field: 'fiat', headerName: 'Fiat' },
];

//   coin: "solana"
//   date: "2022-05-07T12:56:22.278Z"
//   fiat: "usd"
//   invested: "818.1,999,999,999,999"
//   price: 81.82
//   quantity: "10"
//   ticker: "sol"

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const CurrentTradesList = () => {
  const { trades, setTrades } = CryptoState();
  const [showing, setShowing] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <button onClick={() => setShowing(!showing)}>
        {showing ? 'Hide' : 'Show'} Open Trades
      </button>
      {showing && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={trades}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      )}
    </div>
  );
};

export default CurrentTradesList;
