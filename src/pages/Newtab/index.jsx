import React from 'react';
import { render } from 'react-dom';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en-GB.json';

import Newtab from './Newtab';
import './index.css';
import CryptoContext from './CryptoContext';
import UserContext from './UserContext';
import ChartContext from './ChartContext';
TimeAgo.addDefaultLocale(en);

render(
  <CryptoContext>
    <UserContext>
      <ChartContext>
        <Newtab />
      </ChartContext>
    </UserContext>
  </CryptoContext>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
