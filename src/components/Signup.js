import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!idRegex.test(id)) {
      alert('ID must contain only numbers and letters');
      return;
    }
    if (password.length < 4) {
      alert('Password must be at least 4 characters long');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check if ID already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.id === id);
    if (existingUser) {
      alert('ID already exists. Please choose a different ID.');
      return;
    }

    const newUser = { id, password, name, birthDate };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    onSignup(newUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Birth Date (Numbers only):</label>
        <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
