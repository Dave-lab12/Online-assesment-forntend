import React, { useContext } from "react";
import { UserDataContext } from "../context/userContext";
import Link from "next/link";

const Home = () => {
  const { userData, setUserData } = useContext(UserDataContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(userData);
  };
  return (
    <div>
      <h1>Hello and welcome to icog online assesmet programme</h1>
      <p>please type in your name and email </p>

      <label>Candidates Name</label>
      <input type="text" onChange={(e) => handleChange(e)} name="Name" />
      <label>Candidates Email</label>
      <input type="text" onChange={(e) => handleChange(e)} name="Email" />
      <button onClick={handleSubmit}>
        <Link href="/question">
          <a> Start the assesment</a>
        </Link>{" "}
      </button>
    </div>
  );
};

export default Home;
