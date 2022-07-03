import React, { useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";
import Completed from "./completed";
import ShortAnswer from "../components/ShortAnswer";
import MultipleChoice from "../components/MultipleChoice";
import TrueFalse from "../components/TrueFalse";
import Router from "next/router";

const question = () => {
  const [questionsCounter, setQuestionsCounter] = useState(0);
  const { userData, questions } = useContext(UserDataContext);

  if (questions.length <= questionsCounter) {
    return <Completed />;
  }
  let singleQuestion = questions[questionsCounter].attributes;
  let singleQuestionId = questions[questionsCounter].id;
  console.log(singleQuestion);

  if (singleQuestion.QuestionType[0].typeOfQuestion === "isShortAnswer") {
    return (
      <div>
        <span>{singleQuestion.timeToFinish}</span>
        <h1>{singleQuestion.Title}</h1>
        <ShortAnswer
          setQuestionsCounter={setQuestionsCounter}
          userId={userData.id}
          questionsCounter={questionsCounter}
          questionId={singleQuestionId}
        />
      </div>
    );
  }
  if (singleQuestion.QuestionType[0].typeOfQuestion === "isMultipleChoice") {
    return (
      <div>
        <span>{singleQuestion.timeToFinish}</span>
        <h1>{singleQuestion.Title}</h1>
        <MultipleChoice
          answerList={singleQuestion.QuestionType[0].isMultiple}
          setQuestionsCounter={setQuestionsCounter}
          userId={userData.id}
          questionsCounter={questionsCounter}
          questionId={singleQuestionId}
        />
      </div>
    );
  }
  if (singleQuestion.QuestionType[0].typeOfQuestion === "isTrueFalse") {
    return (
      <div>
        <span>{singleQuestion.timeToFinish}</span>
        <h1>{singleQuestion.Title}</h1>
        <TrueFalse
          setQuestionsCounter={setQuestionsCounter}
          userId={userData.id}
          questionsCounter={questionsCounter}
          questionId={singleQuestionId}
        />
      </div>
    );
  }
};
export default question;

//todo: check if user is logged in and if not redirect to login page
//todo: get questions list from server
//todo: set quesion length to the context
//todo: render the questions
//todo: check if user is sending asking from the number of questions
