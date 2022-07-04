import React, { useEffect, useState } from "react";

const TimeCountDown = ({ date }) => {
  const stringTimeConvert = (time) => {
    const timeArray = time.split(":");
    const hours = timeArray[0];
    const minutes = timeArray[1];
    const seconds = timeArray[2];
    return { hours, minutes, seconds };
  };
  const fomratDate = new Date().setTime("00:02:00.00".split(":").join(""));
  const now = new Date().getTime();
  console.log(new Date().setTime(fomratDate));

  const [time, setTime] = useState(fomratDate);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [initialTime, setInitialTime] = useState(new Date());
  const speed = 1000; //seconds
  function decreaseTime() {
    setTime((time) => time - now);
    setMin(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    setSec(Math.floor((time % (1000 * 60)) / 1000));
  }
  useEffect(() => {
    const interval = setInterval(decreaseTime, speed);
    if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {min}:{sec}g
    </div>
  );
};

export default TimeCountDown;
