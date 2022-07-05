import axios from "axios";
import QuestionType from '../components/QuestionTypeCheck'
import { useState, useEffect } from "react";
const Test = () => {
  const [userData, setUserData] = useState({});
  const [counter, setCounter] = useState(0);
  const [begin, setBegin] = useState(false);
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [questionQuantity, setQuestionsQuantity] = useState(0);

  const BASE_URL = "http://localhost:1337/api";

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (counter <= 0) {
      try {
        const sendUser = await axios.post(BASE_URL + "/interns", {
          data: userData,
        });
        setUserData({ ...userData, id: sendUser.data.data.id });
        const { data } = await axios.get(`${BASE_URL}/questions`);
        setQuestionsQuantity(data.data.length);
      } catch (error) {
        console.log(error);
      } finally {
        return setCounter((counter) => counter + 1);
      }
    }

    const sendAnswer = await axios.post(`${BASE_URL}/answers`, {
      data: { ...answer, intern: userData.id },
    });
    if (sendAnswer.status === 200) {
      setCounter((counter) => counter + 1);
    }
  };
  useEffect(() => {
    if (counter > 0) {
      getQuestion(counter);
    }
  }, [counter]);

  const getQuestion = async (number) => {
    try {
      const resQuestion = await axios.get(`${BASE_URL}/questions/${number}`);
      setQuestion(resQuestion.data);
      setBegin(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (counter > questionQuantity) {
    return <h1>Congradualtions you have complited the assesment </h1>;
  }
  return (
    <div>
      {!begin ? (
        <>
          <label>Candidates Name</label>
          <input type="text" onChange={(e) => handleChange(e)} name="Name" />
          <label>Candidates Email</label>
          <input type="text" onChange={(e) => handleChange(e)} name="Email" />
        </>
      ) : (
        question && (
          <>
            <h1>{question.data.attributes.Title}</h1>
            <QuestionType
              typeOfQuestion={
                question.data.attributes.QuestionType[0]?.typeOfQuestion
              }
            />

            {/* <input
              type="text"
              onChange={(e) =>
                setAnswer({
                  Answer: e.target.value,
                  question: question.data.id,
                })
              }
            /> */}
          </>
        )
      )}

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};
export default Test;
//http://localhost:1337/api/questions?populate[QuestionType][populate]=isMultiple
// http://localhost:1337/api/interns?populate[answers][populate]=question

// send username

//get approval

//get question

// send answer with question and user id
