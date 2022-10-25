import Loading from "./components/Loading";
import QuestionAndAnswers from "./components/QuestionAndAnswers";
import ShowScore from "./components/ShowScore";
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "./utils/url";
import {
  shuffleQuestionsArray,
  populateQuestionsArray,
} from "./utils/functions";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [restarts, setRestarts] = useState(0);

  useEffect(() => {
    getQuestions();
  }, [restarts]);

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

    data.results.map((question, index) => {
      populateQuestionsArray(updatedQuestions, index, question);
      shuffleQuestionsArray(updatedQuestions, index);
    });
    setQuestionList(updatedQuestions);
  };

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
        <ShowScore
          questionList={questionList}
          score={score}
          handleRestart={handleRestart}
        />
      ) : (
        <QuestionAndAnswers
          questionList={questionList}
          currentQuestion={currentQuestion}
          handleClick={handleClick}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}
