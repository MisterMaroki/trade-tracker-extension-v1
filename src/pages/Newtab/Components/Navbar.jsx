import React, { useState } from 'react';
import GamepadIcon from '@mui/icons-material/Gamepad';

import DiceGame from '../Components/tenzies/DiceGame';
import { Button, IconButton, NativeSelect, Select } from '@mui/material';
import { CryptoState } from '../CryptoContext';

const Navbar = ({ inCoinPage, setInCoinPage }) => {
  const [showTenziesGame, setshowTenziesGame] = useState(false);

  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <nav>
        <h6>Hi, Omar!</h6>
        <NativeSelect
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          inputProps={{
            name: 'currency',
            id: 'controlled-native',
          }}
        >
          <option value={'USD'}>USD</option>
          <option value={'GBP'}>GBP</option>
        </NativeSelect>
        <IconButton
          style={{ color: '#05595b' }}
          onClick={() => setshowTenziesGame(!showTenziesGame)}
        >
          <GamepadIcon />
        </IconButton>
      </nav>
      {showTenziesGame && <DiceGame />}
    </>
  );
};

export default Navbar;
