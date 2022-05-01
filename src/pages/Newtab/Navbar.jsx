import React, { useState } from 'react';
import GamepadIcon from '@mui/icons-material/Gamepad';

import DiceGame from './tenzies/DiceGame';
import { Button, IconButton } from '@mui/material';

const Navbar = () => {
  const [showTenziesGame, setshowTenziesGame] = useState(false);
  return (
    <>
      <nav>
        <h6>Hi, Omar!</h6>
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
