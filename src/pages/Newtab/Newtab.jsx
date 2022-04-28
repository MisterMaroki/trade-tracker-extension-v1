import React from 'react';
import './Newtab.css';
import Confetti from 'react-confetti';
import DiceGame from './tenzies/DiceGame';

const Newtab = () => {
  return (
    <div className="newTab__container newTab__primarybg">
      <nav>
        <h6>Hi, Omar!</h6>
      </nav>
      <DiceGame />
    </div>
  );
};

export default Newtab;
