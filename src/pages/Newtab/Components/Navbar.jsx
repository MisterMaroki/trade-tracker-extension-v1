import React, { useState } from 'react';
// import DiceGame from '../Components/tenzies/DiceGame';
// import Select from 'react-select';
import { CryptoState } from '../CryptoContext';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import MySelect from './MySelect';
import { primarytext, tertiary, textFieldSx } from '../styles/themeVariables';
import { CancelOutlined, ThumbUpOffAltOutlined } from '@mui/icons-material';
import { UserState } from '../UserContext';
import CoinItem from './CoinItem';

const Navbar = () => {
  // const [showTenziesGame, setshowTenziesGame] = useState(false);
  const {
    search,
    setSearch,
    setId,
    showTrades,
    setShowTrades,
    coins,
    handleSearch,
    id,
  } = CryptoState();
  console.log(
    '🚀 ~ file: Navbar.jsx ~ line 24 ~ Navbar ~ handleSearchlength',
    handleSearch()?.length
  );

  const [nameInput, setNameInput] = useState('');
  const { user, setUser } = UserState();
  return (
    <>
      <header>
        {user ? (
          <h6
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setId('');
              setShowTrades(false);
            }}
          >
            <span>{user}'s Dashboard</span>
          </h6>
        ) : (
          <TextField
            label="What's your name?"
            value={nameInput}
            sx={textFieldSx}
            size="small"
            onChange={(e) => setNameInput(e.target.value)}
            InputProps={{
              endAdornment: nameInput.length > 0 && (
                <IconButton
                  variant="outlined"
                  onClick={(e) => setUser(nameInput)}
                  sx={{
                    padding: 0,
                    position: 'absolute',
                    right: 10,
                    top: 8,
                  }}
                >
                  <ThumbUpOffAltOutlined
                    sx={{ color: tertiary, fontSize: 20 }}
                  />
                </IconButton>
              ),
            }}
          />
        )}

        <Stack direction="row" spacing={2}>
          <TextField
            // clearable
            value={search}
            label={showTrades ? 'Filter trades...' : 'Search for a coin...'}
            sx={textFieldSx}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            InputProps={{
              endAdornment: search.length > 0 && (
                <IconButton
                  variant="outlined"
                  onClick={() => setSearch('')}
                  sx={{
                    padding: 0,
                    position: 'absolute',
                    right: 10,
                    top: 8,
                  }}
                >
                  <CancelOutlined sx={{ color: tertiary }} />
                </IconButton>
              ),
            }}
          />

          <MySelect />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              color: !showTrades && !id ? tertiary : primarytext,
              backgroundColor: 'none',
              '&:hover': {
                backgroundColor: '#09111b',
              },
            }}
            onClick={() => {
              setId('');
              setShowTrades(false);
            }}
          >
            Home
          </Button>

          <Button
            sx={{
              color: showTrades ? tertiary : primarytext,
              backgroundColor: 'none',
              '&:hover': {
                backgroundColor: '#09111b',
              },
            }}
            onClick={() => setShowTrades(!showTrades)}
          >
            Trades
          </Button>
        </Stack>
      </header>
      {search &&
        !showTrades &&
        coins.find((x) => x.id.includes(search) || x.symbol.includes(search)) &&
        id && (
          <div className="search-dropdown">
            <CoinItem row={handleSearch()[0]} />
          </div>
        )}
      {/* {showTenziesGame && <DiceGame />} */}
      <div style={{ height: '1rem' }} />
    </>
  );
};

export default Navbar;
