import React, { useState } from 'react';
import Dice from './Dice';
import Avatar from './Avatar';
import Stage from './Stage';

const LoggedInUser = ({ user, onLogout }) => {
  const [userStatus, setUserStatus] = useState('dice');

  const handleSelectDice = () => {
    setUserStatus('dice');
  };

  const handleSelectStage = () => {
    setUserStatus('stage');
  };

  const handleSelectAvatar = () => {
    setUserStatus('avatar');
  };

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Birth Date:</strong> {user.birthDate}</p>
      {/* <button onClick={onLogout}>Logout</button> */}

      <br></br>

      {/* 버튼을 클릭하여 userStatus를 변경 */}
      <button onClick={handleSelectDice}>Dice</button>
      <button onClick={handleSelectStage}>Stage</button>
      <button onClick={handleSelectAvatar}>Avatar</button>

      {/* userStatus에 따라 컴포넌트를 조건부로 렌더링 */}
      {userStatus === 'dice' && <Dice />}
      {userStatus === 'stage' && <Stage />}
      {userStatus === 'avatar' && <Avatar />}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default LoggedInUser;
