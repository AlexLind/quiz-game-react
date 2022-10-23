import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";


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
    if (nextQuestion < questionList.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    const getQuestions = async function () {
      const baseURL =
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
      const response = await axios.get(baseURL);
      const data = response.data;
      console.log("data results", data.results);
      setQuestionList(data.results);
    };
    getQuestions();
  }, []);

  console.log(questionList.correct_answer);

  return questionList.length ? (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
          Your score is {score} out of {questionList.length}
        </section>
      ) : (
        <>
          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{questionList.length}
            </h1>
            <p>{questionList[currentQuestion].question}</p>
          </section>

          <section className="answer-section">
            {questionList[currentQuestion].incorrect_answers.map((item) => (
              <button onClick={() => handleClick(false)}>{item}</button>
            ))}
            <button onClick={() => handleClick(true)}>
              {questionList[currentQuestion].correct_answer}
            </button>
          </section>
        </>
      )}
    </div>
  ) : (
    <div className="app">
      <section className="question-section">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </section>
    </div>
  );
}
