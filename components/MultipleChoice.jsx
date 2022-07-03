import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";

const MultipleChoice = ({
  userId,
  setQuestionsCounter,
  answerList,
  questionId,
}) => {
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
    <>
      {Object.keys(answerList[0]).map((el) => {
        if (el != "id")
          return (
            <>
              <input
                type="radio"
                name="true"
                id="key"
                value={el}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="">{answerList[0][el]}</label>
            </>
          );
      })}
      <button onClick={handleSubmit}>Next</button>
    </>
  );
};

export default MultipleChoice;
