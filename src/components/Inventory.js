import React, { useState, useEffect } from "react";
import DialogComponent from "./Dialog";
// store
import { useAppState, useAppDispatch } from '../store/Store';

const Inventory = ({ ctrlHp, ctrlMaxHp, ctrlInven, buffDiceUp, equipDice, maxItems }) => {
  // store
  const { looting, rword } = useAppState();
  const { setLooting, renderDialog, setBless } = useAppDispatch();

  const [items, setItems] = useState([]);
  const [itemsMsg, setItemsMsg] = useState();
  const [itemsIcon, setItemsIcon] = useState();
  const [equippedItems, setEquippedItems] = useState(() => {
    const saved = localStorage.getItem('equippedItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("inventory")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    // equippedItems이 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem('equippedItems', JSON.stringify(equippedItems));
  }, [equippedItems]);

  // 아이템 저장
  const addItem = () => {
    if (items.length >= maxItems) {
      setItemsIcon("item-icon item-max");
      setItemsMsg(`${rword.inven}에는 최대 ${maxItems}개의 ${rword.item}만 저장할 수 있습니다.`);
      return;
    }

    const { randomItem, name, description, type, icon } = generateUniqueName();

    const newItem = {
      id: Date.now(),
      code: randomItem,
      name: name,
      description: description,
      type: type,
      icon: icon,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    setItemsIcon(newItem.icon);
    setItemsMsg(`${newItem.name}을 얻었습니다.`);
  };

  // 이아템 테이블 생성
  const generateUniqueName = () => {
    // 아이템 타입 결정 
    const diceType = Math.floor(Math.random() * 100) + 1;
    const type = diceType <= 10 ? "equipment" : "normal";
    // const type = diceType <= 1 ? "elixir" : diceType <= 11 ? "equipment" : "normal";
    
    console.log(`diceType: ${diceType}, type:${type}`);

    // 아이템 테이블 결정
    const getItemList = (type, diceItem) => {
      let itemList;
      switch (type) {
        // equipment
        case "equipment":
          switch (true) {
            case diceItem <= 50:
              itemList = ["DICE001"];
              break;
            case diceItem <= 70:
              itemList = ["DICE002"];
              break;
            case diceItem <= 85:
              itemList = ["DICE003"];
              break;
            case diceItem <= 95:
              itemList = ["DICE004"];
              break;  
            default:
              itemList = ["DICE005"];
              break;
          }
          break;
        // normal
        case "normal":
          switch (true) {
            case diceItem <= 60:
              itemList = ["HEAL001", "HEAL002", "BUFF001", "BUFF002"];
              break;
            case diceItem <= 90:
              itemList = ["HEAL003", "HEAL004", "BUFF003"];
              break;
            case diceItem <= 98:
              itemList = ["HEAL005", "BUFF004", "BUFF005"];
              break;
            default:
              itemList = ["ELIX001", "ELIX002", "ELIX003"];
              break;
          }
          break;
        // default
        default:
          itemList = [];
          break;
      }
      return itemList;
    };
    const diceItem = Math.floor(Math.random() * 100) + 1;
    const itemList = getItemList(type, diceItem);
    // const itemTables = {
    //   equipment: diceItem <= 70 ? ["DICE001"] : diceItem <= 90 ? ["DICE002"] : ["DICE003"],
    //   normal: diceItem <= 65 ? ["HEAL001", "HEAL002", "HEAL003"] : ["BUFF001", "BUFF002", "BUFF003"],
    // };
    // const itemList = itemTables[type];
    
    // 아이템 설명, 이름, 아이콘 매핑
    const randomIndex = Math.floor(Math.random() * itemList.length);
    const randomItem = itemList[randomIndex];

    const itemDetails = {
      // HEAL
      "HEAL001": { name: "heal1", description: `${rword.hp} 1 ${rword.heal}`, icon: "item-icon item-heal001" },
      "HEAL002": { name: "heal2", description: `${rword.hp} 2 ${rword.heal}`, icon: "item-icon item-heal002" },
      "HEAL003": { name: "heal3", description: `${rword.hp} 3 ${rword.heal}`, icon: "item-icon item-heal003" },
      "HEAL004": { name: "heal4", description: `${rword.hp} 4 ${rword.heal}`, icon: "item-icon item-heal004" },
      "HEAL005": { name: "heal5", description: `${rword.hp} 5 ${rword.heal}`, icon: "item-icon item-heal005" },
      // BUFF
      "BUFF001": { name: "buff1", description: `${rword.turn} ${rword.dice} + 1`, icon: "item-icon item-buff001" },
      "BUFF002": { name: "buff2", description: `${rword.turn} ${rword.dice} + 2`, icon: "item-icon item-buff002" },
      "BUFF003": { name: "buff3", description: `${rword.turn} ${rword.dice} + 3`, icon: "item-icon item-buff003" },
      "BUFF004": { name: "buff4", description: `${rword.turn} ${rword.dice} + 4`, icon: "item-icon item-buff004" },
      "BUFF005": { name: "buff5", description: `${rword.turn} ${rword.dice} + 5`, icon: "item-icon item-buff005" },
      // ELIX
      "ELIX001": { name: "elix1", description: `사용하면 최대${rword.hp} + 1`, icon: "item-icon item-elix001" },
      "ELIX002": { name: "elix2", description: `사용하면 ${rword.inven} + 1`, icon: "item-icon item-elix002" },
      "ELIX003": { name: "elix3", description: `사용하면 축복 + 1`, icon: "item-icon item-elix003" },
      // DICE
      "DICE001": { name: "dice1", description: `${rword.equip}하면 ${rword.dice} + 1`, icon: "item-icon item-dice001" },
      "DICE002": { name: "dice2", description: `${rword.equip}하면 ${rword.dice} + 2`, icon: "item-icon item-dice002" },
      "DICE003": { name: "dice3", description: `${rword.equip}하면 ${rword.dice} + 3`, icon: "item-icon item-dice003" },
      "DICE004": { name: "dice4", description: `${rword.equip}하면 ${rword.dice} + 4`, icon: "item-icon item-dice004" },
      "DICE005": { name: "dice5", description: `${rword.equip}하면 ${rword.dice} + 5`, icon: "item-icon item-dice005" },
    };
    // debug
    console.log(`diceItem: ${diceItem}, itemList: ${itemList}`);

    const { name, description, icon } = itemDetails[randomItem] || { name: "---", description: "---", icon: "item-icon" };
    return { randomItem, name, description, type, icon };
  };

  // 아이템 사용
  const useItem = (id, code) => {
    // 아이템 목록 업데이트
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    // 아이템 효과 매핑
    const itemEffects = {
      // HEAL000
      "HEAL001": () => ctrlHp(1, "use"),
      "HEAL002": () => ctrlHp(2, "use"),
      "HEAL003": () => ctrlHp(3, "use"),
      "HEAL004": () => ctrlHp(4, "use"),
      "HEAL005": () => ctrlHp(5, "use"),
      // BUFF000
      "BUFF001": () => buffDiceUp(1),
      "BUFF002": () => buffDiceUp(2),
      "BUFF003": () => buffDiceUp(3),
      "BUFF004": () => buffDiceUp(4),
      "BUFF005": () => buffDiceUp(5),
      // ELIX
      "ELIX001": () => ctrlMaxHp(1),
      "ELIX002": () => ctrlInven(1),
      "ELIX003": () => {
        renderDialog("open", `축복을 받아 보정값이 1 오릅니다.`);
        setBless(1);
      },
    };
    // 아이템 효과 적용
    if (itemEffects[code]) {
      itemEffects[code]();
    }
  };

  // equippedItems 저장/삭제
  const equipItem = (item) => {
    // const item = { id, name, description, type, icon };

    if (equippedItems.some(equippedItem => equippedItem.id === item.id)) {
      // equippedItem.id가 이미 있으면 삭제
      // setEquippedItems(prev => prev.filter(equippedItem => equippedItem.id !== id));

      if (items.length >= maxItems) {
        renderDialog("open", `${rword.equip}에는 최대 ${maxItems}개의 ${rword.item}만 저장할 수 있습니다.`);
        return;
      }
      
      const updatedEquippedItems = equippedItems.filter(equippedItem => equippedItem.id !== item.id);
      setEquippedItems(updatedEquippedItems);
      setItems(prev => [...prev, item]);
      localStorage.setItem("equippedItems", JSON.stringify(updatedEquippedItems));
      localStorage.setItem("inventory", JSON.stringify([...items, item]));

      if (item.code === "DICE001") {
        renderDialog("open", `${item.name} ${rword.clear}합니다.`);
        equipDice(-1);
      }
      if (item.code === "DICE002") {
        renderDialog("open", `${item.name} ${rword.clear}합니다.`);
        equipDice(-2);
      }
      if (item.code === "DICE003") {
        renderDialog("open", `${item.name} ${rword.clear}합니다.`);
        equipDice(-3);
      }
      if (item.code === "DICE004") {
        renderDialog("open", `${item.name} ${rword.clear}합니다.`);
        equipDice(-4);
      }
      if (item.code === "DICE005") {
        renderDialog("open", `${item.name} ${rword.clear}합니다.`);
        equipDice(-5);
      }
    } else {
      // equippedItem.id기 이미 있으면 저장
      // setEquippedItems(prev => [...prev, item]);

      if (equippedItems.length >= maxItems) {
        renderDialog("open", `${rword.equip}는 최대 ${maxItems}개의 ${rword.item}만 저장할 수 있습니다.`);
        return;
      }
      
      const updatedItems = items.filter(i => i.id !== item.id);
      setItems(updatedItems);
      setEquippedItems(prev => [...prev, item]);
      localStorage.setItem("equippedItems", JSON.stringify([...equippedItems, item]));
      localStorage.setItem("inventory", JSON.stringify(updatedItems));

      if (item.code === "DICE001") {
        renderDialog("open", `${item.name} ${rword.equip}합니다.`);
        equipDice(1);
      }
      if (item.code === "DICE002") {
        renderDialog("open", `${item.name} ${rword.equip}합니다.`);
        equipDice(2);
      }
      if (item.code === "DICE003") {
        renderDialog("open", `${item.name} ${rword.equip}합니다.`);
        equipDice(3);
      }
      if (item.code === "DICE004") {
        renderDialog("open", `${item.name} ${rword.equip}합니다.`);
        equipDice(4);
      }
      if (item.code === "DICE005") {
        renderDialog("open", `${item.name} ${rword.equip}합니다.`);
        equipDice(5);
      }
    }
  }

  // 루팅 닫기
  const CloseBox = () => {
    setItemsMsg(false);
    setLooting(false);
  }

  // drag
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("application/json"));
    equipItem(item);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };


  // debug
  // console.log(equippedItems);

  return (
    <div>
      <DialogComponent/>

      {/* looting */}
      {looting === true && 
      <div className="intro">
        {itemsMsg ? (
        <div>
          <div className={itemsIcon}></div>
          <div>{itemsMsg}</div>
          <button onClick={CloseBox}>닫기</button>
        </div>
        ) : (
        <button onClick={addItem}>Looting Item</button>
        )}
      </div>
      }
      {/* equipment */}
      <div className="equipment" onDrop={handleDrop} onDragOver={handleDragOver}>
        <h2>equipment {equippedItems.length} / {maxItems}</h2>
        <div className="equipment-box">
          <ul>
            {equippedItems.map((item) => (
            <li key={item.id}>
              <div className="d-flex">
                <span className={item.icon}></span>
                <strong>{item.name} : {item.id}</strong>
                <div>
                  <span onClick={() => equipItem(item)}>{rword.clear}</span>
                </div>
              </div>
              <div>{item.description}</div>
            </li>
            ))}
          </ul>
        </div>
      </div>
      {/* inventory */}
      <div className="inventory">
        <h2>Inventory {items.length} / {maxItems}</h2>
        <ul className="item-box">
          {items.map((item) => (
          <li 
            key={item.id} 
            className={item.type === "equipment" ? "equip-item" : ""} 
            draggable={item.type === "equipment" ? "true" : "false"}
            onDragStart={(e) => handleDragStart(e, item)}
          >
            <div className="d-flex">
              <span className={item.icon}></span>
              <strong>{item.name} : {item.type}</strong>
              {item.type === "equipment" ? (
              <div>
                <span onClick={() => equipItem(item)}>
                  {equippedItems.some(equippedItem => equippedItem.id === item.id) ? rword.clear : rword.equip}
                </span>
                {!equippedItems.some(equippedItem => equippedItem.id === item.id) &&
                <span onClick={() => useItem(item.id, item.code)}>삭제</span>
                }
              </div>
              ) : (
              <span onClick={() => useItem(item.id, item.code)}>사용</span>
              )}
            </div>
            <div>{item.description}</div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Inventory;
