import React from 'react';
import './Welcome.css';
function Welcome() {
  const handleClick = () => {
    window.location.assign("http://localhost:3001/Login");
  };

  return (
    <div id="welcome-component">
      <h1 id="hello-text">歡迎光臨!</h1>
      <button onClick={handleClick}>開始</button>
    </div>
  )
}

export default Welcome;