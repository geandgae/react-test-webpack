import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../test/counterSlice';
import GameStage from "./GameStage";

const ViewProfile = ({ profile, stage, setStage, setCurrentPage, environments }) => {
  const [MovePage, setMovePage] = useState("view");

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      {/* store test */}
      <div>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(2))}>Increment by 2</button>
      </div>
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
          <div>job: {profile.job}</div>
          <div>skill: {profile.skill}</div>
          <div>str: {profile.str}</div>
          <div>vit: {profile.vit}</div>
          <div>inv: {profile.inv}</div>
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
          environments={environments}
        />
      </div>
      )}
    </div>
  );
};

export default ViewProfile;
