import React, { useState } from 'react';
import GamepadIcon from '@mui/icons-material/Gamepad';

import DiceGame from '../Components/tenzies/DiceGame';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  NativeSelect,
  Select,
} from '@mui/material';
import { CryptoState } from '../CryptoContext';

const Navbar = () => {
  const [showTenziesGame, setshowTenziesGame] = useState(false);

  // const { currency, setCurrency } = CryptoState();

  return (
    <>
      <nav>
        <h6>Hi, Omar!</h6>
        <FormControl>
          <InputLabel variant="standard" htmlFor="controlled-native">
            Currency
          </InputLabel>
          <NativeSelect
            // value={currency}
            // onChange={(e) => setCurrency(e.target.value)}
            inputProps={{
              name: 'currency',
              id: 'controlled-native',
            }}
          >
            <option value={'USD'}>USD</option>
            <option value={'GBP'}>GBP</option>
          </NativeSelect>
        </FormControl>

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
