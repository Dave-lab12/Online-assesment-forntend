import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import { Input, Button, notification } from "antd";
import styles from "../styles/questions.module.css";
const ShortAnswer = ({ userId, setQuestionsCounter, questionId }) => {
  const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { TextArea } = Input;
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: `warning`,
      description: content,
      placement,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const sendAnswer = await axios.post(`${BASE_URL}/answers`, {
        data: { Answer: answer, intern: userId, question: questionId },
      });
      if (sendAnswer.status === 200) {
        setQuestionsCounter((questionsCounter) => questionsCounter + 1);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);

      setLoading(false);
    }
  };
  if (error) {
    openNotification(
      "top",
      "error",
      "Something Went Wrong Please contact support"
    );
  }
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
      <Button
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

export default ShortAnswer;
