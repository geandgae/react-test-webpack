import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');

  const validateId = (value) => {
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!idRegex.test(value)) {
      setIdError('ID must contain only numbers and letters');
    } else {
      setIdError('');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.id === value);
    if (existingUser) {
      setIdError('ID already exists. Please choose a different ID.');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 4) {
      setPasswordError('Password must be at least 4 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateBirthDate = (value) => {
    const birthDateRegex = /^[0-9]+$/;
    if (!birthDateRegex.test(value)) {
      setBirthDateError('Birth Date must contain only numbers');
    } else {
      setBirthDateError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (idError || passwordError || confirmPasswordError || birthDateError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.id === id);
    if (existingUser) {
      setIdError('ID already exists. Please choose a different ID.');
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
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            validateId(e.target.value);
          }}
          required
        />
        {idError && <p style={{ color: 'red' }}>{idError}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
          }}
          required
        />
        {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Birth Date (Numbers only):</label>
        <input
          type="text"
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
            validateBirthDate(e.target.value);
          }}
          required
        />
        {birthDateError && <p style={{ color: 'red' }}>{birthDateError}</p>}
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
