import React from "react";
import Button from "@mui/material/Button";


export default function ShowScore({
  score,
  handleRestart,
  questionList
}) {
  return <section className="showScore-section">
          Your score is {score} out of {questionList.length} <br />
          <div className="wrong-answers-list"> PLACEHOLDER</div>
          <Button variant="contained" size="large" onClick={handleRestart}>
            Restart
          </Button>
        </section>;
}
  