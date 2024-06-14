import React, { useState } from 'react';

const ForgotPassword = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.name === name && user.birthDate === birthDate);

    if (!foundUser) {
      setError('User not found. Please check your name and birth date.');
      setShowCredentials(false);
    } else {
      setError('');
      setId(foundUser.id);
      setPassword(foundUser.password);
      setShowCredentials(true);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Birth Date:</label>
          <input
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Retrieve Credentials</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showCredentials && (
        <div>
          <p>Here are your credentials:</p>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Password:</strong> {password}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
