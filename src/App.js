import React, { useState, useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";
import TestComponent from "./components/AutoTagTest";

const App = () => {
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
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState("intro");
  const [stage, setStage] = useState(1);
  const [environments, setEnvironments] = useState([]);
  const [trophy, setTrophy] = useState(stage);

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
      setIsProfileSaved(true);
    }

    // stage
    const savedStage = localStorage.getItem("stage");
    if (savedStage) {
      setStage(savedStage);
    }

    // trophy
    const savedTrophy = localStorage.getItem("trophy");
    if (savedTrophy) {
      setTrophy(parseInt(savedTrophy, 10));
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
    setIsProfileSaved(true);
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
    setIsProfileSaved(false);
    // 보존할 항목 다시 설정
    setTrophy(excludeKeys)
    localStorage.setItem("trophy", excludeKeys);
  };

  const gameover = () => {
    removeFromLocalStorage();
    setCurrentPage("main")
  }

  return (
    <div>
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
        {/* test */}
        <span onClick={() => setCurrentPage("test")}>test</span>
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
      <div>
        {currentPage === "load" && 
          <ViewProfile 
            profile={profile}
            stage={stage}
            setStage={setStage}
            setCurrentPage={setCurrentPage}
            environments={environments}
          />
        }
      </div>
      ) : (
      <div>
        {currentPage === "new" && 
          <CreateProfile
            profile={profile}
            setProfile={setProfile}
            saveUserToLocalStorage={saveUserToLocalStorage}
          />
        }
      </div>
      )}
      {/* test */}
      {currentPage === "test" && 
      <TestComponent/>
      }
    </div>
  );
};

export default App;
