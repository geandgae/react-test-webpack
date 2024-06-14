import React from 'react';

const LoggedInUser = ({ user, onLogout }) => {
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Birth Date:</strong> {user.birthDate}</p>
      {/* <button onClick={onLogout}>Logout</button> */}
    </div>
  );
};

export default LoggedInUser;
