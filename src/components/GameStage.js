import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";

const GameStage = ({ profile, stage, setStage }) => {
  const [hp, setHp] = useState(5);
  const [diceCount, setDiceCount] = useState(1);
  const [enemyDiceCount , setEnemyDiceCount ] = useState(1);
  const [bag, setBag] = useState("true");
  

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
    if (stage > 10) {
      enemyDiceUp(1);
    }
  };
  const handleClick = () => {
    updateStage(parseInt(stage, 10) + 1); // 클릭 시 stage를 현재 값 + 1로 업데이트
  };

  // hpUp
  const hpUp = (v) => {
    const newValue = (parseInt(hp, 10) + v);
    if (newValue <= 200) {
      setHp(newValue);
      localStorage.setItem("hp", newValue);
    } else {
      console.log("최대치입니다.")
    }
  };
  // diceUp
  const diceUp = (v) => {
    const newValue = (parseInt(diceCount, 10) + v);
    if (newValue <= 3) {
      setDiceCount(newValue);
    } else {
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
      <div>stage: {stage}</div>
      <div>hp: {hp}</div>
      <div>dice: {diceCount}</div>
      <div>enemy: {enemyDiceCount}</div>
      <div>bag: {bag}</div>
      <button onClick={handleClick}>upstage</button>
      <button onClick={updateStage2}>add2</button>
      <button onClick={hpUp}>hptest</button>
      <Dice
        diceCount={diceCount}
        enemyDiceCount={enemyDiceCount}
      />
      <Inventory
        hpUp={hpUp}
        diceUp={diceUp}
      />
    </div>
  );
};

export default GameStage;
