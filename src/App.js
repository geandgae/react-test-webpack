import React, { useState, useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";

const App = () => {
  const [profile, setProfile] = useState({
    name: "test",
    head: "bald",
    eyes: "smallEyes",
    face: "round",
    job: "warrior",
    skill: "swordsmanship",
  });
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState("main");
  const [stage, setStage] = useState("1");

  useEffect(() => {
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
    // intro
    const introDom = document.querySelector(".intro");
    if (introDom) {
      setTimeout(() => {
        introDom.classList.add("hide");
      }, 500);
    } else {
      console.error(`Element with class intro not found.`);
    }
  }, []);

  const saveUserToLocalStorage = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("stage", stage);
    setIsProfileSaved(true);
    setCurrentPage("main")
  };

  const removeFromLocalStorage = () => {
    // localStorage.removeItem("user");
    // 로컬 스토리지 전체 삭제
    localStorage.clear(); 
    setProfile({
      name: "test",
      head: "bald",
      eyes: "smallEyes",
      face: "round",
      job: "warrior",
      skill: "swordsmanship",
    });
    setStage("1")
    setIsProfileSaved(false);
  };

  // test
  console.log(currentPage);
  console.log(stage);
  
  
  return (
    <div>
      {/* intro */}
      <div className="intro">
        <span>intro</span>
        <div className="skip">skip</div>
      </div>
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
        <button onClick={removeFromLocalStorage}>remove</button>
      </nav>
      }
      
      {isProfileSaved ? (
        <div>
          {currentPage === "load" && 
            <ViewProfile 
              profile={profile}
              stage={stage}
              setStage={setStage}
              setCurrentPage={setCurrentPage}
              removeFromLocalStorage={removeFromLocalStorage}
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
    </div>
  );
};

export default App;
