import React, { useState } from 'react';

const ForgotPassword = () => {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === id);
    
    if (user) {
      alert(`Password for ${id} is: ${user.password}`);
    } else {
      alert('User not found');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <button type="submit">Retrieve Password</button>
    </form>
  );
};

export default ForgotPassword;
