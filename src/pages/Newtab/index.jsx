import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import './index.css';
import CryptoContext from './CryptoContext';

render(
  <CryptoContext>
    <Newtab />
  </CryptoContext>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
