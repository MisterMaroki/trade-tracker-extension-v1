import React, { useEffect, useState } from 'react';
import GamepadIcon from '@mui/icons-material/Gamepad';
import { useNavigate } from 'react-router-dom';
import DiceGame from '../Components/tenzies/DiceGame';
// import Select from 'react-select';
import { CryptoState } from '../CryptoContext';
import { Button, Stack } from '@mui/material';
import MySelect from './MySelect';
import styled from '@emotion/styled';
import { primarytext } from '../styles/themeVariables';

const Navbar = () => {
  const [showTenziesGame, setshowTenziesGame] = useState(false);

  const navigate = useNavigate();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: primarytext,
    backgroundColor: 'none',
    '&:hover': {
      backgroundColor: '#09111b',
    },
  }));
  return (
    <>
      <header>
        <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span>newtab</span>
        </h6>
        <Stack direction="row" spacing={2}>
          <MySelect />
        </Stack>
        <Stack direction="row" spacing={2}>
          <ColorButton onClick={() => navigate('/')}>Home</ColorButton>

          <ColorButton onClick={() => navigate('/trades')}>Trades</ColorButton>
        </Stack>
      </header>
      {showTenziesGame && <DiceGame />}
    </>
  );
};

export default Navbar;
