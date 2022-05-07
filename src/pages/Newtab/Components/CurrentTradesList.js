import React from 'react';
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'ticker', headerName: 'Ticker' },
  { field: 'date', headerName: 'Date', type: 'date', width: 200 },
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

const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

//   coin: "solana"
//   date: "2022-05-07T12:56:22.278Z"
//   fiat: "usd"
//   invested: "818.1,999,999,999,999"
//   price: 81.82
//   quantity: "10"
//   ticker: "sol"

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
            rows={trades.map((trade) => ({
              ...trade,
              date: formatDate(trade.date),
            }))}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            checkboxSelection
          />
        </div>
      )}
    </div>
  );
};

export default CurrentTradesList;
