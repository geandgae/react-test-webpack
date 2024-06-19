import React, { useState, useEffect } from "react";

const Inventory = ({ hpCtrl, diceUp, diceEquip, looting, setLooting}) => {
  const maxItems = 5; // 최대 아이템 개수
  const [items, setItems] = useState([]);
  const [equippedItems, setEquippedItems] = useState(() => {
    const saved = localStorage.getItem('equippedItems');
    return saved ? JSON.parse(saved) : [];
  });

  console.log(`equippedItems : ${equippedItems}`);

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
      console.log(`인벤토리에는 최대 ${maxItems}개의 아이템만 저장할 수 있습니다.`);
      setLooting(false);
      return;
    }

    const { randomItem, description, itemType } = generateUniqueName();

    const newItem = {
      id: Date.now(),
      name: randomItem,
      description: description,
      type: itemType
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    setLooting(false)
  };

  const generateUniqueName = () => {
    
    // 아이템 타입 결정 
    let itemType;
    const diceType = Math.floor(Math.random() * 200) + 1;
    itemType = (diceType <= 10) ? "equipment" : "normal";
    // switch (true) {
    //   case (diceType >= 1 && diceType <= 199):
    //     itemType = "normal";
    //     break;
    //   case (diceType === 200):
    //     itemType = "equipment";
    //     break;
    // }
    console.log(`diceType : ${diceType} ${itemType}`);


    // 아이템 테이블 결정
    let itemList;
    const diceItem = Math.floor(Math.random() * 100) + 1;
    const itemTableA = ["AAA", "BBB", "CCC"];
    const itemTableB = ["DDD", "EEE", "FFF"];
    const itemTableEA = ["EA00"];
    const itemTableEB = ["EB00"];

    if (itemType === "equipment") {
      itemList = (diceItem <= 50) ? itemTableEA : itemTableEB;
    } else { // itemType === "normal"
      itemList = (diceItem <= 90) ? itemTableA : itemTableB;
    }

    // if (itemType === "normal") {
    //   switch (true) {
    //     case (diceItem  >= 1 && diceItem  <= 50):
    //       itemList = itemTableA;
    //       break;
    //     case (diceItem  >= 51 && diceItem  <= 100):
    //       itemList = itemTableB;
    //       break;
    //   }
    // } else {
    //   switch (true) {
    //     case (diceItem  >= 1 && diceItem  <= 50):
    //       itemList = itemTableEA;
    //       break;
    //     case (diceItem  >= 51 && diceItem  <= 100):
    //       itemList = itemTableEB;
    //       break;
    //   }
    // }
    console.log(`diceItem  : ${diceItem } ${itemList}`);
    
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
    return { randomItem, description, itemType};
  };

  const useItem = (id, name) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    if (name === "AAA") {
      hpCtrl(1);
    }
    if (name === "BBB") {
      hpCtrl(2);
    }
    if (name === "CCC") {
      hpCtrl(3);
    }
    if (name === "DDD") {
      diceUp(1);
    }
    if (name === "EEE") {
      diceUp(2);
    }
    if (name === "FFF") {
      diceUp(3);
    }
  };

  const equipItem = (id, name) => {
    if (equippedItems.includes(id)) {
      // 이미 장착된 아이템이면 해제합니다.
      setEquippedItems(prev => prev.filter(item => item !== id));
      // unequipItem(id) 함수를 호출하여 해당 아이템을 해제하는 로직 추가
      if (name === "EA00") {
        diceEquip(-1);
      }
      if (name === "EB00") {
        diceEquip(-2);
      }
    } else {
      // 장착되지 않은 아이템이면 장착합니다.
      setEquippedItems(prev => [...prev, id]);
      // equipItem(id) 함수를 호출하여 해당 아이템을 장착하는 로직 추가
      if (name === "EA00") {
        diceEquip(1);
      }
      if (name === "EB00") {
        diceEquip(2);
      }
    }
  }

  return (
    <div>
      {/* looting */}
      {looting === true && 
      <div className="intro">
        <button onClick={addItem}>Looting Item</button>
      </div>
      }
      <h2>Inventory</h2>
      <ul className="item-box">
        {items.map((item) => (
          <li key={item.id} className={equippedItems.includes(item.id) ? 'equip-item' : ''}>
            <strong>{item.name} : {item.id} : {item.type}</strong>
            {item.type === "equipment" ? (
            <div>
              <span onClick={() => equipItem(item.id, item.name)}>
                {equippedItems.includes(item.id) ? '해제' : '장착'}
              </span>
              {!equippedItems.includes(item.id) &&
              <span onClick={() => useItem(item.id, item.name)}>삭제</span>
              }
            </div>
            ) : (
            <span onClick={() => useItem(item.id, item.name)}>사용</span>
            )}
            <div>{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
