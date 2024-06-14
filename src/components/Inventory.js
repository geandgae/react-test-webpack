import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('inventory')) || [];
    setItems(storedItems);
  }, []);

  const addItem = () => {
    const newItem = {
      id: Date.now(), // 현재 시간을 기반으로 한 고유한 숫자
      name: generateUniqueName(),
      description: 'Sample item description',
    };
  
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('inventory', JSON.stringify(updatedItems));
  };

  const generateUniqueName = () => {
    const baseName = 'Item';
    let count = 1;
    let newName = baseName;

    while (items.some(item => item.name === newName)) {
      newName = `${baseName} ${count}`;
      count++;
    }

    return newName;
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('inventory', JSON.stringify(updatedItems));
  };

  return (
    <div>
      <h2>Inventory</h2>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.id}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
