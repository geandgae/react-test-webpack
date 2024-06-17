import React, { useState, useEffect } from "react";

const ViewProfile = ({ user, removeFromLocalStorage }) => {
  const [userStatus, setUserStatus] = useState("avatar");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const savedAvatar = JSON.parse(localStorage.getItem("avatar"));
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleAvatarSave = (newAvatar) => {
    setAvatar(newAvatar);
  };

  // const handleSelectDice = () => {
  //   setUserStatus("dice");
  // };

  // const handleSelectStage = () => {
  //   setUserStatus("stage");
  // };

  // const handleSelectAvatar = () => {
  //   setUserStatus("avatar");
  // };

  // const handleSelectInventory = () => {
  //   setUserStatus("inventory");
  // };

  return (
    <div>
      {avatar && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
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
          <button onClick={removeFromLocalStorage}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
