import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import Avatar from './Avatar';
import Stage from './Stage';
import Inventory from './Inventory';

const LoggedInUser = ({ user, onLogout }) => {
  const [userStatus, setUserStatus] = useState('avatar');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const savedAvatar = JSON.parse(localStorage.getItem('avatar'));
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleAvatarSave = (newAvatar) => {
    setAvatar(newAvatar);
  };

  const handleSelectDice = () => {
    setUserStatus('dice');
  };

  const handleSelectStage = () => {
    setUserStatus('stage');
  };

  const handleSelectAvatar = () => {
    setUserStatus('avatar');
  };

  const handleSelectInventory = () => {
    setUserStatus('inventory');
  };

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Birth Date:</strong> {user.birthDate}</p>
      {/* <button onClick={onLogout}>Logout</button> */}
      {avatar && (
        <div>
          <br></br>
          <h3>아바타</h3>
          <div className={`Avatar-preview ${avatar.head} ${avatar.eyes} ${avatar.face}`}>
            <div className="Avatar-inner">
              <div className="Avatar-head"><span></span></div>
              <div className="Avatar-eyes"><span></span></div>
              <div className="Avatar-face"><span></span></div>
            </div>
          </div>
          <p><strong>이름:</strong> {avatar.name}</p>
          <p><strong>직업:</strong> {avatar.job}</p>
          <p><strong>스킬:</strong> {avatar.skill}</p>
          <p><strong>머리:</strong> {avatar.head}</p>
          <p><strong>눈:</strong> {avatar.eyes}</p>
          <p><strong>얼굴형:</strong> {avatar.face}</p>
        </div>
      )}
      <br></br>

      {/* 버튼을 클릭하여 userStatus를 변경 */}
      <button onClick={handleSelectDice}>Dice</button>
      <button onClick={handleSelectStage}>Stage</button>
      <button onClick={handleSelectAvatar}>Avatar</button>
      <button onClick={handleSelectInventory}>Inventory</button>

      {/* userStatus에 따라 컴포넌트를 조건부로 렌더링 */}
      {userStatus === 'dice' && <Dice />}
      {userStatus === 'stage' && <Stage />}
      {userStatus === 'avatar' && <Avatar onSave={handleAvatarSave} />}
      {userStatus === 'inventory' && <Inventory />}
      

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default LoggedInUser;
