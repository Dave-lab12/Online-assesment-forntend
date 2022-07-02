import React, { useContext } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

import Router from "next/router";
import question from "./question";
import { BASE_URL } from "../Api";
const Home = () => {
  const { userData, setUserData, setQuestions } = useContext(UserDataContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const sendUser = await axios.post(BASE_URL + "/interns", {
        data: userData,
      });
      setUserData({ ...userData, id: sendUser.data.data.id });
      const { data } = await axios.get(
        `${BASE_URL}/questions?populate[QuestionType][populate]=isMultiple`
      );
      setQuestions(data.data);
      await Router.push("/question");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Hello and welcome to icog online assesmet programme</h1>
      <p>please type in your name and email </p>

      <label>Candidates Name</label>
      <input type="text" onChange={(e) => handleChange(e)} name="Name" />
      <label>Candidates Email</label>
      <input type="text" onChange={(e) => handleChange(e)} name="Email" />
      <button onClick={handleSubmit}>Start the assesment</button>
    </div>
  );
};

export default Home;
