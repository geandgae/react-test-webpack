// import React, { useState, useEffect } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";
// import UserProfile from "./components/UserProfile"; // 사용자 프로필을 보여주는 컴포넌트를 import

// const App = () => {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // 페이지 로드 시 로컬 스토리지에서 사용자 정보를 가져와서 로그인 상태를 유지
//     const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
//     if (rememberedUser) {
//       setUser(rememberedUser);
//       setCurrentPage("profile");
//     }
//   }, []);

//   // 로그인 처리
//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem("rememberedUser", JSON.stringify(userData)); // 로그인 시 사용자 정보를 로컬 스토리지에 저장
//     setCurrentPage("profile"); // 로그인 후 프로필 페이지로 이동
//   };

//   // 회원가입 후 로그인 페이지로 이동
//   const handleSignup = () => {
//     setCurrentPage("login");
//   };

//   // 로그아웃 처리
//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("rememberedUser"); // 로그아웃 시 로컬 스토리지에서 사용자 정보 제거
//     setCurrentPage("login"); // 로그아웃 후 로그인 페이지로 이동
//   };

//   return (
//     <div>
//       {/* 사용자가 로그인 상태인 경우 */}
//       {user ? (
//         <div>
//           <UserProfile user={user} />
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           {/* 로그인, 회원가입, 비밀번호 찾기 페이지 */}
//           {currentPage === "login" && <Login onLogin={handleLogin} setCurrentPage={setCurrentPage} />}
//           {currentPage === "signup" && <Signup onSignup={handleSignup} />}
//           {currentPage === "forgot-password" && <ForgotPassword />}

//           {/* 각 페이지로 이동할 수 있는 버튼 */}
//           {currentPage !== "login" && (
//             <div>
//               <button onClick={() => setCurrentPage("login")}>Login</button>
//             </div>
//           )}
//           {currentPage !== "signup" && (
//             <div>
//               <button onClick={() => setCurrentPage("signup")}>Signup</button>
//             </div>
//           )}
//           {currentPage !== "forgot-password" && (
//             <div>
//               <button onClick={() => setCurrentPage("forgot-password")}>Forgot Password</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import ViewProfile from "./components/ViewProfile"; // 사용자 프로필을 보여주는 컴포넌트를 import
import CreateProfile from "./components/CreateProfile"; // 사용자 프로필을 보여주는 컴포넌트를 import

const App = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    age: 0,
    head: "bald",
    eyes: "bigEyes",
    face: "round",
    job: "warrior",
    skill: "swordsmanship",
    // 추가적인 속성들을 필요에 따라 여기에 추가
  });

  // 로컬스토리지에서 사용자 정보를 불러오는 함수
  const checkUserInLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  useEffect(() => {
    const storedUser = checkUserInLocalStorage("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // 데이터 저장 테스트용
  const saveUserToLocalStorage = () => {
    const userData = { ...profile };
    localStorage.setItem("user", JSON.stringify(userData));
    setProfile({
      name: "",
      age: 0,
      head: "bald",
      eyes: "bigEyes",
      face: "round",
      job: "warrior",
      skill: "swordsmanship",
    });
  };

  // 데이터 삭제 테스트용
  const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  console.log(user);

  return (
    <div>
      <div>Welcome {user ? user.name : "Guest"}</div>
      {user ? (
        <div>
          <ViewProfile 
            user={user}
            removeFromLocalStorage={removeFromLocalStorage}
          />
          <button onClick={removeFromLocalStorage}>Remove</button>
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
