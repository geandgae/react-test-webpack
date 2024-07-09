import React, { useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";
import GameStage from "./components/GameStage";
// store
import { useAppState, useAppDispatch, actionTypes } from "./store/Store";

const App = () => {
  // store
  const { stage, isProfileSaved, currentPage, trophy } = useAppState();
  const { dispatch, setCurrentPage, initialState } = useAppDispatch();

  useEffect(() => {
    // Intro
    if (currentPage === "intro") {
      const timer = setTimeout(() => {
        setCurrentPage("main");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // trophy 값 설정 및 업데이트
  useEffect(() => {
    const storedTrophy = JSON.parse(localStorage.getItem("trophy")) || 0;
    if (stage > storedTrophy) {
      localStorage.setItem("trophy", JSON.stringify(stage));
      dispatch({ type: actionTypes.SET_TROPHY, payload: stage });
    } else {
      dispatch({ type: actionTypes.SET_TROPHY, payload: storedTrophy });
    }
    console.log(`stage: ${stage}`);
    console.log(`trophy: ${trophy}`);
  }, [stage, dispatch]);


  // 새로운 환경 데이터 생성 및 저장
  const generateAndStoreEnvironments = () => {
    const envOptions = [0, 1, 2, 3, 4, 5, 6];
    const environments = Array.from({ length: 500 }, () => {
      return envOptions[Math.floor(Math.random() * envOptions.length)];
    });
    localStorage.setItem("stageEnvironments", JSON.stringify(environments));
    dispatch({ type: actionTypes.SET_ENVIRONMENTS, payload: environments });
  };

  // handleNewButtonClick
  const handleNewButtonClick = () => {
    generateAndStoreEnvironments();
    setCurrentPage("new");
  };

  // 로컬 스토리지에 사용자 정보 저장
  const saveUserToLocalStorage = () => {
    dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: true });
    setCurrentPage("main");
  };

  // 로컬 스토리지 전체 삭제
  const removeFromLocalStorage = () => {
    const storedTrophy = JSON.parse(localStorage.getItem("trophy")) || 0;

    console.log("gameover");
    console.log(`storedTrophy: ${storedTrophy}`);
    console.log(`trophy: ${trophy}`);
    
    localStorage.clear();
    localStorage.setItem("trophy", JSON.stringify(storedTrophy));

    dispatch({ type: actionTypes.SET_PROFILE, payload: initialState.profile });
    dispatch({ type: actionTypes.SET_STAGE, payload: 1 });
    dispatch({ type: actionTypes.SET_ENVIRONMENTS, payload: [] });
    dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: false });
    dispatch({ type: actionTypes.SET_TROPHY, payload: storedTrophy });
    dispatch({ type: actionTypes.SET_RESULT, payload: null });
    dispatch({ type: actionTypes.SET_BLESS, payload: 0 });
  };

  // 게임 오버 처리
  const gameover = () => {
    removeFromLocalStorage();
    setCurrentPage("main");
  };

  // test
  
  // console.log(currentPage);
  // console.log(maxHp);

  return (
    <>
      {/* intro */}
      {currentPage === "intro" && (
        <div className="intro">
          <span>intro</span>
        </div>
      )}
      {/* main */}
      {currentPage === "main" && (
        <nav className="main-menu">
          {isProfileSaved ? <button disabled>new</button> : <button onClick={handleNewButtonClick}>new</button>}
          {isProfileSaved ? <button onClick={() => setCurrentPage("load")}>load</button> : <button disabled>load</button>}
          {isProfileSaved ? <button onClick={removeFromLocalStorage}>remove</button> : <button disabled>remove</button>}
          <button onClick={() => setCurrentPage("trophy")}>trophy</button>
        </nav>
      )}
      {/* gameover */}
      {currentPage === "gameover" && (
        <div className="intro" onClick={gameover}>
          <span>gameover</span>
        </div>
      )}
      {/* load & new */}
      {isProfileSaved ? (
        <>{currentPage === "load" && <ViewProfile />}</>
      ) : (
        <>{currentPage === "new" && <CreateProfile saveUserToLocalStorage={saveUserToLocalStorage} />}</>
      )}
      {/* gamestage */}
      {currentPage === "gamestage" && (
        <GameStage/>
      )}
      {/* gamestage */}
      {currentPage === "trophy" && (
        <nav className="main-menu">
          <button onClick={() => setCurrentPage("main")}>main</button>
          <span>trophy : {trophy}</span>
        </nav>
      )}
    </>
  );
};

export default App;
