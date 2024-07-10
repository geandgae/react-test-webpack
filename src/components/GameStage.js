import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import Inventory from "./Inventory";
import DialogComponent from "./Dialog";
// store
import { useAppState, useAppDispatch, actionTypes } from '../store/Store';

const GameStage = () => {

  // store
  const { profile, stage, environments, confirmed, gameResult, bless, rword } = useAppState();
  const { dispatch, setCurrentPage, renderDialog, setConfirmed, setLooting, setGameResult, setBless } = useAppDispatch();

  // GameStage prop
  const [maxHp, setMaxHp] = useState(profile.vit);
  const [hp, setHp] = useState(maxHp);
  const [diceCount, setDiceCount] = useState(profile.str);
  const [diceCountEnemy, setDiceCountEnemy] = useState(1);
  const [diceBuff, setDiceBuff] = useState(0);
  const [maxItems, setMaxItems] = useState(profile.inv);
  
  // GameStage only
  const [find, setFind] = useState("");
  const [rewardChk, setRewardChk] = useState("true");

  // ui 상태 class
  const stageN1 = (parseInt(stage, 10) - 1);
  const stageP1 = (parseInt(stage, 10) + 1);
  const stageP2 = (parseInt(stage, 10) + 2);
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
        return `${rword.env0}에 진입했습니다.(find ${rword.hp}소모 -0)`
      }
      if (environments[stage] === 1) {
        return `${rword.env1}에 진입했습니다.(find ${rword.hp}소모 -1)`
      }
      if (environments[stage] === 2) {
        return `${rword.env2}에 진입했습니다.(find ${rword.hp}소모 -2)`
      }
      if (environments[stage] === 3) {
        return `${rword.env3}에 진입했습니다.(find ${rword.hp}소모 -3)`
      }
      if (environments[stage] === 4) {
        return `${rword.env4}에 진입했습니다.(find ${rword.hp}소모 -4)`
      }
      if (environments[stage] === 5) {
        return `${rword.env5}에 진입했습니다.(find ${rword.hp}소모 -5)`
      }
      if (environments[stage] === 6) {
        return `${rword.env6}에 진입했습니다.(find ${rword.hp}소모 -6)`
      }
    }
    switch (true) { 
      case stage % 5 === 0:
        ctrlFind("reward");
        renderDialog("open", `${rword.reward}단계에 진입했습니다.`);
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
        renderDialog("open", `${rword.hp}이 없습니다.`);
      }
    }
  }, [confirmed]);

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
      if (stage >= 300) {
        enemyDiceUp(5);
      } else if (stage >= 200) {
        enemyDiceUp(4);
      } else if (stage >= 100) {
        enemyDiceUp(3);
      } else if (stage >= 50) {
        enemyDiceUp(2);
      } else {
        enemyDiceUp(1);
      }
    }
  };
  // ctrlMaxHp
  const ctrlMaxHp = (v) => {
    renderDialog("open", `최대${rword.hp}이 ${v} 증가합니다.`);
    const newValue = (parseInt(maxHp, 10) + v);
    setHp(newValue);
    setMaxHp(newValue)
    localStorage.setItem("hp", newValue);
    localStorage.setItem("maxHp", newValue);
  };
  // ctrlHp
  const ctrlHp = (v, use) => {
    if (use === "use") {
      renderDialog("open", `${rword.hp}을 ${v} ${rword.heal}합니다.`);
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
    renderDialog("open", `${rword.inven}이 ${v} 증가합니다.`);
    const newValue = (parseInt(maxItems, 10) + v);
    setMaxItems(newValue);
    localStorage.setItem("maxItems", newValue);
  };
  // ctrlItem
  const ctrlItem = () => {
    const dice = Math.floor(Math.random() * 100) + 1;
    renderDialog("loading", `${rword.item}을 찾는중입니다.`);
    setTimeout(() => {
      renderDialog(null);
      switch (true) {
        case dice <= 25:
          renderDialog("open", `${rword.bless}을 발견했습니다 보정값이 1 오릅니다.`);
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
          renderDialog("loading", `${rword.item}을 발견했습니다.`);
          setTimeout(() => {
            renderDialog(null);
            setLooting(true);
            ctrlFind("finded");
          }, 1000);
          break;
        default:
          renderDialog("open", `${rword.item}을 찾지 못했습니다.`);
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
    renderDialog("confirm", `탐색에는 ${rword.hp}을 ${v}만큼 잃습니다. 괜찮습니까?`);
  };

  // buffDiceUp
  const buffDiceUp = (v) => {
    renderDialog("open", `${rword.turn} ${rword.dice}를 ${v}만큼늘립니다.`);
    const newValue = (parseInt(diceBuff, 10) + v);
    if (newValue <= 10) {
      setDiceBuff(newValue);
    } else {
      setDiceBuff(10);
      renderDialog("open", `${rword.turn} 늘릴 수 있는 ${rword.dice}가 최대치입니다.`);
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
        renderDialog("open", `${rword.dice}를 얻습니다.`);
        equipDice(1);
      } else if (dice <= 45) {
        ctrlMaxHp(1);
      } else if (dice <= 70) {
        ctrlInven(1);
      } else {
        renderDialog("open", `${rword.hp}을 모두 ${rword.heal}합니다.`);
        ctrlHp(maxHp);
      }
      setRewardChk("false");
      localStorage.setItem("rewardChk", "false");
    } else {
      renderDialog("open", `이미 ${rword.reward}을 얻었습니다.`);
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
  // console.log(`gameResult: ${gameResult}, find: ${find}`);

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
          <div className="stay"></div>
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
        <div>{rword.hp}: {hp} / {maxHp}</div>
        <div>enemy: {diceCountEnemy}</div>
      </div>
      <div className="d-flex">
        <div>{rword.dice}: {diceCount}</div>
        <div>buff: {diceBuff}</div>
        <div>bless: {bless}</div>
      </div>
      {/* <button onClick={() => ctrlInven(1)}>invtest</button> */}
      {/* <button onClick={() => ctrlHp(maxHp)}>restore</button> */}
      {/* <button onClick={() => renderDialog("loading", "loading")}>loading</button> */}
      {/* <button onClick={() => renderDialog("open", "open")}>open</button> */}
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
        ctrlMaxHp={ctrlMaxHp}
        ctrlInven={ctrlInven}
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
