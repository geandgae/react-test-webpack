import React, { useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";
import GameStage from "./components/GameStage";
// store
import { useAppState, useAppDispatch, actionTypes } from "./store/Store";

const App = () => {
  // store
  const { stage, environments, isProfileSaved, currentPage, trophy } = useAppState();
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

  // 이부분 작동 안됨 테스트
  useEffect(() => {
    if (stage > trophy) {
      localStorage.setItem("trophy", stage);
    }
  }, [stage]);

  // 새로운 환경 데이터 생성 및 저장
  const generateAndStoreEnvironments = () => {
    const envOptions = [0, 1, 2, 3, 4, 5, 6];
    const environments = Array.from({ length: 500 }, () => {
      return envOptions[Math.floor(Math.random() * envOptions.length)];
    });
    localStorage.setItem("stageEnvironments", JSON.stringify(environments));
    dispatch({ type: actionTypes.SET_ENVIRONMENTS, payload: environments });
  };

  const handleNewButtonClick = () => {
    generateAndStoreEnvironments(); // new만 클릭해도 환경변수 재설정 된 버그 악용?? 원래는 저장 단계에서 해야하지만 귀찮다
    setCurrentPage("new");
  };

  // 로컬 스토리지에 사용자 정보 저장
  const saveUserToLocalStorage = () => {
    dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: true });
    setCurrentPage("main");
  };

  // 로컬 스토리지 전체 삭제
  const removeFromLocalStorage = () => {
    let excludeKeys = trophy;
    localStorage.clear();
    dispatch({ type: actionTypes.SET_PROFILE, payload: initialState.profile });
    dispatch({ type: actionTypes.SET_STAGE, payload: 1 });
    dispatch({ type: actionTypes.SET_ENVIRONMENTS, payload: [] });
    dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: false });
    dispatch({ type: actionTypes.SET_TROPHY, payload: excludeKeys });
  };

  // 게임 오버 처리
  const gameover = () => {
    removeFromLocalStorage();
    setCurrentPage("main");
  };

  // test
  console.log(environments);
  console.log(stage);
  console.log(currentPage);

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
          <span>trophy : {trophy}</span>
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
    </>
  );
};

export default App;
