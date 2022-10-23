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
    if (nextQuestion < questionList.length) {
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
  }, [])

  const pageIsLoaded = async function () {
    return questionList.length
  }


  console.log(questionList.correct_answer)

  return ( 
    (
      questionList.length
    ? <div className="app">
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
                  <button onClick={() => handleClick(false)}>
                    {item}
                  </button>
                ))}
                <button onClick={() => handleClick(true)}>
                    {questionList[currentQuestion].correct_answer}
                  </button>
              </section>
            </>
          )}
        </div>
    : <h1>Loading page...</h1>
    )
  );
}
