import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Button, Result } from "antd";
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
      <Result
        status="success"
        title="