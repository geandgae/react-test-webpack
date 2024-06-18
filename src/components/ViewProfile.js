import React, { useState } from "react";
import GameStage from "./GameStage";

const ViewProfile = ({ profile, stage, setStage, setCurrentPage }) => {
  const [MovePage, setMovePage] = useState("view");

  return (
    <div>
      {MovePage === "view" && (
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
          <div>head: {profile.head}</div>
          <div>eyes: {profile.eyes}</div>
          <div>face: {profile.face}</div>
          <div>job: {profile.job}</div>
          <div>skill: {profile.skill}</div>
          <div>stage: {stage}</div>
        </div>
        <button onClick={() => setMovePage("stage")}>stage</button>
      </div>
      )}
      {MovePage === "stage" && (
      <div>
        <GameStage 
          profile={profile}
          stage={stage}
          setStage={setStage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      )}
    </div>
  );
};

export default ViewProfile;
