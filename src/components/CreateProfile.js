import React, { useState, useEffect } from 'react';
import Avatar from "./Avatar"; // Avatar 컴포넌트를 불러옵니다.

const CreateProfile = ({ profile, setProfile, saveUserToLocalStorage }) => {

  const [name, setName] = useState(profile.name || "");

  const handleInputChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setProfile({ ...profile, name: newName });
  };




  // const [userStatus, setUserStatus] = useState("avatar");
  // const [avatar, setAvatar] = useState(null);

  // useEffect(() => {
  //   const savedAvatar = JSON.parse(localStorage.getItem("avatar"));
  //   if (savedAvatar) {
  //     setAvatar(savedAvatar);
  //   }
  // }, []);

  // const handleAvatarSave = (newAvatar) => {
  //   setAvatar(newAvatar);
  // };

  return (
    <div>
      <h2>유저 등록 및 삭제</h2>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      <button onClick={saveUserToLocalStorage}>유저 정보 저장</button>

      {/* Avatar 컴포넌트를 여기서 불러옵니다. */}
      {/* <Avatar onSave={handleAvatarSave} /> */}
    </div>
  );
};

export default CreateProfile;