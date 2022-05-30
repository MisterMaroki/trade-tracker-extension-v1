import React, { useState } from 'react';
// import DiceGame from '../Components/tenzies/DiceGame';
// import Select from 'react-select';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button, IconButton, Stack, TextField } from '@mui/material';
import MySelect from './../MySelect';
import {
  ColorButton,
  primarytext,
  tertiary,
  textFieldSx,
} from '../../styles/themeVariables';
import {
  CancelOutlined,
  Google,
  ThumbUpOffAltOutlined,
} from '@mui/icons-material';
import { UserState } from '../../UserContext';
import CoinItem from '../cards/CoinItem';
import FadeIn from 'react-fade-in';
import Tilt from 'react-parallax-tilt';
import AuthModal from '../auth/AuthModal';
import AuthAlert from '../auth/AuthAlert';
import UserSidebar from '../auth/UserSidebar';

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
    setShowingOverview,
  } = CryptoState();
  const { loggedIn } = UserState();

  const [nameInput, setNameInput] = useState('');
  const { user } = UserState();

  return (
    <>
      <header className="flex" style={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2}>
          <h6 style={{ color: currentColor }}>cTrade</h6>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
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
              setShowingOverview(false);
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
            onClick={() => {
              setShowTrades(!showTrades);
              setShowingOverview(false);
            }}
          >
            Trades
          </Button>
          {loggedIn ? (
            <Avatar
              src={user?.photoURL}
              alt={user.displayName || user.email}
              style={{ background: 'none' }}
            />
          ) : (
            <AuthModal />
          )}
        </Stack>
      </header>
      <UserSidebar />
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
      <AuthAlert />
    </>
  );
};

export default Navbar;
