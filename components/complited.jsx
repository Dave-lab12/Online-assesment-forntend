import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Button, Result } from "antd";
const Completed = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const closeWindow = () => {
    self.close();
  };
  useEffect(() => {
    setHeight(window.screen.height), setWidth(window.screen.width);
  }, []);
  return (
    <div>
      <Result
        status="success"
        title="Thank you for taking the Assesment!"
        subTitle="You can close this window"
        extra={[]}
      />
      <Confetti width={width} height={height} />
    </div>
  );
};

export default Completed;
