import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import '../Newtab/styles/Newtab.scss';
import './Popup.css';

import { CryptoState } from '../Newtab/CryptoContext';
import { Select } from '@mui/material';
import TradeTools from '../Newtab/Components/TradeTools';
import AuthModal from '..//Newtab/Components/auth/AuthModal.js';
const options = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'binancecoin', label: 'Binance' },
];
const Popup = () => {
  return <div className={`__container `}>Features in progress.</div>;
};

export default Popup;
