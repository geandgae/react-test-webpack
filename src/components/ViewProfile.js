import React from "react";

const ViewProfile = ({ profile, removeFromLocalStorage }) => {
  return (
    <div>
      <div className={`Avatar-preview ${profile.head} ${profile.eyes} ${profile.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div>
      <div className="Avatar-figure">
        <div>name: {profile.name}</div>
        <div>head: {profile.head}</div>
        <div>eyes: {profile.eyes}</div>
        <div>face: {profile.face}</div>
        <div>job: {profile.job}</div>
        <div>skill: {profile.skill}</div>
      </div>
    </div>
  );
};

export default ViewProfile;
