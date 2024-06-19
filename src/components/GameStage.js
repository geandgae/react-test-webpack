import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";

const GameStage = ({ profile, stage, setStage, setCurrentPage }) => {
  const [hp, setHp] = useState(10);
  const [diceCount, setDiceCount] = useState(1);
  const [diceBuff, setDiceBuff] = useState(0);
  const [enemyDiceCount, setEnemyDiceCount] = useState(1);
  const [gameResult, setGameResult] = useState("");
  const [looting, setLooting] = useState(false);
  const [enemyStep, setEnemyStep] = useState(0);
  const [findItem, setFindItem] = useState(1);
  
  console.log(`enemyStep : ${enemyStep}`)

  useEffect(() => {
    // HP
    const savedHp = localStorage.getItem("hp");
    if (savedHp) {
      setHp(parseInt(savedHp, 10));
    }

    // diceCount
    const savedDiceCount = localStorage.getItem("diceCount");
    if (savedDiceCount) {
      setDiceCount(parseInt(savedDiceCount, 10));
    }

    // enemyDiceCount
    const savedEnemyDiceCount = localStorage.getItem("enemyDiceCount");
    if (savedEnemyDiceCount) {
      setEnemyDiceCount(parseInt(savedEnemyDiceCount, 10));
    }

    // enemyStep
    const savedEnemyStep = localStorage.getItem("enemyStep");
    if (savedEnemyStep) {
      setEnemyStep(parseInt(savedEnemyStep, 10));
    }

    // findItem
    const savedFindItem = localStorage.getItem("findItem");
    if (savedFindItem) {
      setFindItem(parseInt(savedFindItem, 10));
    }
  }, []);

  useEffect(() => {
    if (enemyStep >= 3) {
      hpCtrl(-3);
      setTimeout(() => {
        enemyCtrl(-3);
      }, 2000);
      console.log("attack");
    }
  }, [enemyStep]);

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
    if (stage === 35) {
      enemyDiceUp(1);
    }
    if (stage === 40) {
      enemyDiceUp(1);
    }
    if (stage === 45) {
      enemyDiceUp(1);
    }
    if (stage === 50) {
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
      setCurrentPage("gameover");
    }
  };
  // diceUp
  const diceUp = (v) => {
    const newValue = (parseInt(diceBuff, 10) + v);
    if (newValue <= 5) {
      setDiceBuff(newValue);
    } else {
      setDiceBuff(5);
      console.log("최대치입니다.")
    }
  };
  // enemyDiceUp
  const enemyDiceUp = (v) => {
    const newValue = enemyDiceCount + v;
    setEnemyDiceCount(newValue);
    localStorage.setItem("enemyDiceCount", newValue);
  };
  const diceEquip = (v) => {
    const newValue = (parseInt(diceCount, 10) + v);
    setDiceCount(newValue);
    localStorage.setItem("diceCount", newValue);
  };
  // findCtrl
  const findCtrl = (v) => {
    const newValue = (parseInt(findItem, 10) + v);
    setFindItem(newValue);
    localStorage.setItem("findItem", newValue);
  }
  // itemCtrl
  const itemCtrl = () => {
    findCtrl(-1);
    const dice = Math.floor(Math.random() * 100) + 1;
    if (dice <= 30) {
      setLooting(true);
      console.log("아이템을 찾았습니다.");
    } else {
      setLooting(false)
      console.log("아이템을 찾지 못했습니다.");
    }
  }
  // enemyCtrl
  const enemyCtrl = (v) => {
    const newValue = (parseInt(enemyStep, 10) + v);
    if (newValue <= 0) {
      setEnemyStep(0);
    } else {
      setEnemyStep(newValue);
    }
    localStorage.setItem("enemyStep", newValue);
  } 
  // reSet
  const reSet = () => {
    setGameResult("");
    setDiceBuff(0);
  }
  
  return (
    <div>
      {/* <div className={`Avatar-preview ${profile.head} ${profile.eyes} ${profile.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>enemyStep
      </div> */}
      <div className="stage-wrap">
        <div className="stage">
          <div className={`enemy ${enemyStep === 1 ? "step1" : enemyStep === 2 ? "step2" : enemyStep === 3 ? "step3" : ""}`}></div>
          <div className="before"></div>
          <div className="curent"></div>
          <div className="after"></div>
        </div>
      </div>
      <div className="d-flex">
        <div>stage: {stage}</div>
        <div>hp: {hp}</div>
        <div>dice: {diceCount}</div>
        <div>enemy: {enemyDiceCount}</div>
      </div>
      {/* <button onClick={stageCtrl}>upstage</button> */}
      {/* <button onClick={hpCtrl}>hptest</button> */}
      <button onClick={() => setCurrentPage("main")}>메인으로</button>
      {findItem >=1 &&
      <button onClick={itemCtrl}>looting({findItem})</button>
      }
      <Dice
        hpCtrl={hpCtrl}
        diceCount={diceCount}
        setDiceCount={setDiceCount}
        enemyDiceCount={enemyDiceCount}
        setGameResult={setGameResult}
        stageCtrl={stageCtrl}
        diceBuff={diceBuff}
        enemyCtrl={enemyCtrl}
        findCtrl={findCtrl}
      />
      <Inventory
        hpCtrl={hpCtrl}
        diceUp={diceUp}
        diceEquip={diceEquip}
        looting={looting}
        setLooting={setLooting}
      />
      {/* result */}
      {gameResult && 
      <div className="intro" onClick={reSet}>
        <span>Result: {gameResult}</span>
      </div>
      }
    </div>
  );
};

export default GameStage;
