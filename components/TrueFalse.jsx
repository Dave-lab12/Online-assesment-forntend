import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import { Radio, Button, notification } from "antd";
const TrueFalse = ({ userId, setQuestionsCounter, questionId }) => {
  const [answer, setAnswer] = useState({});

  const handleSubmit = async () => {
    const sendAnswer = await axios.post(`${BASE_URL}/answers`, {
      data: { Answer: answer, intern: userId, question: questionId },
    });

    if (sendAnswer.status === 200) {
      setQuestionsCounter((questionsCounter) => questionsCounter + 1);
    }
  };
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  return (
    <div>
      <Radio.Group name="choice">
        <Radio value="false" onChange={(e) => handleChange(e)}>
          False
        </Radio>
        <Radio value="true" onChange={(e) => handleChange(e)}>
          true
        </Radio>
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

export default TrueFalse;
