import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";
import DialogComponent from "./dialog";
// store
import { useAppState, useAppDispatch, actionTypes } from '../store/Store';

const GameStage = ({ profile, stage, setStage, environments }) => {

  // store
  const { setCurrentPage } = useAppDispatch();

  const [maxHp, setMaxHp] = useState(profile.vit);
  const [hp, setHp] = useState(maxHp);
  const [diceCount, setDiceCount] = useState(profile.str);
  const [diceBuff, setDiceBuff] = useState(0);
  const [enemyDiceCount, setEnemyDiceCount] = useState(1);
  const [gameResult, setGameResult] = useState("");
  const [enemyStep, setEnemyStep] = useState(0);
  const [looting, setLooting] = useState(false);
  const [dialog, setDialog] = useState("");
  const [find, setFind] = useState("");
  const [maxItems, setMaxItems] = useState(profile.inv);
  const [rewardChk, setRewardChk] = useState("true");
  const [confirmed, setConfirmed] = useState("");

  const stageCurrent = stage;
  const stageN1 = (parseInt(stage, 10) - 1);
  const stageP1 = (parseInt(stage, 10) + 1);
  const stageP2 = (parseInt(stage, 10) + 2);
  const enemyWalk = `step-${enemyStep}`;
  const hpCurrent = `hp-${hp}`
  
  // console.log(`enemyStep : ${enemyStep}`);
  console.log(`find : ${find}`);
  console.log(`rewardChk : ${rewardChk}`);
  console.log(`gameResult : ${gameResult}`);

  useEffect(() => {
    // HP
    const savedHp = localStorage.getItem("hp");
    if (savedHp) {
      setHp(parseInt(savedHp, 10));
    }

    // MaxHP
    const savedMaxHp = localStorage.getItem("maxHp");
    if (savedMaxHp) {
      setMaxHp(parseInt(savedMaxHp, 10));
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

    // maxItems
    const savedMaxItems = localStorage.getItem("maxItems");
    if (savedMaxItems) {
      setMaxItems(parseInt(savedMaxItems, 10));
    }

    // enemyStep
    const savedEnemyStep = localStorage.getItem("enemyStep");
    if (savedEnemyStep) {
      setEnemyStep(parseInt(savedEnemyStep, 10));
    }

    // find
    const savedFind = localStorage.getItem("find");
    if (savedFind) {
      setFind(savedFind);
    }

    // rewardChk
    const savedRewardChk = localStorage.getItem("rewardChk");
    if (savedRewardChk) {
      setRewardChk(savedRewardChk);
    }

    // gameResult
    const savedGameResult = localStorage.getItem("gameResult");
    if (savedGameResult) {
      setGameResult(savedGameResult);
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

  // stage 안내
  useEffect(() => {
    const replaceEnv = () => {
      if (environments[stageCurrent] === 0) {
        return "환경0에 진입했습니다.(find 체력소모 없음)"
      }
      if (environments[stageCurrent] === 1) {
        return "환경1에 진입했습니다.(find 체력소모 -1)"
      }
      if (environments[stageCurrent] === 2) {
        return "환경2에 진입했습니다.(find 체력소모 -2)"
      }
      if (environments[stageCurrent] === 3) {
        return "환경3에 진입했습니다.(find 체력소모 -3)"
      }
      if (environments[stageCurrent] === 4) {
        return "환경4에 진입했습니다.(find 체력소모 -4)"
      }
      if (environments[stageCurrent] === 5) {
        return "환경5에 진입했습니다.(find 체력소모 -5)"
      }
      if (environments[stageCurrent] === 6) {
        return "환경6에 진입했습니다.(find 체력소모 -6)"
      }
    }
    switch (true) { 
      case stage % 5 === 0:
        findCtrl("reward");
        renderDialog("open", "보상단계에 진입했습니다.");
        break;
      default:
        renderDialog("open", replaceEnv());
    }
  }, [stage]);

  // clearCtrl
  const clearCtrl = (v) => {
    const newValue = v;
    setGameResult(newValue);
    localStorage.setItem("gameResult", newValue);
  };
  // rewardCtrl
  const rewardCtrl = (v) => {
    const newValue = v;
    setRewardChk(newValue);
    localStorage.setItem("rewardChk", newValue);
  };
  // stageCtrl
  const stageCtrl = (v = 1) => {
    const newValue = (parseInt(stage, 10) + v);
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
  // maxHp
  const maxHpCtrl = (v) => {
    const newValue = (parseInt(maxHp, 10) + v);
    setHp(newValue);
    setMaxHp(newValue)
    localStorage.setItem("hp", newValue);
    localStorage.setItem("maxHp", newValue);
  };
  // hpCtrl
  const hpCtrl = (v , use) => {
    if (use === "use") {
      renderDialog("open", `체력을 ${v} 회복합니다.`);
    }
    const newValue = (parseInt(hp, 10) + v);
    if (newValue <= maxHp) {
      setHp(newValue);
      localStorage.setItem("hp", newValue);
    } else {
      setHp(maxHp);
      localStorage.setItem("hp", maxHp);
    }
    if (newValue <= 0) {
      console.log("gameover");
      setCurrentPage("gameover");
    }
  };
  // diceUp
  const diceUp = (v) => {
    renderDialog("open", "1턴 동안 주사위를 늘립니다.");
    const newValue = (parseInt(diceBuff, 10) + v);
    if (newValue <= 5) {
      setDiceBuff(newValue);
    } else {
      setDiceBuff(5);
      renderDialog("open", "최대치입니다.");
    }
  };
  // diceEquip 
  const diceEquip = (v) => {
    const newValue = (parseInt(diceCount, 10) + v);
    setDiceCount(newValue);
    localStorage.setItem("diceCount", newValue);
  };
  // invenCtrl
  const invenCtrl = (v) => {
    const newValue = (parseInt(maxItems, 10) + v);
    setMaxItems(newValue);
    localStorage.setItem("maxItems", newValue);
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
    renderDialog("loading", "아이템을 찾는중입니다.");
    setTimeout(() => {
      renderDialog(null);
      switch (true) {
        case dice <= 30:
          setLooting(false);
          renderDialog("loading", "적과 마주칩니다.");
          setTimeout(() => {
            renderDialog(null);
            findCtrl("enemy");
          }, 1000);
          break;
        case dice <= 50:
          setLooting(true);
          break;
        default:
          setLooting(false);
          renderDialog("open", "아이템을 찾지 못했습니다.");
          break;
      }
    }, 1000);
  };
  // enemyCtrl
  const enemyCtrl = (v) => {
    const newValue = (parseInt(enemyStep, 10) + v);
    if (newValue <= 0) {
      setEnemyStep(0);
    } else {
      setEnemyStep(newValue);
    }
    localStorage.setItem("enemyStep", newValue);
  };
  // findCtrl
  const findCtrl = (v) => {
    const newValue = v;
    setFind(newValue);
    localStorage.setItem("find", newValue);
  };
  // activeFind
  useEffect(() => {
    if (confirmed === "confirmed") {
      const int = (parseInt(environments[stageCurrent], 10));
      if (hp > (int)) {
        hpCtrl(-int);
        itemCtrl();
        setConfirmed("");
      } else {
        setConfirmed("");
        renderDialog("open", "체력이 없습니다.");
      }
    }
  }, [confirmed]);
  const activeFind = (v) => {
    renderDialog("confirm", `탐색에는 체력을 ${v}만큼 잃습니다. 괜찮습니까?`);
  };
  
  // reward
  const reward = () => {
    const dice = Math.floor(Math.random() * 100) + 1;
    if (rewardChk === "true") {
      switch (true) {
        case dice <= 10:
          renderDialog("open", "주사위를 얻습니다.");
          rewardCtrl("false");
          findCtrl("");
          diceEquip(1);
          break;
        case dice <= 25:
          renderDialog("open", "최대체력이 1 증가합니다.");
          rewardCtrl("false");
          findCtrl("");
          maxHpCtrl(1);
          break;
        case dice <= 45:
          renderDialog("open", "가방을 얻습니다.");
          rewardCtrl("false");
          findCtrl("");
          invenCtrl(1);
          break;
        default:
          renderDialog("open", "체력을 모두 회복합니다.");
          rewardCtrl("false");
          findCtrl("");
          hpCtrl(maxHp);
          break;
      }
    } else {
      renderDialog("open", "이미 보상을 얻었습니다.");
      findCtrl("");
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
  };
  // onConfirm
  const onConfirm = (v) => {
    setConfirmed(v);
    renderDialog(null);
  };
  // nextStage 
  const nextStage = () => {
    clearCtrl(null);
    rewardCtrl("true");
    stageCtrl();
  };
  


  return (
    <div>
      <DialogComponent
        dialogMsg={dialog.message}
        dialogClass={dialog.class}
        renderDialog={renderDialog}
        onConfirm={onConfirm}
      />
      
      <div className={`Avatar-preview only-stage ${profile.head} ${profile.eyes} ${profile.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div>

      <div className="stage-wrap">
        <div className="stage">
          <div className={`enemy ${enemyWalk}`}></div>
          <div className={`before stage-${stageN1} env-${environments[stageN1]}`}>stage-{stageN1} env-{environments[stageN1]}</div>
          <div className={`current stage-${stageCurrent} env-${environments[stageCurrent]}`}>stage-{stageCurrent} env-{environments[stageCurrent]}</div>
          <div className={`stage-${stageP1} env-${environments[stageP1]}`}>stage-{stageP1} env-{environments[stageP1]}</div>
          <div className={`stage-${stageP2} env-${environments[stageP2]}`}>stage-{stageP2} env-{environments[stageP2]}</div>
        </div>
      </div>
      
      <div className={`hp-bar ${hpCurrent}`}>
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
      {/* <button onClick={() => stageCtrl()}>sttest</button> */}
      {/* <button onClick={() => invenCtrl(1)}>invtest</button> */}
      {/* <button onClick={() => hpCtrl(maxHp)}>restore</button> */}
      {/* <button onClick={() => renderDialog("open", "open")}>open</button> */}
      {/* <button onClick={() => renderDialog("loading", "loading")}>loading</button> */}
      {/* <button onClick={() => renderDialog("confirm", "test")}>confirm</button> */}
      <button onClick={() => setCurrentPage("main")}>메인으로</button>
      {find === "" && gameResult !== "win" &&
      <button onClick={() => activeFind(environments[stageCurrent])}>find</button>
      }
      {find === "" && gameResult !== "win" &&
      <button onClick={() => findCtrl("enemy")}>battle</button>
      }
      {gameResult === "win" && 
      <button onClick={nextStage}>next</button>
      }
      {find === "reward" &&
      <button onClick={reward}>reward</button>
      }
      <Inventory
        hpCtrl={hpCtrl}
        diceUp={diceUp}
        diceEquip={diceEquip}
        looting={looting}
        setLooting={setLooting}
        maxItems={maxItems}
      />
      {/* dice */}
      {find == "enemy" &&
      <div className="intro">
        <div className="ground">
          <Dice
            dialog={dialog}
            setDialog={setDialog}
            hpCtrl={hpCtrl}
            diceCount={diceCount}
            setDiceCount={setDiceCount}
            enemyDiceCount={enemyDiceCount}
            stageCtrl={stageCtrl}
            diceBuff={diceBuff}
            enemyCtrl={enemyCtrl}
            setLooting={setLooting}
            findCtrl={findCtrl}
            clearCtrl={clearCtrl}
            setDiceBuff={setDiceBuff}
          />
        </div>
      </div>
      }
    </div>
  );
};

export default GameStage;
