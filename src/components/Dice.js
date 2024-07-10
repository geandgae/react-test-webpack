import React, { useState, useEffect } from "react";
import DialogComponent from "./Dialog";
// store
import { useAppState, useAppDispatch } from "../store/Store";

const Dice = ({ diceCount, diceCountEnemy, diceBuff, setDiceBuff, ctrlHp, ctrlFind }) => {
  // store
  const { stage, environments, gameResult, bless, rword } = useAppState();
  const { renderDialog, setLooting, setGameResult } = useAppDispatch();

  const [rollingPlayer, setRollingPlayer] = useState(false);
  const [rollingEnemy, setRollingEnemy] = useState(false);
  const [diceNumbers, setDiceNumbers] = useState([]);
  const [opponentDiceNumbers, setOpponentDiceNumbers] = useState([]);
  const [playerDiceSum, setPlayerDiceSum] = useState(0);
  const [opponentDiceSum, setOpponentDiceSum] = useState(0);

  const totalDice = diceCount + diceBuff;

  useEffect(() => {
    const initialDiceNumbers = Array(totalDice).fill(0);
    setDiceNumbers(initialDiceNumbers);
  }, [totalDice]);

  useEffect(() => {
    const storedDiceCountEnemy= localStorage.getItem("diceCountEnemy");
    const initialOpponentDiceNumbers = Array(
      storedDiceCountEnemy ? parseInt(storedDiceCountEnemy, 10) : 1
    ).fill(0);
    setOpponentDiceNumbers(initialOpponentDiceNumbers);
  }, [diceCountEnemy]);

  const rollDice = () => {
    if (!rollingPlayer && !rollingEnemy) {
      setRollingEnemy(true);
      // dmg
      const dmg = Math.floor((environments[stage] - 7) / 2);
      // debug
      console.log(`${stage} : ${environments[stage]} : ${dmg}`);
      try {
        // Roll opponent's dice
        const newOpponentDiceNumbers = Array(diceCountEnemy)
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
            const diceSum = (newDiceNumbers.reduce((acc, val) => acc + val, 0));
            const playerSum = diceSum + bless;
            setPlayerDiceSum(playerSum);
            setRollingPlayer(false);
            // Determine game result
            if (playerSum > opponentSum) {
              setGameResult("win");
              renderDialog("loading", `승리하였습니다. ${rword.reward}을 얻습니다.`);
              setTimeout(() => {
                renderDialog(null);
                setLooting(true);
              }, 1000);
            } else {
              setGameResult("lose");
              renderDialog("loading", `패배하였습니다. ${rword.hp}을 ${dmg}`);
              setTimeout(() => {
                renderDialog(null);
                ctrlHp(dmg);
              }, 1000);
            }
          }, 1000); // Wait 1 second before calculating player's sum
        }, 1000); // Wait 1 second before calculating opponent's sum
      } catch (error) {
        // debug
        console.error("Failed to roll dice:", error);
      }
    }
  };
  
  const resetBattle = () => {
    ctrlFind("");
    setDiceBuff(0);
  }

  // debug
  // console.log(`totalDice: ${totalDice}`);
  // console.log(environments[stage]);

  return (
    <div>
      <DialogComponent/>

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
        {!gameResult &&
        <button onClick={rollDice} disabled={rollingPlayer || rollingEnemy}>
          {rollingPlayer || rollingEnemy ? "Rolling..." : "Roll Dice"}
        </button>
        }
        {gameResult === "win" &&
          <button onClick={resetBattle}>{rword.reward}획득</button>
        }
        {gameResult === "lose" &&
          <button onClick={resetBattle}>돌아가기</button>
        }
      </div>
      <br />
    </div>
  );
};

export default Dice;
