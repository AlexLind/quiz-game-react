import React from "react";
import "./App.css";
import { questions } from "./utils/questions";
import { useState, useEffect } from "react";
import axios from "axios";
// import questionList from "./utils/fetchQuestions";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionList, setQuestionList] = useState([]);


  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    const getQuestions = async function () {
      const baseURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
      const response = await axios.get(baseURL);
      const data = response.data;
      console.log("data results", data.results);
      setQuestionList(data.results)
    }
    getQuestions();
    console.log(questionList)
  }, [])


  console.log(questionList)

  return (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
          Your score is {score} out of {questions.length}
        </section>
      ) : (
        <>
          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <p>{questions[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section">
            {questions[currentQuestion].answerOptions.map((item) => (
              <button onClick={() => handleClick(item.isCorrect)}>
                {item.answerText}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
