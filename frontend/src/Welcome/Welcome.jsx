import React, { useEffect }from "react";
import "./Welcome.css";

function Welcome() {
  const handleClick = () => {
    // change port if 3001 or 3000
    window.location.assign("http://localhost:3000/Login");
  };

  // title
  useEffect(() => {
    document.title = 'Welcome To Order System';
  }, []);

  return (
    <div id="welcome-component">
      <h1 id="hello-text">歡迎光臨!</h1>
      <button onClick={handleClick}>開始</button>
    </div>
  );
}

export default Welcome;
