import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

import Router from "next/router";
import { BASE_URL } from "../Api";
const Home = () => {
  const { userData, setUserData, setQuestions } = useContext(UserDataContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const sendUser = await axios.post(BASE_URL + "/interns", {
        data: userData,
      });
      setUserData({ ...userData, id: sendUser.data.data.id });
      const { data } = await axios.get(
        `${BASE_URL}/questions?populate[QuestionType][populate]=isMultiple`
      );
      setQuestions(data.data);
      setLoading(false);
      // await Router.push("/question");
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Hello and welcome to icog online assesmet program</h1>
      <p>please type in your name and email </p>
      {error && (
        <p style={{ color: "red" }}>
          Something went Wrong make sure your email is not registered before and
          you have a proper internet connection
        </p>
      )}
      <label>Candidates Name</label>
      <input type="text" onChange={(e) => handleChange(e)} name="Name" />
      <label>Candidates Email</label>
      <input type="text" onChange={(e) => handleChange(e)} name="Email" />
      <button onClick={handleSubmit}>
        Start the assesment {loading && "loading "}
      </button>
    </div>
  );
};

export default Home;
