import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
const Completed = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(setHeight(window.innerHeight), setWidth(window.innerWidth));
    });
    console.log("wtf");
  }, []);
  // const { width, height } = useWindowSize();
  return (
    <div>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default Completed;
