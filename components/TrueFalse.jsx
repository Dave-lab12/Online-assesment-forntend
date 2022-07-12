import React from "react";

import { Radio, Button } from "antd";
import styles from "../styles/questions.module.css";

const TrueFalse = ({ setAnswer }) => {
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  return (
    <div className={styles.trueFalseCntainer}>
      <Radio.Group
        name="choice"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Radio
          value="false"
          onChange={(e) => handleChange(e)}
          style={{ margin: "20px 0" }}
        >
          False
        </Radio>
        <Radio
          value="true"
          onChange={(e) => handleChange(e)}
          style={{ margin: "20px 0" }}
        >
          true
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default TrueFalse;
