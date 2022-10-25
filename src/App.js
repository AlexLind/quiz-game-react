import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "./utils/url";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [restarts, setRestarts] = useState(0);

  useEffect(() => {
    getQuestions();
  }, [restarts]);

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionList.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setRestarts((prev) => prev + 1);
    setCurrentQuestion(0);
    setTimeout(() => setShowScore(false), 300);
    setScore(0);
  };

  return questionList.length ? (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
          Your score is {score} out of {questionList.length} <br />
          <div className="wrong-answers-list"> PLACEHOLDER</div>
          <Button variant="contained" size="large"  onClick={handleRestart}>
            Restart
          </Button>
        </section>
      ) : (
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
      )}
    </div>
  ) : (
    <div className="app">
      <section className="question-section">
        <LoadingButton
          size="large"
          loading
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Fetch data
        </LoadingButton>
      </section>
    </div>
  );

  function getQuestions() {
    const getQuestions = async function () {
      const baseURL = url;
      const response = await axios.get(baseURL);
      const data = response.data;
      let updatedQuestions = new Array(data.results.length)
        .fill(null)
        .map(() => ({
          questionText: "",
          answerOptions: [],
        }));
      for (let i = 0; i < data.results.length; i++) {
        updatedQuestions[i].questionText = data.results[i].question;
        for (let j = 0; j < data.results[i].incorrect_answers.length; j++) {
          updatedQuestions[i].answerOptions.push({
            answerText: data.results[i].incorrect_answers[j],
            isCorrect: false,
          });
        }
        updatedQuestions[i].answerOptions.push({
          answerText: data.results[i].correct_answer,
          isCorrect: true,
        });
        for (let k = updatedQuestions[i].answerOptions.length - 1; k > 0; k--) {
          const j = Math.floor(Math.random() * (k + 1));
          const temp = updatedQuestions[i].answerOptions[k];
          updatedQuestions[i].answerOptions[k] =
            updatedQuestions[i].answerOptions[j];
          updatedQuestions[i].answerOptions[j] = temp;
        }
      }
      setQuestionList(updatedQuestions);
    };
    getQuestions();
  }
}
