import React, { useState, useEffect } from "react";
import DialogComponent from "./Dialog";
// store
import { useAppState, useAppDispatch } from '../store/Store';

const Inventory = ({ ctrlHp, buffDiceUp, equipDice, maxItems }) => {
  // store
  const { looting } = useAppState();
  const { setLooting, renderDialog } = useAppDispatch();

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
    // 장착된 아이템이 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem('equippedItems', JSON.stringify(equippedItems));
  }, [equippedItems]);

  // 아이템 저장
  const addItem = () => {
    if (items.length >= maxItems) {
      setItemsIcon("item-icon item-max");
      setItemsMsg(`인벤토리에는 최대 ${maxItems}개의 아이템만 저장할 수 있습니다.`);
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
    console.log(`diceType : ${diceType} ${type}`);

    // 아이템 테이블 결정
    const diceItem = Math.floor(Math.random() * 100) + 1;
    const itemTables = {
      equipment: diceItem <= 70 ? ["EA00"] : diceItem <= 90 ? ["EB00"] : ["EC00"],
      normal: diceItem <= 65 ? ["AAA", "BBB", "CCC"] : ["DDD", "EEE", "FFF"]
    };
    const itemList = itemTables[type];
    
    // 아이템 설명, 이름, 아이콘 매핑
    const randomIndex = Math.floor(Math.random() * itemList.length);
    const randomItem = itemList[randomIndex];

    const itemDetails = {
      "AAA": { name: "111", description: "hp 1 회복", icon: "item-icon item-aaa" },
      "BBB": { name: "222", description: "hp 2 회복", icon: "item-icon item-bbb" },
      "CCC": { name: "333", description: "hp 3 회복", icon: "item-icon item-bbb" },
      "DDD": { name: "444", description: "1턴 동안 주사위 + 1", icon: "item-icon item-ddd" },
      "EEE": { name: "555", description: "1턴 동안 주사위 + 1", icon: "item-icon item-eee" },
      "FFF": { name: "666", description: "1턴 동안 주사위 + 1", icon: "item-icon item-fff" },
      "EA00": { name: "777", description: "장비하면 주사위를 한개 늘려준다", icon: "item-icon item-ea00" },
      "EB00": { name: "888", description: "장비하면 주사위를 두개 늘려준다", icon: "item-icon item-eb00" },
      "EC00": { name: "999", description: "장비하면 주사위를 세개 늘려준다", icon: "item-icon item-ec00" }
    };
    console.log(`diceItem  : ${diceItem} ${itemList}`);

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
      "AAA": () => ctrlHp(1, "use"),
      "BBB": () => ctrlHp(2, "use"),
      "CCC": () => ctrlHp(3, "use"),
      "DDD": () => buffDiceUp(1),
      "EEE": () => buffDiceUp(2),
      "FFF": () => buffDiceUp(3),
    };
    // 아이템 효과 적용
    if (itemEffects[code]) {
      itemEffects[code]();
    }
  };

  // 아이템 장착/해제
  const equipItem = (item) => {
    // const item = { id, name, description, type, icon };

    if (equippedItems.some(equippedItem => equippedItem.id === item.id)) {
      // 이미 장착된 아이템이면 해제합니다.
      // setEquippedItems(prev => prev.filter(equippedItem => equippedItem.id !== id));

      if (items.length >= maxItems) {
        renderDialog("open", `인벤토리에는 최대 ${maxItems}개의 아이템만 저장할 수 있습니다.`);
        return;
      }
      
      const updatedEquippedItems = equippedItems.filter(equippedItem => equippedItem.id !== item.id);
      setEquippedItems(updatedEquippedItems);
      setItems(prev => [...prev, item]);
      localStorage.setItem("equippedItems", JSON.stringify(updatedEquippedItems));
      localStorage.setItem("inventory", JSON.stringify([...items, item]));

      // unequipItem(id) 함수를 호출하여 해당 아이템을 해제하는 로직 추가
      if (item.code === "EA00") {
        equipDice(-1);
      }
      if (item.code === "EB00") {
        equipDice(-2);
      }
      if (item.code === "EC00") {
        equipDice(-3);
      }
    } else {
      // 장착되지 않은 아이템이면 장착합니다.
      // setEquippedItems(prev => [...prev, item]);

      if (equippedItems.length >= maxItems) {
        renderDialog("open", `장비는 최대 ${maxItems}개의 아이템만 저장할 수 있습니다.`);
        return;
      }
      
      const updatedItems = items.filter(i => i.id !== item.id);
      setItems(updatedItems);
      setEquippedItems(prev => [...prev, item]);
      localStorage.setItem("equippedItems", JSON.stringify([...equippedItems, item]));
      localStorage.setItem("inventory", JSON.stringify(updatedItems));

      // equipItem(id) 함수를 호출하여 해당 아이템을 장착하는 로직 추가
      if (item.code === "EA00") {
        equipDice(1);
      }
      if (item.code === "EB00") {
        equipDice(2);
      }
      if (item.code === "EC00") {
        equipDice(3);
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


  // test
  console.log(equippedItems);
  console.log(`items : ${items.length}`);

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
                  <span onClick={() => equipItem(item)}>해제</span>
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
              <strong>{item.name} : {item.id} : {item.type}</strong>
              {item.type === "equipment" ? (
              <div>
                <span onClick={() => equipItem(item)}>
                  {equippedItems.some(equippedItem => equippedItem.id === item.id) ? '해제' : '장착'}
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
