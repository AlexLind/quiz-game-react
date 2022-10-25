import React from "react";
import Button from "@mui/material/Button";


export default function ShowScore({
  score,
  handleRestart,
  questionList,
  AnswersList
}) {
  console.log(AnswersList);
  return <section className="showScore-section">
          Your score is {score} out of {questionList.length} <br />
          <div className="answers-list">
            <ul>
              {AnswersList.map((answer, index) => (
                <>
                <li>
                  <span className={`answer-${answer.isCorrect}`}>Q{index + 1}: { atob(answer.answerText)}</span>
                </li>
                <br />
                </>
              ))}
            </ul>
          </div>
          <Button variant="contained" size="large" onClick={handleRestart}>
            Restart
          </Button>
        </section>;
}