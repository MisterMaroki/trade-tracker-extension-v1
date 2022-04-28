import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import './index.css';

import DiceGame from './tenzies/DiceGame';
import Dice from './tenzies/Dice';

render(<Newtab />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
