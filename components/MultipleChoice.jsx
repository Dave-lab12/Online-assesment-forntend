import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import styles from "../styles/questions.module.css";
import { Radio, Button, notification } from "antd";
const MultipleChoice = ({
  userId,
  setQuestionsCounter,
  answerList,
  questionId,
}) => {
  const [answer, setAnswer] = useState("null");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        data: { Answer: answer, question: questionId, intern: userId },
      });

      if (sendAnswer.status === 200) {
        setQuestionsCounter((questionsCounter) => questionsCounter + 1);
        setLoading(false);
        setAnswer("null");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
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
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  console.log(answer);
  return (
    <div className={styles.choiceContainer}>
      <Radio.Group
        name="choice"
        style={{ display: "flex", flexDirection: "column" }}
        size={"large"}
        value={answer ? answer : "null"}
        // defaultValue={answer}
        onChange={(e) => handleChange(e)}
      >
        {Object.keys(answerList[0]).map((el) => {
          if (el != "id" && answerList[0][el])
            return (
              <Radio value={el} style={{ margin: "20px 0" }}>
                {answerList[0][el]}
              </Radio>
            );
        })}
      </Radio.Group>

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

export default MultipleChoice;
