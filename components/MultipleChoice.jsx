import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";

const MultipleChoice = ({
  userId,
  setQuestionsCounter,
  answerList,
  questionsCounter,
}) => {
  const [answer, setAnswer] = useState({});

  const handleSubmit = async () => {
    const sendAnswer = await axios.post(`${BASE_URL}/answers`, {
      data: { ...answer, intern: userId },
    });

    if (sendAnswer.status === 200) {
      setQuestionsCounter((questionsCounter) => questionsCounter + 1);
    }
  };
  console.log(answerList);
  return (
    <>
      {Object.keys(answerList[0]).map((el) => {
        console.log(el);
        return (
          <>
            <input
              type="radio"
              name="true"
              id="key"
              value={el}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">{answerList[el]}</label>
          </>
        );
      })}
      <button onClick={handleSubmit}>Next</button>
    </>
  );
};

export default MultipleChoice;
