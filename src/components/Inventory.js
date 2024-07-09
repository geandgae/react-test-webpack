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

  const addItem = () => {
    if (items.length >= maxItems) {
      setItemsIcon("item-icon item-max");
      setItemsMsg(`인벤토리에는 최대 ${maxItems}개의 아이템만 저장할 수 있습니다.`);
      return;
    }

    const { randomItem, description, itemType, itemIcon } = generateUniqueName();

    const newItem = {
      id: Date.now(),
      name: randomItem,
      description: description,
      type: itemType,
      icon: itemIcon,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    setItemsIcon(newItem.icon);
    setItemsMsg(`${newItem.name}을 얻었습니다.`);
  };

  const generateUniqueName = () => {
    // 아이템 타입 결정 
    let itemType;
    const diceType = Math.floor(Math.random() * 100) + 1;
    itemType = (diceType <= 10) ? "equipment" : "normal";
    console.log(`diceType : ${diceType} ${itemType}`);

    // 아이템 테이블 결정
    let itemList;
    const diceItem = Math.floor(Math.random() * 100) + 1;
    const itemTableA = ["AAA", "BBB", "CCC"];
    const itemTableB = ["DDD", "EEE", "FFF"];
    const itemTableEA = ["EA00"];
    const itemTableEB = ["EB00"];

    if (itemType === "equipment") {
      itemList = (diceItem <= 80) ? itemTableEA : itemTableEB;
    } else { // itemType === "normal"
      itemList = (diceItem <= 50) ? itemTableA : itemTableB;
    }

    // 아이템 설명
    const randomIndex = Math.floor(Math.random() * itemList.length);
    const randomItem = itemList[randomIndex];
    const description = 
      randomItem === "AAA" ? "hp 1 회복" : 
      randomItem === "BBB" ? "hp 2 회복" : 
      randomItem === "CCC" ? "hp 3 회복" :
      randomItem === "DDD" ? "1턴 동안 주사위 + 1" :
      randomItem === "EEE" ? "1턴 동안 주사위 + 2" :
      randomItem === "FFF" ? "1턴 동안 주사위 + 3" :
      randomItem === "EA00" ? "장비하면 주사위를 한개 늘려준다" :
      randomItem === "EB00" ? "장비하면 주사위를 두개 늘려준다" : "---";
    const itemIcon = 
      randomItem === "AAA" ? "item-icon item-aaa" : 
      randomItem === "BBB" ? "item-icon item-bbb" : 
      randomItem === "CCC" ? "item-icon item-ccc" :
      randomItem === "DDD" ? "item-icon item-ddd" :
      randomItem === "EEE" ? "item-icon item-eee" :
      randomItem === "FFF" ? "item-icon item-fff" :
      randomItem === "EA00" ? "item-icon item-ea00" :
      randomItem === "EB00" ? "item-icon item-eb00" : "item-icon";
    console.log(`diceItem  : ${diceItem} ${itemList}`);  
    return { randomItem, description, itemType, itemIcon};
  };

  const useItem = (id, name) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    if (name === "AAA") {
      ctrlHp(1, "use");
    }
    if (name === "BBB") {
      ctrlHp(2, "use");
    }
    if (name === "CCC") {
      ctrlHp(3, "use");
    }
    if (name === "DDD") {
      buffDiceUp(1);
    }
    if (name === "EEE") {
      buffDiceUp(2);
    }
    if (name === "FFF") {
      buffDiceUp(3);
    }
  };

  // 아이템 장착/해제 함수
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
      if (item.name === "EA00") {
        equipDice(-1);
      }
      if (item.name === "EB00") {
        equipDice(-2);
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
      if (item.name === "EA00") {
        equipDice(1);
      }
      if (item.name === "EB00") {
        equipDice(2);
      }
    }
  }

  const CloseBox = () => {
    setItemsMsg(false);
    setLooting(false);
  }

  // drag
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    console.log(e)
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
                <span onClick={() => useItem(item.id, item.name)}>삭제</span>
                }
              </div>
              ) : (
              <span onClick={() => useItem(item.id, item.name)}>사용</span>
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
