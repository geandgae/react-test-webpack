import React, { useState } from 'react';

const Avatar = () => {
  // Using useState hook to declare state variables
  const [count, setCount] = useState(0); // Example of state variable 'count' initialized to 0

  // Other component logic

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Avatar;
