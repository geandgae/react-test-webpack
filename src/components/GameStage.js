import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";

const GameStage = ({ profile, stage, setStage, setCurrentPage }) => {
  const [maxHp] = useState(profile.vit);
  const [hp, setHp] = useState(maxHp);
  const [diceCount, setDiceCount] = useState(profile.str);
  const [diceBuff, setDiceBuff] = useState(0);
  const [enemyDiceCount, setEnemyDiceCount] = useState(1);
  const [gameResult, setGameResult] = useState("");
  const [enemyStep, setEnemyStep] = useState(0);
  const [looting, setLooting] = useState(false);
  const [dialog, setDialog] = useState("");
  const [dialogClass, setDialogClass] = useState(""); // 클래스 상태 추가
  const [find, setFind] = useState("");

  const stageCurent = `stage-${stage}`;
  const stageN1 = `stage-${stage - 1}`;
  const stageP1 = `stage-${stage + 1}`;
  const stageP2 = `stage-${stage + 2}`;
  const enemyWalk = `step-${enemyStep}`;
  const hpCurent = `hp-${hp}`
  
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

    // find
    const savedFind = localStorage.getItem("find");
    if (savedFind) {
      setFind("");
    }
  }, []);

  // 버그 확인
  useEffect(() => {
    if (enemyStep === 3) {
      hpCtrl(-3);
      setTimeout(() => {
        enemyCtrl(-3);
      }, 2000);
      console.log("attack");
    } else if (enemyStep >= 4) {
      setTimeout(() => {
        enemyCtrl(-3);
      }, 2000);
    }
  }, [enemyStep]);

  // stageCtrl
  const stageCtrl = () => {
    const newValue = (parseInt(stage, 10) + 1);
    setStage(newValue);
    localStorage.setItem("stage", newValue);
    // 5의 배수마다 주사위 추가
    if (stage % 5 === 0) {
      enemyDiceUp(1);
    }
    // 특정구간 표현은 스위치로
    // switch (stage) {
    //   case 5:
    //   case 10:
    //   case 15:
    //   case 20:
    //   case 25:
    //   case 30:
    //   case 35:
    //   case 40:
    //   case 45:
    //   case 50:
    //     enemyDiceUp(1);
    //     break;
    //   default:
    //     break;
    // }
  };
  // hpCtrl
  const hpCtrl = (v) => {
    const newValue = (parseInt(hp, 10) + v);
    if (newValue <= maxHp) {
      setHp(newValue);
      localStorage.setItem("hp", newValue);
    } else {
      setHp(maxHp);
      localStorage.setItem("hp", maxHp);
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
  // diceEquip 
  const diceEquip = (v) => {
    const newValue = (parseInt(diceCount, 10) + v);
    setDiceCount(newValue);
    localStorage.setItem("diceCount", newValue);
  };
  // enemyDiceUp
  const enemyDiceUp = (v) => {
    const newValue = enemyDiceCount + v;
    setEnemyDiceCount(newValue);
    localStorage.setItem("enemyDiceCount", newValue);
  };
  // itemCtrl
  const itemCtrl = () => {
    const dice = Math.floor(Math.random() * 100) + 1;
    console.log(dice);
    renderDialog("loading", "아이템을 찾는중입니다.");
    setTimeout(() => {
      renderDialog("close", "");
      switch (true) {
        case dice <= 10:
          setLooting(false);
          renderDialog("loading", "적과 마주칩니다.");
          setTimeout(() => {
            renderDialog("close", "");
            findCtrl("auto");
          }, 1000);
          break;
        case dice <= 20:
          setLooting(true);
          break;
        default:
          setLooting(false);
          renderDialog("open", "아이템을 찾지 못했습니다.");
          break;
      }
      // if (dice <= 20) {
      //   setLooting(true);
      // } else {
      //   setLooting(false)
      //   renderDialog("open", "아이템을 찾지 못했습니다.");
      // }
    }, 1000);
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
  // findCtrl
  const findCtrl = (v) => {
    const newValue = v;
    setFind(newValue);
    localStorage.setItem("Find", newValue);
  }
  // activeFind
  const activeFind = () => {
    if (hp > 1) {
      hpCtrl(-1);
      itemCtrl();
    } else {
      renderDialog("open", "체력이 없습니다.");
    }
  } 
  // reSet 
  const reSet = () => {
    setGameResult("");
    setDiceBuff(0);
  }
  // rederDialog
  const renderDialog = (state, msg) => {
    setDialog(msg);
    if (state === "open") {
      setDialogClass("open"); // 클래스 상태 업데이트
    } else if (state === "loading") {
      setDialogClass("loading"); // 클래스 상태 업데이트
    } else {
      setDialogClass("");
    }
  }
  return (
    <div>
      {/* <div className={`Avatar-preview ${profile.head} ${profile.eyes} ${profile.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div> */}
      <div className={`dialog-wrap ${dialogClass}`}>
        <div className="dialog">
          {dialog}
          { dialogClass ==="open" &&  <button onClick={() => renderDialog("close", "")}>확인</button> }
        </div>
      </div>
      <div className="stage-wrap">
        <div className="stage">
          <div className={`enemy ${enemyWalk}`}></div>
          <div className={`before ${stageN1}`}>{stageN1}</div>
          <div className={`curent ${stageCurent}`}>{stageCurent}</div>
          <div className={stageP1}>{stageP1}</div>
          <div className={stageP2}>{stageP2}</div>
        </div>
      </div>
      <div className={`hp-bar ${hpCurent}`}>
        {Array.from({ length: maxHp }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
      <div className="d-flex">
        <div>stage: {stage}</div>
        <div>hp: {hp} / {maxHp}</div>
        <div>dice: {diceCount}</div>
        <div>enemy: {enemyDiceCount}</div>
      </div>
      {/* <button onClick={() => renderDialog("open", `Open Dialog Test`)}>Open Dialog</button> */}
      <button onClick={() => setCurrentPage("main")}>메인으로</button>
      {find === "" &&
      <button onClick={activeFind}>find</button>
      }
      {find === "" &&
      <button onClick={() => findCtrl("enemy")}>next</button>
      }
      <Inventory
        hpCtrl={hpCtrl}
        diceUp={diceUp}
        diceEquip={diceEquip}
        looting={looting}
        setLooting={setLooting}
        profile={profile}
      />
      {/* dice */}
      {find !== "" &&
      <div className="intro">
        <div className="ground">
          <Dice
            hpCtrl={hpCtrl}
            diceCount={diceCount}
            setDiceCount={setDiceCount}
            enemyDiceCount={enemyDiceCount}
            setGameResult={setGameResult}
            stageCtrl={stageCtrl}
            diceBuff={diceBuff}
            enemyCtrl={enemyCtrl}
            setLooting={setLooting}
            findCtrl={findCtrl}
          />
        </div>
      </div>
      }
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
