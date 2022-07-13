import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import { UserDataContext } from "../context/userContext";
import Router from "next/router";
import ShortAnswer from "../components/ShortAnswer";
import MultipleChoice from "../components/MultipleChoice";
import TrueFalse from "../components/TrueFalse";
import TimeCountDown from "../components/timeCountDown";
import styles from "../styles/questions.module.css";
import Completed from "./complited";
import { Button, Result, notification } from "antd";
const question = () => {
  const [questionsCounter, setQuestionsCounter] = useState(0);
  const { userData, questions } = useContext(UserDataContext);
  const singleQuestion = questions[questionsCounter]?.attributes;
  const singleQuestionId = questions[questionsCounter]?.id;
  const [answer, setAnswer] = useState("null");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tabSwitch, setTabSwitch] = useState(0);
  const [copyTitle, setCopyTitle] = useState(false);
  const [pasteAnswer, setPasteAnswer] = useState(false);
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: `warning`,
      description: content,
      placement,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    console.log(tabSwitch, " time tabs switched");
    console.log(copyTitle, " copied the title");
    console.log(pasteAnswer, " paste the answer");
    try {
      const sendAnswer = await axios.post(`${BASE_URL}/answers`, {
        data: {
          Answer: answer,
          question: singleQuestionId,
          intern: userData.id,
        },
      });

      if (sendAnswer.status === 200) {
        setQuestionsCounter((questionsCounter) => questionsCounter + 1);
        setLoading(false);
        setAnswer("null");
        setCopyTitle(false);
        setPasteAnswer(false);
        setTabSwitch(0);
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

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setTabSwitch(tabSwitch++);
  };
  useEffect(() => {
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();

    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);
  const handleTitleCopy = () => {
    setCopyTitle(true);
  };
  if (questions.length <= questionsCounter) {
    return <Completed />;
  }
  if (singleQuestion?.QuestionType[0]?.typeOfQuestion === "isShortAnswer") {
    return (
      <div className={styles.questionsContainer}>
        <TimeCountDown
          date={singleQuestion.timeToFinish}
          setQuestionsCounter={setQuestionsCounter}
          questionsCounter={questionsCounter}
        />
        <h1 onCopy={handleTitleCopy}>{singleQuestion.Title}</h1>
        <ShortAnswer
          questionsCounter={questionsCounter}
          setAnswer={setAnswer}
          setPasteAnswer={setPasteAnswer}
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
  }
  if (singleQuestion?.QuestionType[0]?.typeOfQuestion === "isMultipleChoice") {
    return (
      <div className={styles.questionsContainer}>
        <TimeCountDown
          date={singleQuestion.timeToFinish}
          setQuestionsCounter={setQuestionsCounter}
          questionsCounter={questionsCounter}
        />
        <h1 onCopy={handleTitleCopy}>{singleQuestion.Title}</h1>
        <MultipleChoice
          answerList={singleQuestion.QuestionType[0].isMultiple}
          questionsCounter={questionsCounter}
          setAnswer={setAnswer}
          answer={answer}
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
  }
  if (singleQuestion?.QuestionType[0]?.typeOfQuestion === "isTrueFalse") {
    return (
      <div className={styles.questionsContainer}>
        <TimeCountDown
          date={singleQuestion.timeToFinish}
          setQuestionsCounter={setQuestionsCounter}
          questionsCounter={questionsCounter}
        />
        <h1 onCopy={handleTitleCopy}>{singleQuestion.Title}</h1>
        <TrueFalse questionsCounter={questionsCounter} setAnswer={setAnswer} />
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
  }
  if (Object.keys(userData).length >= 0 || Object.keys(questions).length >= 0) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="looks like you are lost."
        extra={
          <Button type="primary" onClick={() => Router.push("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
};
export default question;

//todo: check if user is logged in and if not redirect to login page
//todo: get questions list from server
//todo: set quesion length to the context
//todo: render the questions
//todo: check if user is sending asking from the number of questions
