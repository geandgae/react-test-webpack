import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    setCurrentPage('home');
  };

  const handleSignup = () => {
    setCurrentPage('login');
  };

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={() => { setUser(null); setCurrentPage('login'); }}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'signup' && <Signup onSignup={handleSignup} />}
      {currentPage === 'forgot-password' && <ForgotPassword />}
      {currentPage !== 'home' && (
        <div>
          <button onClick={() => setCurrentPage('login')}>Login</button>
          <button onClick={() => setCurrentPage('signup')}>Signup</button>
          <button onClick={() => setCurrentPage('forgot-password')}>Forgot Password</button>
        </div>
      )}
    </div>
  );
};

export default App;
