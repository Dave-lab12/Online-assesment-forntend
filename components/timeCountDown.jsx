import React, { useEffect, useState } from "react";
import styles from "../styles/questions.module.css";
const TimeCountDown = (props) => {
  const { date, setQuestionsCounter, questionsCounter, setTime } = props;
  const getTimeFromString = (str) => {
    const splitText = str.split(":");
    const seconds = Number(splitText[0]);
    const minute = Number(splitText[1]);
    const hour = Number(splitText[2]);
    return { hour, minute, seconds };
  };
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const speed = 1000; //seconds
  const timeInterval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timeInterval);
        moveToNextQuestion();
        // console.log("time is up");
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
  }, speed);

  useEffect(() => {
    const time = getTimeFromString(date);
    setMinutes(time.minute);
    setSeconds(time.seconds);
  }, [props]);

  useEffect(() => {
    setTime(`${time.hour}:${time.minute}:${time.seconds}`);
    timeInterval;
    return () => {
      clearInterval(timeInterval);
    };
  });

  const moveToNextQuestion = () => {
    setQuestionsCounter((questionsCounter) => questionsCounter + 1);
  };

  return (
    <>
      {minutes === 0 && seconds === 0 ? (
        "Time is Up"
      ) : (
        <h1 className={styles.counter}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </>
  );
};

export default TimeCountDown;
