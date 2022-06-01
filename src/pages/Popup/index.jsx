import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import CryptoContext from '../Newtab/CryptoContext';
import UserContext from '../Newtab/UserContext';

render(
  <UserContext>
    <CryptoContext>
      <Popup />
    </CryptoContext>
  </UserContext>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
