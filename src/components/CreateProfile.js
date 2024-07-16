import React, { useEffect } from "react";
import { useAppState, useAppDispatch, actionTypes  } from '../store/Store';

const CreateProfile = ({ saveUserToLocalStorage }) => {
  const { profile } = useAppState();
  const { dispatch } = useAppDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // debug
    // console.log(`changedName: ${name}, changedValue: ${value}`);
    dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, [name]: value } });
  };

  // 직업 설정
  useEffect(() => {
    switch (profile.job) {
      case "warrior":
        dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, str: 1, vit: 25, inv: 8 } });
        break;
      case "mage":
        dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, str: 5, vit: 3, inv: 5 } });
        break;
      case "hunter":
        dispatch({ type: actionTypes.SET_PROFILE, payload: { ...profile, str: 1, vit: 10, inv: 12 } });
        break;
      default:
        break;
    }
  }, [profile.job, dispatch]);

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
            skill:
            <input
              className="input-name"
              type="text"
              name="name"
              value={profile.skill}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            job:
            <select name="job" value={profile.job} onChange={handleInputChange}>
              <option value="warrior" selected>warrior</option>
              <option value="mage">mage</option>
              <option value="hunter">hunter</option>
            </select>
          </label>
          {profile.job === "warrior" && (<div>주사위: 1 / 체력: 25 / 가방: 8</div>)}
          {profile.job === "mage" && (<div>주사위: 5 / 체력: 3 / 가방: 5</div>)}
          {profile.job === "hunter" && (<div>주사위: 1 / 체력: 10 / 가방: 12</div>)}
        </div>
      </div>
      <button onClick={saveUserToLocalStorage}>유저 정보 저장</button>
    </div>
  );
};

export default CreateProfile;