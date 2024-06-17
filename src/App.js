import React, { useState, useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";

const App = () => {
  const [profile, setProfile] = useState({
    name: "",
    head: "bald",
    eyes: "bigEyes",
    face: "round",
    job: "warrior",
    skill: "swordsmanship"
  });
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      setProfile(storedProfile);
      setIsProfileSaved(true);
    }
  }, []);

  const saveUserToLocalStorage = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    setIsProfileSaved(true);
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    setProfile({
      name: "",
      head: "bald",
      eyes: "bigEyes",
      face: "round",
      job: "warrior",
      skill: "swordsmanship"
    });
    setIsProfileSaved(false);
  };
  
  return (
    <div>
      {isProfileSaved ? (
        <div>
          <ViewProfile 
            profile={profile}
            removeFromLocalStorage={removeFromLocalStorage}
          />
        </div>
      ) : (
        <div>
          <CreateProfile
            profile={profile}
            setProfile={setProfile}
            saveUserToLocalStorage={saveUserToLocalStorage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
