import React from "react";
import styles from "../styles/questions.module.css";
import { Radio } from "antd";
const MultipleChoice = ({ answerList, setAnswer, answer }) => {
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  return (
    <div className={styles.choiceContainer}>
      <Radio.Group
        name="choice"
        style={{ display: "flex", flexDirection: "column" }}
        size={"large"}
        value={answer}
        onChange={(e) => handleChange(e)}
      >
        {Object.keys(answerList[0]).map((el) => {
          if (el != "id" && answerList[0][el])
            return (
              <Radio value={el} style={{ margin: "20px 0" }}>
                {answerList[0][el]}
              </Radio>
            );
        })}
      </Radio.Group>
    </div>
  );
};

export default MultipleChoice;
