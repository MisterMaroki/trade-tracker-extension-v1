import React, { useState } from 'react';
// import DiceGame from '../Components/tenzies/DiceGame';
// import Select from 'react-select';
import { CryptoState } from '../CryptoContext';
import { IconButton, Stack, TextField } from '@mui/material';
import MySelect from './MySelect';
import { ColorButton, tertiary, textFieldSx } from '../styles/themeVariables';
import { CancelOutlined, ThumbUpOffAltOutlined } from '@mui/icons-material';
import { UserState } from '../UserContext';

const Navbar = () => {
  // const [showTenziesGame, setshowTenziesGame] = useState(false);
  const { search, setSearch, setId, showTrades, setShowTrades } = CryptoState();

  const [nameInput, setNameInput] = useState('');
  const { user, setUser } = UserState();
  return (
    <>
      <div style={{ height: '1rem' }} />
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
            clearable
            value={search}
            label="Search for a coin..."
            sx={textFieldSx}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
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
          <ColorButton
            onClick={() => {
              setId('');
              setShowTrades(false);
            }}
          >
            Home
          </ColorButton>

          <ColorButton onClick={() => setShowTrades(!showTrades)}>
            Trades
          </ColorButton>
        </Stack>
      </header>
      {/* {showTenziesGame && <DiceGame />} */}
    </>
  );
};

export default Navbar;
