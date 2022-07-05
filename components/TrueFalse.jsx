import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import { Radio, Button, notification } from "antd";
import styles from "../styles/questions.module.css";

const TrueFalse = ({ userId, setQuestionsCounter, questionId }) => {
  const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const sendAnswer = await axios.post(`${BASE_URL}/answers`, {
        data: { Answer: answer, intern: userId, question: questionId },
      });

      if (sendAnswer.status === 200) {
        setQuestionsCounter((questionsCounter) => questionsCounter + 1);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: `warning`,
      description: content,
      placement,
    });
  };
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  useEffect(() => {
    if (error) {
      openNotification(
        "top",
        "error",
        "Something Went Wrong Please contact support"
      );
    }
  }, [error]);
  return (
    <div className={styles.trueFalseCntainer}>
      <Radio.Group
        name="choice"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Radio
          value="false"
          onChange={(e) => handleChange(e)}
          style={{ margin: "20px 0" }}
        >
          False
        </Radio>
        <Radio
          value="true"
          onChange={(e) => handleChange(e)}
          style={{ margin: "20px 0" }}
        >
          true
        </Radio>
      </Radio.Group>

      <Button
        style={{ display: "flex", margin: "auto" }}
        type="primary"
        loading={loading}
        size={"large"}
        onClick={handleSubmit}
      >
        Next Question
      </Button>
    </div>
  );
};

export default TrueFalse;
