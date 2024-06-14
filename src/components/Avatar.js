import React, { useState } from 'react';

const Avatar = ({ onSave }) => {
  const [avatar, setAvatar] = useState({
    head: 'bald',
    eyes: 'bigEyes',
    face: 'round',
    name: 'Default Name',
    job: 'warrior',
    skill: 'swordsmanship',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      [name]: value,
    }));
  };

  const nameList = ['John', 'Jane', 'Michael', 'Emma', 'David']; 
  const generateRandomName = () => {
    // const randomName = 'Avatar' + Math.floor(Math.random() * 1000); // 예시로 간단히 숫자를 붙임
    // setAvatar((prevAvatar) => ({
    //   ...prevAvatar,
    //   name: randomName,
    // }));
    const randomIndex = Math.floor(Math.random() * nameList.length);
    const randomName = nameList[randomIndex];
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      name: randomName,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('avatar', JSON.stringify(avatar));
    onSave(avatar);
  };

  return (
    <div>
      <h2>Avatar Creation</h2>
      <div className={`Avatar-preview ${avatar.head} ${avatar.eyes} ${avatar.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div>
      <div className="Avatar-figure">
        <h3>Appearance</h3>
        <div>
          <label>
            Head:
            <select name="head" value={avatar.head} onChange={handleInputChange}>
              <option value="">Select Head</option>
              <option value="shortHair">Short Hair</option>
              <option value="longHair">Long Hair</option>
              <option value="bald">Bald</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Eyes:
            <select name="eyes" value={avatar.eyes} onChange={handleInputChange}>
              <option value="">Select Eyes</option>
              <option value="bigEyes">Big Eyes</option>
              <option value="smallEyes">Small Eyes</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Face:
            <select name="face" value={avatar.face} onChange={handleInputChange}>
              <option value="">Select Face</option>
              <option value="round">Round</option>
              <option value="square">Square</option>
            </select>
          </label>
        </div>
      </div>
      <div className="Avatar-info">
        <h3>Information</h3>
        <div>
          <label>
            Name: {avatar.name}{' '}
            {/* <input type="text" name="name" value={avatar.name} onChange={handleInputChange} /> */}
          </label>
          <label>
            <span onClick={generateRandomName}>
              Refresh
            </span>
          </label>
        </div>
        <div>
          <label>
            Job:
            <select name="job" value={avatar.job} onChange={handleInputChange}>
              <option value="">Select Job</option>
              <option value="warrior">Warrior</option>
              <option value="mage">Mage</option>
              <option value="archer">Archer</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Skill:
            <select name="skill" value={avatar.skill} onChange={handleInputChange}>
              <option value="">Select Skill</option>
              <option value="swordsmanship">Swordsmanship</option>
              <option value="magic">Magic</option>
              <option value="archery">Archery</option>
            </select>
          </label>
        </div>
      </div>
      <button onClick={handleSave}>생성</button>
    </div>
  );
};

export default Avatar;
