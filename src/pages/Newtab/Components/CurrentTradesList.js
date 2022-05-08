import React from 'react';
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { DataGrid } from '@mui/x-data-grid';
import { SingleCoin } from '../../Content/config/api';
import axios from 'axios';
import { numberWithCommas } from './banner/Carousel';
import { useEffect } from 'react';

const columns = [
  { field: 'ticker', headerName: 'Ticker', width: 130 },
  { field: 'date', headerName: 'Date', type: 'date', width: 200 },
  { field: 'price', headerName: 'Price', type: 'number', width: 130 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 130 },
  {
    field: 'invested',
    headerName: 'Invested',
    type: 'number',
    width: 150,
  },
  { field: 'fiat', headerName: 'Fiat', width: 130 },
  {
    field: 'value',
    headerName: 'Current Value',
    type: 'number',
    width: 150,
  },
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
const findProfits = async (trade, type) => {
  const { data } = await axios.get(SingleCoin(trade.coin));
  console.log(
    '🚀 ~ file: CurrentTradesList.js ~ line 53 ~ findProfits ~ data',
    data
  );

  const differenceMultiplier =
    data?.data?.market_data?.current_price[trade.fiat] / trade.price;
  const currentValue = trade.invested * differenceMultiplier;
  if (type === 'current-value') {
    //this returns a promise when i call it on line 79
    if (currentValue > 0) {
      return currentValue;
    }
  }
};

const CurrentTradesList = () => {
  const { trades, setTrades } = CryptoState();
  const [rows, setRows] = useState([]);

  const getRows = () => {
    setRows(
      trades.map((trade) => {
        //here I want the PromiseResult
        let currentValue = findProfits(trade, 'current-value');

        return (
          currentValue && {
            ...trade,
            invested: numberWithCommas(trade.quantity * trade.price),
            date: formatDate(trade.date),
            value: currentValue,
          }
        );
      })
    );
  };

  const showGrid = () => {
    return (
      <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection />
    );
  };

  useEffect(() => {
    getRows();
  }, [trades]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        <div style={{ height: 510, width: '100%', display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>{showGrid()}</div>
        </div>
      }
    </div>
  );
};

export default CurrentTradesList;
