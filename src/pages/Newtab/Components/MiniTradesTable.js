import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import FadeIn from 'react-fade-in';
import TradeItem from './TradeItem';
import Tilt from 'react-parallax-tilt';
import { ToggleButton, ToggleButtonGroup, Pagination } from '@mui/material';
import { black, primarybg, primarytext, white } from '../styles/themeVariables';

const MiniTradesTable = () => {
  // const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  //   const [rows, setRows] = useState([]);

  const {
    trades,

    search,
    filter,
    handleFilter,
    setFilter,
    rowDataEnrichment,
    id,
    coin,
    currentColor,
    whichCoinsToShow,
    setWhichCoinsToShow,
  } = CryptoState();

  useEffect(() => {
    tradesArray.length === 0 && setWhichCoinsToShow('all coins');
  }, []);

  // const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //     id && trades.length && rowDataEnrichment();
  //     console.log(trades);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [trades.length, id, filter]);

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
    ?.filter((item) =>
      whichCoinsToShow !== 'all coins' ? item.coin === coin.id : item
    )
    ?.filter((item) =>
      filter === 'closed'
        ? !item.active
        : filter === 'open'
        ? item.active
        : item
    )
    ?.sort((a, b) => {
      return filter === 'closed'
        ? Date.parse(b.closed) - Date.parse(a.closed)
        : Date.parse(b.date) - Date.parse(a.date);
    })
    ?.slice((page - 1) * 8, (page - 1) * 8 + 8);

  return (
    <>
      {' '}
      <ToggleButtonGroup
        value={whichCoinsToShow}
        sx={{
          position: 'sticky',
          zIndex: 10,
          top: '0',
          left: '0',
        }}
      >
        {[coin.symbol, 'all coins'].map((option) => (
          <ToggleButton
            value={option}
            exclusive={true}
            style={{
              color: whichCoinsToShow === option ? currentColor : primarytext,
              backgroundColor: primarybg,
              '&:hover': {
                backgroundColor: '#09111b',
              },
            }}
            key={option}
            onClick={() => setWhichCoinsToShow(option)}
          >
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={filter}
        sx={{
          position: 'sticky',
          zIndex: 10,
          top: '0',
          left: '100%',
        }}
      >
        {['closed', 'open', 'all'].map((option) => (
          <ToggleButton
            value={option}
            exclusive={true}
            style={{
              color: filter === option ? currentColor : primarytext,
              backgroundColor: primarybg,
              '&:hover': {
                backgroundColor: '#09111b',
              },
            }}
            key={option}
            onClick={() => handleFilter(option)}
          >
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <FadeIn className="trade-container">
        {tradesArray &&
          tradesArray.map((row) => {
            return <TradeItem row={row} />;
          })}
        {/* {handleSearch() && (
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
            count={Math.ceil(
              handleSearch()?.filter((item) =>
                filter === 'closed' ? !item.active : item.active
              )?.length / 8
            )}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 120);
            }}
          />
        )} */}
      </FadeIn>
    </>
  );
};

export default MiniTradesTable;
