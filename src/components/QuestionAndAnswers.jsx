import React from "react";
import Button from "@mui/material/Button";

export default function QuestionAndAnswers({
  currentQuestion,
  questionList,
  handleClick,
}) {
  return (
    <>
      <section className="question-section">
        <h1>
          Question {currentQuestion + 1}/{questionList.length}
        </h1>
        <p>{atob(questionList[currentQuestion].questionText)}</p>
      </section>

      <section className="answer-section">
        {questionList[currentQuestion].answerOptions.map((item, index) => (
          <Button
            variant="text"
            size="large"
            key={index}
            onClick={() => handleClick(item.isCorrect)}
          >
            {atob(item.answerText)}
          </Button>
        ))}
      </section>
    </>
  );
}
