import React from "react";
// store
import { useAppState, useAppDispatch } from '../store/Store';

const ViewProfile = () => {
  // store
  const { profile, stage } = useAppState();
  const { setCurrentPage } = useAppDispatch();

  return (
    <div>
      <div className={`Avatar-preview ${profile.head} ${profile.eyes} ${profile.face}`}>
        <div className="Avatar-inner">
          <div className="Avatar-head"><span></span></div>
          <div className="Avatar-eyes"><span></span></div>
          <div className="Avatar-face"><span></span></div>
        </div>
      </div>
      <div className="Avatar-figure view">
        <div>name: {profile.name}</div>
        <div>job: {profile.job}</div>
        <div>skill: {profile.skill}</div>
        <div>str: {profile.str}</div>
        <div>vit: {profile.vit}</div>
        <div>inv: {profile.inv}</div>
        <div>stage: {stage}</div>
      </div>
      <button onClick={() => setCurrentPage("gamestage")}>stage</button>
    </div>
  );
};

export default ViewProfile;
