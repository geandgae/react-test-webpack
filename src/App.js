import React, { useState, useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";

const App = () => {
  const [profile, setProfile] = useState({
    name: "",
    head: "bald",
    eyes: "smallEyes",
    face: "round",
    job: "warrior",
    skill: "swordsmanship"
  });
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState("main");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      setProfile(storedProfile);
      setIsProfileSaved(true);
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
    setIsProfileSaved(true);
    setCurrentPage("main")
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    setProfile({
      name: "",
      head: "bald",
      eyes: "smallEyes",
      face: "round",
      job: "warrior",
      skill: "swordsmanship"
    });
    setIsProfileSaved(false);
  };

  
  console.log(currentPage);
  
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
          {currentPage === 'load' && 
            <ViewProfile 
              profile={profile}
              removeFromLocalStorage={removeFromLocalStorage}
            />
          }
        </div>
      ) : (
        <div>
          {currentPage === 'new' && 
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
