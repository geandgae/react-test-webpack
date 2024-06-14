import React, { useState } from 'react';

const Login = ({ onLogin, setCurrentPage }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === id && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid ID or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
      <div>
        <a href="#signup" onClick={() => setCurrentPage('signup')}>Signup</a> | <a href="#forgot-password" onClick={() => setCurrentPage('forgot-password')}>Forgot Password</a>
        {/* <button onClick={() => setCurrentPage('signup')}>Signup</button> | <button onClick={() => setCurrentPage('forgot-password')}>Forgot Password</button> */}
      </div>
    </form>
  );
};

export default Login;
