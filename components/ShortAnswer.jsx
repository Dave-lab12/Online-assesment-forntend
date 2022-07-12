import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import { Input } from "antd";
import styles from "../styles/questions.module.css";
const ShortAnswer = ({ userId, setAnswer }) => {
  const { TextArea } = Input;

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  return (
    <div className={styles.shortAnsContainer}>
      <TextArea
        placeholder="Write your answer here"
        autoSize={{ minRows: 5, maxRows: 15 }}
        onChange={(e) => handleChange(e)}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ShortAnswer;
