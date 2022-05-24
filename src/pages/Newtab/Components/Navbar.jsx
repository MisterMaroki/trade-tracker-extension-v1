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
import FadeIn from 'react-fade-in';
import Tilt from 'react-parallax-tilt';

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
    currentColor,
    setPage,
  } = CryptoState();

  const [nameInput, setNameInput] = useState('');
  const { user, setUser } = UserState();

  return (
    <>
      <header>
        {user ? (
          <h6
            style={{ cursor: 'pointer', color: currentColor }}
            onClick={() => {
              setId('');
              setShowTrades(false);
            }}
          >
            <span>
              {user.charAt(0).toUpperCase() + user.slice(1)}'s Dashboard
            </span>
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
                    sx={{ color: currentColor, fontSize: 20 }}
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
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value.toLowerCase());
            }}
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
                  <CancelOutlined sx={{ color: currentColor }} />
                </IconButton>
              ),
            }}
          />

          <MySelect />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              color: !showTrades && !id ? currentColor : primarytext,
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
              color: showTrades ? currentColor : primarytext,
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
        handleSearch() &&
        coins.find((x) => x.id.includes(search) || x.symbol.includes(search)) &&
        id && (
          <FadeIn className="search-dropdown" delay={100}>
            {handleSearch()
              .slice(0, 3)
              .map((coin, i) => {
                return (
                  <Tilt
                    tiltEnable={false}
                    glareEnable={true}
                    glareMaxOpacity={0.05}
                    glareColor="white"
                    glarePosition="bottom"
                    style={{ margin: '2rem auto', maxWidth: '500px' }}
                  >
                    <CoinItem row={handleSearch()[i]} />
                  </Tilt>
                );
              })}
          </FadeIn>
        )}
      {/* {showTenziesGame && <DiceGame />} */}
    </>
  );
};

export default Navbar;
