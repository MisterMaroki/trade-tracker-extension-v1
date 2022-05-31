import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import FadeIn from 'react-fade-in';
import TradeItem from './cards/TradeItem';
import Tilt from 'react-parallax-tilt';
import { ToggleButton, ToggleButtonGroup, Pagination } from '@mui/material';
import {
  black,
  primarybg,
  primarytext,
  secondarybg,
  white,
} from '../styles/themeVariables';
import MiniTradeItem from './cards/MiniTradeItem';

const MiniTradesTable = ({ refs }) => {
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

  const tradesArray = trades
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
    });

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
            exclusive="true"
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
        {['open', 'closed', 'all'].map((option) => (
          <ToggleButton
            value={option}
            exclusive="true"
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
      <FadeIn className="trade-container padded">
        {tradesArray &&
          tradesArray?.slice((page - 1) * 5, (page - 1) * 5 + 5)?.map((row) => {
            return <MiniTradeItem row={row} />;
          })}
      </FadeIn>
      {tradesArray.length > 5 && (
        <Pagination
          className="flex"
          style={{
            padding: 10,
            position: 'sticky',
            bottom: '0px',
            border: `2px solid ${primarybg}`,
            backgroundColor: secondarybg,
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
            refs.current.scroll(0, 20);
          }}
        />
      )}
    </>
  );
};

export default MiniTradesTable;
