import React from 'react';
import { useNavigate } from 'react-router-dom';
// import DiceGame from '../Components/tenzies/DiceGame';
// import Select from 'react-select';
import { CryptoState } from '../CryptoContext';
import { IconButton, Stack, TextField } from '@mui/material';
import MySelect from './MySelect';
import {
  ColorButton,
  primarybg,
  tertiary,
  textFieldSx,
} from '../styles/themeVariables';
import { Cancel, CancelOutlined } from '@mui/icons-material';
import { UserState } from '../UserContext';

const Navbar = () => {
  // const [showTenziesGame, setshowTenziesGame] = useState(false);
  const { search, setSearch } = CryptoState();
  const navigate = useNavigate();
  const { user, setUser } = UserState();
  return (
    <>
      <div style={{ height: '1rem' }} />
      <header>
        {user ? (
          <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <span>Hi, {user}</span>
          </h6>
        ) : (
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
          <ColorButton onClick={() => navigate('/')}>Home</ColorButton>

          <ColorButton onClick={() => navigate('/trades')}>Trades</ColorButton>
        </Stack>
      </header>
      {/* {showTenziesGame && <DiceGame />} */}
    </>
  );
};

export default Navbar;
