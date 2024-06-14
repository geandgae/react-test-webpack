import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UserProfile from './components/UserProfile'; // 사용자 프로필을 보여주는 컴포넌트를 import

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 사용자 정보를 가져와서 로그인 상태를 유지
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (rememberedUser) {
      setUser(rememberedUser);
      setCurrentPage('profile');
    }
  }, []);

  // 로그인 처리
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('rememberedUser', JSON.stringify(userData)); // 로그인 시 사용자 정보를 로컬 스토리지에 저장
    setCurrentPage('profile'); // 로그인 후 프로필 페이지로 이동
  };

  // 회원가입 후 로그인 페이지로 이동
  const handleSignup = () => {
    setCurrentPage('login');
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rememberedUser'); // 로그아웃 시 로컬 스토리지에서 사용자 정보 제거
    setCurrentPage('login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div>
      {/* 사용자가 로그인 상태인 경우 */}
      {user ? (
        <div>
          <UserProfile user={user} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {/* 로그인, 회원가입, 비밀번호 찾기 페이지 */}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'signup' && <Signup onSignup={handleSignup} />}
          {currentPage === 'forgot-password' && <ForgotPassword />}

          {/* 각 페이지로 이동할 수 있는 버튼 */}
          {currentPage !== 'login' && (
            <div>
              <button onClick={() => setCurrentPage('login')}>Login</button>
            </div>
          )}
          {currentPage !== 'signup' && (
            <div>
              <button onClick={() => setCurrentPage('signup')}>Signup</button>
            </div>
          )}
          {currentPage !== 'forgot-password' && (
            <div>
              <button onClick={() => setCurrentPage('forgot-password')}>Forgot Password</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
