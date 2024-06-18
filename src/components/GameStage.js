import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";

const GameStage = ({ profile, stage, setStage, setCurrentPage, removeFromLocalStorage }) => {
  const [hp, setHp] = useState(10);
  const [diceCount, setDiceCount] = useState(1);
  const [enemyDiceCount , setEnemyDiceCount ] = useState(1);
  const [gameResult, setGameResult] = useState("");
  

  useEffect(() => {
    // HP
    const savedHp = localStorage.getItem("hp");
    if (savedHp) {
      setHp(parseInt(savedHp, 10));
    }

    // enemyDiceCount
    const savedEnemyDiceCount = localStorage.getItem("enemyDiceCount");
    if (savedEnemyDiceCount) {
      setEnemyDiceCount(parseInt(savedEnemyDiceCount, 10));
    }

    // 오브젝트 로컬 저장 예
    const storedStatus = JSON.parse(localStorage.getItem("status"));
    if (storedStatus) {
      setStatus(storedStatus);
    }
  }, []);

  const updateStage = (newStage) => {
    setStage(newStage);
    localStorage.setItem("stage", newStage);
    if (stage === 5) {
      enemyDiceUp(1);
    }
    if (stage === 10) {
      enemyDiceUp(1);
    }
    if (stage === 15) {
      enemyDiceUp(1);
    }
    if (stage === 20) {
      enemyDiceUp(1);
    }
    if (stage === 25) {
      enemyDiceUp(1);
    }
    if (stage === 30) {
      enemyDiceUp(1);
    }
  };
  const stageCtrl = () => {
    updateStage(parseInt(stage, 10) + 1);
  };

  // hpCtrl
  const hpCtrl = (v) => {
    const newValue = (parseInt(hp, 10) + v);
    if (newValue <= 10) {
      setHp(newValue);
      localStorage.setItem("hp", newValue);
    } else {
      setHp(10);
      localStorage.setItem("hp", 10);
      console.log("최대치입니다.");
    }
    if (newValue <= 0) {
      console.log("gameover");
      removeFromLocalStorage();
      setCurrentPage("main");
    }
  };
  // diceUp
  const diceUp = (v) => {
    const newValue = (parseInt(diceCount, 10) + v);
    if (newValue <= 5) {
      setDiceCount(newValue);
    } else {
      setDiceCount(5);
      console.log("최대치입니다.")
    }
  };
  // enemyDiceUp
  const enemyDiceUp = (v) => {
    const newValue = enemyDiceCount + v;
    setEnemyDiceCount(newValue);
    localStorage.setItem("enemyDiceCount", newValue);
  };
  
  // 오브젝트 로컬 저장 예 test
  const [status, setStatus] = useState({
    bag: "false",
  });
  const updateStage2 = () => {
    // test
    const newStatus = {
      bag: "true",
    };
    setStatus(newStatus);
    localStorage.setItem("status", JSON.stringify(newStatus));
  };


  return (
    <div>
      {/* <div className={`Avatar-preview ${profile.head} ${profile.eyes} ${profile.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div> */}
      <div className="d-flex">
        <div>stage: {stage}</div>
        <div>hp: {hp}</div>
        <div>dice: {diceCount}</div>
        <div>enemy: {enemyDiceCount}</div>
      </div>
      <button onClick={stageCtrl}>upstage</button>
      {/* <button onClick={updateStage2}>add2</button> */}
      <button onClick={hpCtrl}>hptest</button>
      <Dice
        hpCtrl={hpCtrl}
        diceCount={diceCount}
        setDiceCount={setDiceCount}
        enemyDiceCount={enemyDiceCount}
        setGameResult={setGameResult}
        stageCtrl={stageCtrl}
      />
      <Inventory
        hpCtrl={hpCtrl}
        diceUp={diceUp}
      />
      <div>
        <h3>Result: {gameResult}</h3>
      </div>
    </div>
  );
};

export default GameStage;
