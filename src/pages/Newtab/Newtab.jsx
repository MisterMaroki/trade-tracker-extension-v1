import React, { useEffect, useState } from 'react';
import './Newtab.css';
import Navbar from './Components/Navbar';
import CoinPage from './Pages/CoinPage';
import CoinDashboard from './Pages/CoinDashboard';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Newtab = () => {
  return (
    <BrowserRouter>
      <div className="newTab__container newTab__primarybg">
        <Navbar />
        <Routes>
          <Route path="/newTab.html" element={<CoinDashboard />} />
          <Route path="/coins/:id" component={CoinPage} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Newtab;
