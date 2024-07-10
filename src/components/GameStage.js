import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";
import DialogComponent from "./Dialog";
// store
import { useAppState, useAppDispatch, actionTypes } from '../store/Store';

const GameStage = () => {

  // store
  const { profile, stage, environments, confirmed, gameResult, bless } = useAppState();
  const { dispatch, setCurrentPage, renderDialog, setConfirmed, setLooting, setGameResult, setBless } = useAppDispatch();

  // GameStage prop
  const [maxHp, setMaxHp] = useState(profile.vit);
  const [hp, setHp] = useState(maxHp);
  const [diceCount, setDiceCount] = useState(profile.str);
  const [diceCountEnemy, setDiceCountEnemy] = useState(1);
  const [diceBuff, setDiceBuff] = useState(0);
  const [maxItems, setMaxItems] = useState(profile.inv);
  
  // GameStage only
  const [enemyStep, setEnemyStep] = useState(0);
  const [find, setFind] = useState("");
  const [rewardChk, setRewardChk] = useState("true");

  // ui 상태 class
  const stageN1 = (parseInt(stage, 10) - 1);
  const stageP1 = (parseInt(stage, 10) + 1);
  const stageP2 = (parseInt(stage, 10) + 2);
  const enemyWalk = `step-${enemyStep}`;
  const hpCurrent = `hp-${hp}`
  
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

    // diceCountEnemy
    const savedDiceCountEnemy = localStorage.getItem("diceCountEnemy");
    if (savedDiceCountEnemy) {
      setDiceCountEnemy(parseInt(savedDiceCountEnemy, 10));
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
  }, []);

  // stage 안내
  useEffect(() => {
    const replaceEnv = () => {
      if (environments[stage] === 0) {
        return "환경0에 진입했습니다.(find 체력소모 없음)"
      }
      if (environments[stage] === 1) {
        return "환경1에 진입했습니다.(find 체력소모 -1)"
      }
      if (environments[stage] === 2) {
        return "환경2에 진입했습니다.(find 체력소모 -2)"
      }
      if (environments[stage] === 3) {
        return "환경3에 진입했습니다.(find 체력소모 -3)"
      }
      if (environments[stage] === 4) {
        return "환경4에 진입했습니다.(find 체력소모 -4)"
      }
      if (environments[stage] === 5) {
        return "환경5에 진입했습니다.(find 체력소모 -5)"
      }
      if (environments[stage] === 6) {
        return "환경6에 진입했습니다.(find 체력소모 -6)"
      }
    }
    switch (true) { 
      case stage % 5 === 0:
        ctrlFind("reward");
        renderDialog("open", "보상단계에 진입했습니다.");
        break;
      default:
        renderDialog("open", replaceEnv());
    }
  }, [stage]);

  // dialog confirm
  useEffect(() => {
    if (confirmed === "confirm") {
      const int = (parseInt(environments[stage], 10));
      if (hp > (int)) {
        ctrlHp(-int);
        ctrlItem();
        setConfirmed();
      } else {
        setConfirmed();
        renderDialog("open", "체력이 없습니다.");
      }
    }
  }, [confirmed]);

  // enemy 버그 확인
  useEffect(() => {
    if (enemyStep === 3) {
      ctrlHp(-3);
      setTimeout(() => {
        ctrlEnemy(-3);
      }, 2000);
    } else if (enemyStep >= 4) {
      setTimeout(() => {
        ctrlEnemy(-3);
      }, 2000);
    }
  }, [enemyStep]);

  // ctrlEnemy
  const ctrlEnemy = (v) => {
    const newValue = (parseInt(enemyStep, 10) + v);
    if (newValue <= 0) {
      setEnemyStep(0);
    } else {
      setEnemyStep(newValue);
    }
    localStorage.setItem("enemyStep", newValue);
  };
  // ctrlReward
  const ctrlReward = (v) => {
    const newValue = v;
    setRewardChk(newValue);
    localStorage.setItem("rewardChk", newValue);
  };
  // ctrlStage
  const ctrlStage = (v = 1) => {
    const newValue = (parseInt(stage, 10) + v);
    dispatch({ type: actionTypes.SET_STAGE, payload: newValue });
    localStorage.setItem("stage", newValue);
    // 5의 배수마다 주사위 추가
    if (stage % 5 === 0) {
      if (stage >= 100) {
          enemyDiceUp(3);
      } else if (stage >= 50) {
          enemyDiceUp(2);
      } else {
          enemyDiceUp(1);
      }
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
  // ctrlMaxHp
  const ctrlMaxHp = (v) => {
    const newValue = (parseInt(maxHp, 10) + v);
    setHp(newValue);
    setMaxHp(newValue)
    localStorage.setItem("hp", newValue);
    localStorage.setItem("maxHp", newValue);
  };
  // ctrlHp
  const ctrlHp = (v , use) => {
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
      setCurrentPage("gameover");
    }
  };
  // ctrlInven
  const ctrlInven = (v) => {
    const newValue = (parseInt(maxItems, 10) + v);
    setMaxItems(newValue);
    localStorage.setItem("maxItems", newValue);
  };
  // ctrlItem
  const ctrlItem = () => {
    const dice = Math.floor(Math.random() * 100) + 1;
    renderDialog("loading", "아이템을 찾는중입니다.");
    setTimeout(() => {
      renderDialog(null);
      switch (true) {
        case dice <= 25:
          renderDialog("open", "신단을 발견했습니다 보정값이 1 오릅니다.");
          setBless(1);
          ctrlFind("finded");
          break;
        case dice <= 50:
          renderDialog("loading", "적과 마주칩니다.");
          setTimeout(() => {
            renderDialog(null);
            ctrlFind("enemy");
          }, 1000);
          break;
        case dice <= 80:
          renderDialog("loading", "아이템을 발견했습니다.");
          setTimeout(() => {
            renderDialog(null);
            setLooting(true);
            ctrlFind("finded");
          }, 1000);
          break;
        default:
          renderDialog("open", "아이템을 찾지 못했습니다.");
          break;
      }
    }, 1000);
  };
  // ctrlFind
  const ctrlFind = (v) => {
    setFind(v);
    localStorage.setItem("find", v);
  };
  // activeFind
  const activeFind = (v) => {
    setGameResult(null);
    renderDialog("confirm", `탐색에는 체력을 ${v}만큼 잃습니다. 괜찮습니까?`);
  };

  // buffDiceUp
  const buffDiceUp = (v) => {
    renderDialog("open", "1턴 동안 주사위를 늘립니다.");
    const newValue = (parseInt(diceBuff, 10) + v);
    if (newValue <= 10) {
      setDiceBuff(newValue);
    } else {
      setDiceBuff(10);
      renderDialog("open", "최대치입니다.");
    }
  };
  // enemyDiceUp
  const enemyDiceUp = (v) => {
    const newValue = diceCountEnemy + v;
    setDiceCountEnemy(newValue);
    localStorage.setItem("diceCountEnemy", newValue);
  };
  // equipDice
  const equipDice = (v) => {
    const newValue = (parseInt(diceCount, 10) + v);
    setDiceCount(newValue);
    localStorage.setItem("diceCount", newValue);
  };
  
  // reward
  const reward = () => {
    if (rewardChk === "true") {
      const dice = Math.floor(Math.random() * 100) + 1;
      if (dice <= 20) {
        renderDialog("open", "주사위를 얻습니다.");
        equipDice(1);
      } else if (dice <= 45) {
        renderDialog("open", "최대체력이 1 증가합니다.");
        ctrlMaxHp(1);
      } else if (dice <= 70) {
        renderDialog("open", "가방을 얻습니다.");
        ctrlInven(1);
      } else {
        renderDialog("open", "체력을 모두 회복합니다.");
        ctrlHp(maxHp);
      }
      setRewardChk("false");
      localStorage.setItem("rewardChk", "false");
    } else {
      renderDialog("open", "이미 보상을 얻었습니다.");
    }
    ctrlFind("");
  };

  const battleStage = () => {
    setGameResult(null);
    ctrlFind("enemy");
  };

  // nextStage 
  const nextStage = () => {
    setGameResult(null);
    ctrlReward("true");
    ctrlStage();
  };

  
  // debug
  console.log(`gameResult: ${gameResult}, find: ${find}`);

  return (
    <div>
      <DialogComponent/>
      
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
          <div className={`current stage-${stage} env-${environments[stage]}`}>stage-{stage} env-{environments[stage]}</div>
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
        <div>enemy: {diceCountEnemy}</div>
      </div>
      <div className="d-flex">
        <div>dice: {diceCount}</div>
        <div>buff: {diceBuff}</div>
        <div>bless: {bless}</div>
      </div>
      {/* <button onClick={() => ctrlInven(1)}>invtest</button> */}
      {/* <button onClick={() => ctrlHp(maxHp)}>restore</button> */}
      {/* <button onClick={() => renderDialog("loading", "loading")}>loading</button> */}
      {/* <button onClick={() => renderDialog("open", "open")}>open</button> */}
      {/* <button onClick={() => renderDialog("confirm", "test")}>confirm</button> */}
      {/* <button onClick={() => renderDialog("confirm", "test")}>confirm</button> */}
      <button onClick={() => setLooting(true)}>loot</button>
      {/* <button onClick={() => ctrlStage()}>sttest</button> */}
      {/* <button onClick={() => ctrlHp(-maxHp)}>end</button> */}
      <button onClick={() => setCurrentPage("main")}>메인으로</button>
      {find !== "reward" && find !== "finded" && gameResult !== "win" &&
      <button onClick={() => activeFind(environments[stage])}>find</button>
      }
      {find !== "reward" && gameResult !== "win" &&
      <button onClick={battleStage}>battle</button>
      }
      {gameResult === "win" && 
      <button onClick={nextStage}>next</button>
      }
      {find === "reward" &&
      <button onClick={reward}>reward</button>
      }
      <Inventory
        ctrlHp={ctrlHp}
        buffDiceUp={buffDiceUp}
        equipDice={equipDice}
        maxItems={maxItems}
      />
      {/* dice */}
      {find == "enemy" &&
      <div className="intro">
        <div className="ground">
          <Dice
            ctrlHp={ctrlHp}
            diceCount={diceCount}
            setDiceCount={setDiceCount}
            diceCountEnemy={diceCountEnemy}
            diceBuff={diceBuff}
            ctrlEnemy={ctrlEnemy}
            ctrlFind={ctrlFind}
            setDiceBuff={setDiceBuff}
          />
        </div>
      </div>
      }
    </div>
  );
};

export default GameStage;
