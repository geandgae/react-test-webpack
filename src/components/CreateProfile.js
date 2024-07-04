import React, { useEffect } from "react";
import { useAppState, useAppDispatch, actionTypes  } from '../store/Store';

const CreateProfile = ({ saveUserToLocalStorage }) => {
  const { profile } = useAppState();
  const { dispatch } = useAppDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, [name]: value } });
  };

  // 스킬 설정
  useEffect(() => {
    switch (profile.skill) {
      case "swordsmanship":
        dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, str: 1, vit: 20, inv: 7 } });
        break;
      case "magic":
        dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, str: 3, vit: 3, inv: 5 } });
        break;
      case "archery":
        dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, str: 1, vit: 10, inv: 10 } });
        break;
      default:
        break;
    }
  }, [profile.skill, dispatch]);

  return (
    <div>
      <h2>CreateProfile</h2>
      <div className={`Avatar-preview ${profile.head} ${profile.eyes} ${profile.face}`}>
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
              className="input-name"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Head:
            <select name="head" value={profile.head} onChange={handleInputChange}>
              <option value="shortHair">Short Hair</option>
              <option value="longHair">Long Hair</option>
              <option value="bald">Bald</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Eyes:
            <select name="eyes" value={profile.eyes} onChange={handleInputChange}>
              <option value="bigEyes">Big Eyes</option>
              <option value="smallEyes">Small Eyes</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Face:
            <select name="face" value={profile.face} onChange={handleInputChange}>
              <option value="round">Round</option>
              <option value="square">Square</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Job:
            <input
              className="input-name"
              type="text"
              name="name"
              value={profile.job}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Skill:
            <select name="skill" value={profile.skill} onChange={handleInputChange}>
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