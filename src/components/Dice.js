import React, { useState, useEffect } from "react";
import DialogComponent from "./dialog";

const Dice = ({ dialog, setDialog, diceCount, enemyDiceCount, clearCtrl, hpCtrl, diceBuff, enemyCtrl, setLooting, findCtrl, setDiceBuff }) => {
  const [rollingPlayer, setRollingPlayer] = useState(false);
  const [rollingEnemy, setRollingEnemy] = useState(false);
  const [diceNumbers, setDiceNumbers] = useState([]);
  const [opponentDiceNumbers, setOpponentDiceNumbers] = useState([]);
  const [playerDiceSum, setPlayerDiceSum] = useState(0);
  const [opponentDiceSum, setOpponentDiceSum] = useState(0);

  const totalDice = diceCount + diceBuff;

  console.log(`totalDice : ${totalDice}`);

  useEffect(() => {
    // Initialize player's dice numbers array based on totalDice
    const initialDiceNumbers = Array(totalDice).fill(0);
    setDiceNumbers(initialDiceNumbers);
  }, [totalDice]);

  useEffect(() => {
    // Initialize opponent's dice numbers array based on enemyDiceCount
    const storedEnemyDiceCount = localStorage.getItem("enemyDiceCount");
    const initialOpponentDiceNumbers = Array(
      storedEnemyDiceCount ? parseInt(storedEnemyDiceCount, 10) : 1
    ).fill(0);
    setOpponentDiceNumbers(initialOpponentDiceNumbers);
  }, [enemyDiceCount]);

  const rollDice = () => {
    if (!rollingPlayer && !rollingEnemy) {
      setRollingEnemy(true);

      // Roll opponent's dice
      const newOpponentDiceNumbers = Array(enemyDiceCount)
        .fill(0)
        .map(() => Math.floor(Math.random() * 6) + 1);
      setOpponentDiceNumbers(newOpponentDiceNumbers);

      setTimeout(() => {
        // Calculate sum of opponent's dice numbers
        const opponentSum = newOpponentDiceNumbers.reduce((acc, val) => acc + val, 0);
        setOpponentDiceSum(opponentSum);

        // Roll player's dice after 1 second
        const newDiceNumbers = Array(totalDice)
          .fill(0)
          .map(() => Math.floor(Math.random() * 6) + 1);
        setDiceNumbers(newDiceNumbers);
        setRollingEnemy(false);
        setRollingPlayer(true);

        setTimeout(() => {
          // Calculate sum of player's dice numbers
          const playerSum = newDiceNumbers.reduce((acc, val) => acc + val, 0);
          setPlayerDiceSum(playerSum);
          setRollingPlayer(false);

          // Determine game result
          if (playerSum > opponentSum) {
            clearCtrl("win");
            renderDialog("loading", "승리하였습니다. 보상을 얻습니다.");
            setTimeout(() => {
              renderDialog(null);
              setLooting(true);
              enemyCtrl(-1);
            }, 1000);
          } else {
            clearCtrl("lose");
            renderDialog("loading", "패배하였습니다. 체력을 잃습니다.");
            setTimeout(() => {
              renderDialog(null);
              hpCtrl(-1);
              enemyCtrl(1);
            }, 1000);
          }
          findCtrl("");
          setDiceBuff(0);
        }, 1000); // Wait 1 second before calculating player's sum
      }, 1000); // Wait 1 second before calculating opponent's sum
    }
  };

  // renderDialog 
  const renderDialog = (state, message) => {
    setDialog({
      id: Date.now(),
      message: message,
      class: "close"
    });
    if (state === "open") {
      setDialog({
        id: Date.now(),
        message: message,
        class: "open",
      });
    } else if (state === "confirm") {
      setDialog({
        id: Date.now(),
        message: message,
        class: "confirm",
      });
    } else if (state === "loading") {
      setDialog({
        id: Date.now(),
        message: message,
        class: "loading",
      });
    }
  }

  return (
    <div>
      <DialogComponent
        dialogMsg={dialog.message}
        dialogClass={dialog.class}
        renderDialog={renderDialog}
      />

      <div>
        <h3>Opponent's Dice Sum: {opponentDiceSum}</h3>
        {/* {opponentDiceNumbers.map((number, index) => (
          <p key={index}>Number: {number}</p>
        ))} */}
      </div>
      <div className="d-flex">
        {opponentDiceNumbers.map((number, index) => (
          <div className="dice-wrap dice-enemy" key={index}>
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
        <h3>Your Dice Sum: {playerDiceSum}</h3>
        {/* {diceNumbers.map((number, index) => (
          <p key={index}>Number: {number}</p>
        ))} */}
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
      <div className="align-center">
        <button onClick={rollDice} disabled={rollingPlayer || rollingEnemy}>
          {rollingPlayer || rollingEnemy ? "Rolling..." : "Roll Dice"}
        </button>
      </div>
      <br />
    </div>
  );
};

export default Dice;
