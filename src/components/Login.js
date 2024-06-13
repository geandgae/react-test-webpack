import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === id && u.password === password);
    
    if (user) {
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(user));
      }
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
      <div>
        <label>
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          Remember me
        </label>
      </div>
      <button type="submit">Login</button>
      <div>
        <a href="#signup">Signup</a> | <a href="#forgot-password">Forgot Password</a>
      </div>
    </form>
  );
};

export default Login;
