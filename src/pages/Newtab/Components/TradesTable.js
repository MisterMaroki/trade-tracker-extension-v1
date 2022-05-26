import { Pagination } from '@mui/material';
import React, { useState, Suspense } from 'react';
import { CryptoState } from '../CryptoContext';
import { black, white } from '../styles/themeVariables';
import FadeIn from 'react-fade-in';
// import MiniTradeItem from './TradeItem';
const TradeItem = React.lazy(() => import('./TradeItem'));

const TradesTable = () => {
  // const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  //   const [rows, setRows] = useState([]);

  const { trades, search, filter, currentColor } = CryptoState();
  console.log(
    '🚀 ~ file: TradesTable.js ~ line 43 ~ TradesTable ~ trades',
    trades
  );

  const handleSearch = () => {
    if (search !== '') {
      return trades.filter(
        (trade) =>
          trade.coin.toLowerCase().includes(search) ||
          trade.ticker.toLowerCase().includes(search)
      );
    } else return trades;
  };

  const tradesArray = handleSearch()
    ?.filter((item) => (filter === 'closed' ? !item.active : item.active))
    ?.sort((a, b) => {
      return filter === 'closed'
        ? Date.parse(b.closed) - Date.parse(a.closed)
        : Date.parse(b.date) - Date.parse(a.date);
    });

  console.log(
    '🚀 ~ file: TradesTable.js ~ line 55 ~ TradesTable ~ tradesArray',
    tradesArray
  );

  return (
    <>
      <FadeIn className="trade-container">
        {tradesArray?.slice((page - 1) * 5, (page - 1) * 5 + 5)?.map((row) => {
          return (
            <Suspense fallback={<div>Loading</div>}>
              <TradeItem row={row} />
            </Suspense>
          );
        })}
      </FadeIn>

      {handleSearch() && (
        <Pagination
          className="flex"
          style={{
            padding: 10,
            position: 'fixed',
            bottom: 0,
            backgroundColor: black,
            width: '100%',
          }}
          sx={{
            '& .css-19micn4-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
              { backgroundColor: currentColor, color: `${black} !important` },
            '& .css-19micn4-MuiButtonBase-root-MuiPaginationItem-root': {
              color: white,
            },
          }}
          color="secondary"
          count={Math.ceil(tradesArray?.length / 5)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 120);
          }}
        />
      )}
    </>
  );
};

export default TradesTable;

export const formatDate = (date) => {
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
