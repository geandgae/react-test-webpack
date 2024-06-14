// src/components/Dice.js

import React, { useState } from 'react';

const Dice = () => {
  const [diceNumber, setDiceNumber] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [diceNumber2, setDiceNumber2] = useState(1);

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(randomNumber);

        const randomNumber2 = Math.floor(Math.random() * 6) + 1;
        setDiceNumber2(randomNumber2);

        setRolling(false);
      }, 2000); // n초 후에 주사위 숫자 변경
    }
  };


  return (
    <div>
      <br></br>
      <h1>Dice Roller</h1>
      <div>
        <p>Number: {diceNumber}</p>
        <p>Number: {diceNumber2}</p>
      </div>
      <div className="dice-container">
        {/* 주사위 이미지 */}
        <img
          src={`./assets/images/dice${diceNumber}.png`}
          alt={`Dice ${diceNumber}`}
          className={`dice-image ${rolling ? 'rolling' : ''}`}
        />
      </div>
      <div className="d-flex">
        <div className="dice-wrap">
          <div className={`dice-3d ${rolling ? 'rolling' : ''}`}>
            <span className={`active-${diceNumber}`}>{diceNumber}</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
        </div>
        <div className="dice-wrap">
          <div className={`dice-3d ${rolling ? 'rolling' : ''}`}>
            <span className={`active-${diceNumber2}`}>{diceNumber2}</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
        </div>
      </div>
      <div>
        {/* <button onClick={rollDice}>Roll Dice</button> */}
        <button onClick={rollDice} disabled={rolling}>
          {rolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      <br></br>
    </div>
  );
};

export default Dice;
