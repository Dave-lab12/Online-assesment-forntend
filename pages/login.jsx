import React, { useState } from "react";
import axios from "axios";

const login = () => {
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      await axios.post("/api/login", { ...userData });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        name="email"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleSubmit}>login</button>
    </div>
  );
};

export default login;
