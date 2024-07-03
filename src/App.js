import React, { useState, useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";
// store
import { useAppState, useAppDispatch, actionTypes } from './store/Store';

const App = () => {
  // store
  const { isProfileSaved, currentPage, trophy } = useAppState();
  const { dispatch, setCurrentPage }= useAppDispatch();
  
  // 스토어 적용전
  const [profile, setProfile] = useState({
    name: "test",
    head: "bald",
    eyes: "smallEyes",
    face: "round",
    job: "none",
    skill: "swordsmanship",
    str: 1,
    vit: 10,
    inv: 5,
  });
  const [stage, setStage] = useState(1);
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    // env
    if (!localStorage.getItem("stageEnvironments")) {
      generateAndStoreEnvironments();
    }
    const storedEnvironments = JSON.parse(localStorage.getItem("stageEnvironments"));
    setEnvironments(storedEnvironments || []);

    // profile
    const storedProfile = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      setProfile(storedProfile);
      dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: true });
    }

    // stage
    const savedStage = localStorage.getItem("stage");
    if (savedStage) {
      setStage(savedStage);
    }

    // intro
    const introDom = document.querySelector(".intro");
    if (introDom) {
      setTimeout(() => {
        // introDom.classList.add("hide");
        setCurrentPage("main");
      }, 500);
    } else {
      console.error(`Element with class intro not found.`);
    }
  }, []);

  useEffect(() => {
    if (stage > trophy) {
      localStorage.setItem("trophy", stage);
    }
  }, [stage]);

  // generateAndStoreEnvironments
  const generateAndStoreEnvironments = () => {
    const envOptions = [0, 1, 2, 3, 4, 5, 6];
    const environments = Array.from({ length: 500 }, () => {
      return envOptions[Math.floor(Math.random() * envOptions.length)];
    });
    localStorage.setItem("stageEnvironments", JSON.stringify(environments));
  };

  const saveUserToLocalStorage = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("stage", stage);

    dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: true });
    setCurrentPage("main")
  };

  const removeFromLocalStorage = () => {
    let excludeKeys = trophy;
    // localStorage.removeItem("user");
    // 로컬 스토리지 전체 삭제
    localStorage.clear(); 
    setProfile({
      name: "test",
      head: "bald",
      eyes: "smallEyes",
      face: "round",
      job: "none",
      skill: "swordsmanship",
      str: 1,
      vit: 10,
      inv: 5,
    });
    setStage(1)
    dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: false });
    dispatch({ type: actionTypes.SET_TROPHY, payload: excludeKeys });
  };

  const gameover = () => {
    removeFromLocalStorage();
    setCurrentPage("main")
  }

  return (
    <>
      {/* intro */}
      {currentPage === "intro" && 
      <div className="intro">
        <span>intro</span>
      </div>
      }
      {/* main */}
      {currentPage === "main" && 
      <nav className="main-menu">
        {isProfileSaved ? (
          <button disabled>new</button>
        ) : (
          <button onClick={() => setCurrentPage("new")}>new</button>
        )}
        {isProfileSaved ? (
          <button onClick={() => setCurrentPage("load")}>load</button>
        ) : (
          <button disabled>load</button>
        )}
        {isProfileSaved ? (
          <button onClick={removeFromLocalStorage}>remove</button>
        ) : (
          <button disabled>remove</button>
        )}
        <span>trophy : {trophy}</span>
      </nav>
      }
      {/* gameover */}
      {currentPage === "gameover" && 
      <div className="intro" onClick={gameover}>
        <span>gameover</span>
      </div>
      }
      {/* load & new */}
      {isProfileSaved ? (
      <>
        {currentPage === "load" && 
          <ViewProfile 
            profile={profile}
            stage={stage}
            setStage={setStage}
            environments={environments}
          />
        }
      </>
      ) : (
      <>
        {currentPage === "new" && 
          <CreateProfile
            profile={profile}
            setProfile={setProfile}
            saveUserToLocalStorage={saveUserToLocalStorage}
          />
        }
      </>
      )}
    </>
  );
};

export default App;
