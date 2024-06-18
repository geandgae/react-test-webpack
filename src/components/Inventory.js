import React, { useState, useEffect } from "react";

const Inventory = ({ hpUp, diceUp }) => {
  const maxItems = 5; // 최대 아이템 개수
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("inventory")) || [];
    setItems(storedItems);
  }, []);

  const addItem = () => {
    if (items.length >= maxItems) {
      console.log(`인벤토리에는 최대 ${maxItems}개의 아이템만 저장할 수 있습니다.`);
      return;
    }

    const { randomItem, description } = generateUniqueName();

    const newItem = {
      id: Date.now(),
      name: randomItem,
      description: description,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
  };

  const generateUniqueName = () => {
    const itemList = ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF"];
    const randomIndex = Math.floor(Math.random() * itemList.length);
    const randomItem = itemList[randomIndex];
    const description = 
      randomItem === "AAA" ? "hp 1 회복" : 
      randomItem === "BBB" ? "hp 2 회복" : 
      randomItem === "CCC" ? "hp 3 회복" :
      randomItem === "DDD" ? "주사위 + 1" :
      randomItem === "EEE" ? "주사위 + 2" : "주사위 + 3";
    return { randomItem, description };
  };

  const removeItem = (id, name) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("inventory", JSON.stringify(updatedItems));
    if (name === "AAA") {
      hpUp(1);
    }
    if (name === "BBB") {
      hpUp(2);
    }
    if (name === "CCC") {
      hpUp(3);
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

  return (
    <div>
      <h2>Inventory</h2>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.id}
            <span onClick={() => removeItem(item.id, item.name)}>use</span>
            <div>{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
