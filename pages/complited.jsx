import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
const Completed = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setHeight(window.screen.height), setWidth(window.screen.width);
  }, []);
  return (
    <div>
      <h1>Thank you for taking the assesment</h1>
      <p>you can close this window</p>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default Completed;
