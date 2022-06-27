import React from "react";
import MultipleChoice from "./MultipleChoice";
import ShortAnswer from "./ShortAnswer";
import TrueFalse from "./TrueFalse";

const QuestionTypeCheck = ({ typeOfQuestion }) => {
  if (typeOfQuestion === "isMultipleChoice") {
    <MultipleChoice />;
  } else if (typeOfQuestion === "isShortAnswer") {
    <ShortAnswer />;
  } else if (typeOfQuestion === "isTrueFalse") {
    <TrueFalse />;
  }
};

export default QuestionTypeCheck;
