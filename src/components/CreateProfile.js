import React, { useState } from 'react';

const CreateProfile = ({ profile, setProfile, saveUserToLocalStorage }) => {
  const [profileData, setProfileData] = useState(profile);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>유저 등록 및 삭제</h2>
      <div className={`Avatar-preview ${profileData.head} ${profileData.eyes} ${profileData.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div>
      <div className="Avatar-figure">
        <div>
          <label>
            name:
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Head:
            <select name="head" value={profileData.head} onChange={handleInputChange}>
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
            <select name="eyes" value={profileData.eyes} onChange={handleInputChange}>
              <option value="">Select Eyes</option>
              <option value="bigEyes">Big Eyes</option>
              <option value="smallEyes">Small Eyes</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Face:
            <select name="face" value={profileData.face} onChange={handleInputChange}>
              <option value="">Select Face</option>
              <option value="round">Round</option>
              <option value="square">Square</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Job:
            <select name="job" value={profileData.job} onChange={handleInputChange}>
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
            <select name="skill" value={profileData.skill} onChange={handleInputChange}>
              <option value="">Select Skill</option>
              <option value="swordsmanship">Swordsmanship</option>
              <option value="magic">Magic</option>
              <option value="archery">Archery</option>
            </select>
          </label>
        </div>
      </div>
      <button onClick={saveUserToLocalStorage}>유저 정보 저장</button>
    </div>
  );
};

export default CreateProfile;