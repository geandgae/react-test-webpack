import React, { useState, useEffect } from "react";

const Dice = ({ diceCount, enemyDiceCount }) => {
  const [rollingPlayer, setRollingPlayer] = useState(false);
  const [rollingEnemy, setRollingEnemy] = useState(false);
  const [diceNumbers, setDiceNumbers] = useState([]);
  const [opponentDiceNumbers, setOpponentDiceNumbers] = useState([]);
  console.log(opponentDiceNumbers);

  useEffect(() => {
    // Initialize player's dice numbers array based on diceCount
    const initialDiceNumbers = Array(diceCount).fill(0);
    setDiceNumbers(initialDiceNumbers);
  }, [diceCount]);

  useEffect(() => {
    // Initialize opponent's dice numbers array based on enemyDiceCount
    const storedEnemyDiceCount = localStorage.getItem("enemyDiceCount");
    const initialOpponentDiceNumbers = Array(
      storedEnemyDiceCount ? parseInt(storedEnemyDiceCount, 10) : 1
    ).fill(0);
    setOpponentDiceNumbers(initialOpponentDiceNumbers);
    // const initialOpponentDiceNumbers = Array(enemyDiceCount).fill(0);
    // setOpponentDiceNumbers(initialOpponentDiceNumbers);
  }, [enemyDiceCount]);

  const rollDice = () => {
    if (!rollingPlayer && !rollingEnemy) {
      setRollingEnemy(true);
      setTimeout(() => {
        // Roll opponent's dice first
        const newOpponentDiceNumbers = Array(enemyDiceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
        setOpponentDiceNumbers(newOpponentDiceNumbers);
        setRollingEnemy(false);
        setRollingPlayer(true);
        setTimeout(() => {
          // Roll player's dice after 1 second
          const newDiceNumbers = Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
          setDiceNumbers(newDiceNumbers);
          setRollingPlayer(false);
        }, 1000);
      }, 1000);
    }
  };

  // Calculate sum of opponent's dice numbers
  const opponentDiceSum = opponentDiceNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // Calculate sum of player's dice numbers
  const playerDiceSum = diceNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <div>
      <div>
        <h3>Opponent's Dice {opponentDiceSum}</h3>
        {opponentDiceNumbers.map((number, index) => (
          <p key={index}>Number: {number}</p>
        ))}
      </div>
      <div className="d-flex">
        {opponentDiceNumbers.map((number, index) => (
          <div className="dice-wrap" key={index}>
            <div className={`dice-3d ${rollingEnemy ? "rolling" : ""}`}>
              <span className={`active-${number}`}>{number}</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>Your Dice {playerDiceSum}</h3>
        {diceNumbers.map((number, index) => (
          <p key={index}>Number: {number}</p>
        ))}
      </div>
      <div className="d-flex">
        {diceNumbers.map((number, index) => (
          <div className="dice-wrap" key={index}>
            <div className={`dice-3d ${rollingPlayer ? "rolling" : ""}`}>
              <span className={`active-${number}`}>{number}</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={rollDice} disabled={rollingPlayer}>
          {rollingPlayer ? "Rolling..." : "Roll Dice"}
        </button>
      </div>
      <br />
    </div>
  );
};

export default Dice;
