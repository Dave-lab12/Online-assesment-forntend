import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";

const ShortAnswer = ({
  userId,
  setQuestionsCounter,

  questionId,
}) => {
  const [answer, setAnswer] = useState({});
  console.log(questionId);
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
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(e) => handleChange(e)}
      ></textarea>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default ShortAnswer;
