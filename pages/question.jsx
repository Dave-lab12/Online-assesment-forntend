import React, { useEffect, useState, useContext } from "react";
import { UserDataContext } from "../context/userContext";
import Completed from "./completed";
import ShortAnswer from "../components/ShortAnswer";
import MultipleChoice from "../components/MultipleChoice";
import TrueFalse from "../components/TrueFalse";
import { useRouter } from "next/router";
import TimeCountDown from "../components/timeCountDown";
import styles from "../styles/questions.module.css";
const question = () => {
  const [questionsCounter, setQuestionsCounter] = useState(0);
  const { userData, questions } = useContext(UserDataContext);
  const singleQuestion = questions[questionsCounter]?.attributes;
  const singleQuestionId = questions[questionsCounter]?.id;
  const router = useRouter();

  if (questions.length <= questionsCounter) {
    return <Completed />;
  }

  if (singleQuestion?.QuestionType[0]?.typeOfQuestion === "isShortAnswer") {
    return (
      <div className={styles.questionsContainer}>
        <TimeCountDown
          date={singleQuestion.timeToFinish}
          setQuestionsCounter={setQuestionsCounter}
        />
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
  if (singleQuestion?.QuestionType[0]?.typeOfQuestion === "isMultipleChoice") {
    return (
      <div className={styles.questionsContainer}>
        <TimeCountDown
          date={singleQuestion.timeToFinish}
          setQuestionsCounter={setQuestionsCounter}
        />
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
  if (singleQuestion?.QuestionType[0]?.typeOfQuestion === "isTrueFalse") {
    return (
      <div className={styles.questionsContainer}>
        <TimeCountDown
          date={singleQuestion.timeToFinish}
          setQuestionsCounter={setQuestionsCounter}
        />
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
  if (Object.keys(userData).length >= 0 || Object.keys(questions).length >= 0) {
    return (
      <>
        <h1>looks like you are lost</h1>
        <button onClick={() => router.replace("/")}>Go to home page</button>
      </>
    );
  }
};
export default question;

//todo: check if user is logged in and if not redirect to login page
//todo: get questions list from server
//todo: set quesion length to the context
//todo: render the questions
//todo: check if user is sending asking from the number of questions
