import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
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
      <input
        type="radio"
        value={"false"}
        name="true"
        id=""
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="">true</label>
      <input
        type="radio"
        name="false"
        value={"true"}
        id=""
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="">false</label>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default TrueFalse;
