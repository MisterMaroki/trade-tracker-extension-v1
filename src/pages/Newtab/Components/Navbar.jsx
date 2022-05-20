import React, { useEffect, useState } from 'react';
import GamepadIcon from '@mui/icons-material/Gamepad';
import { useNavigate } from 'react-router-dom';
import DiceGame from '../Components/tenzies/DiceGame';
// import Select from 'react-select';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { CryptoState } from '../CryptoContext';
import { Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import MySelect from './MySelect';
const Navbar = () => {
  const [showTenziesGame, setshowTenziesGame] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header>
        <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          NAME
        </h6>

        <MySelect />

        <IconButton
          style={{ color: '#05595b' }}
          onClick={() => navigate('/trades')}
        >
          <CurrencyExchangeIcon />
        </IconButton>
        <IconButton
          style={{ color: '#05595b' }}
          onClick={() => setshowTenziesGame(!showTenziesGame)}
        >
          <GamepadIcon />
        </IconButton>
      </header>
      {showTenziesGame && <DiceGame />}
    </>
  );
};

export default Navbar;
