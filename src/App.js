import ChooseDifficulty from "./components/ChooseDifficulty";
import Loading from "./components/Loading";
import QuestionAndAnswers from "./components/QuestionAndAnswers";
import ShowScore from "./components/ShowScore";
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [AnswersList, setAnswersList] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    getQuestions();
  }, [restarts, difficulty]);

  const getQuestions = async function () {
    const baseURL = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}&type=multiple&encode=base64`;
    console.log(baseURL);
    const response = await axios.get(baseURL);
    const data = response.data;
    let updatedQuestions = new Array(data.results.length)
      .fill(null)
      .map(() => ({
        questionText: "",
        answerOptions: [],
      }));

    // eslint-disable-next-line array-callback-return
    data.results.map((question, index) => {
      populateQuestionsArray(updatedQuestions, index, question);
      shuffleQuestionsArray(updatedQuestions, index);
    });
    setQuestionList(updatedQuestions);
  };

  const handleClick = (item) => {
    if (item.isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    setAnswersList([...AnswersList, item]);
    if (nextQuestion < questionList.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setRestarts((prev) => prev + 1);
    setQuestionList([]);
    setCurrentQuestion(0);
    setDifficulty("");
    setShowScore(false);
    setAnswersList([]);
    setScore(0);
  };

  const handleChange = (event) => {
    setQuestionList([]);
    setDifficulty(event.target.value);
  };

  return !difficulty ? (
    <div className="app">
      <ChooseDifficulty difficulty={difficulty} handleChange={handleChange} />
    </div>
  ) : questionList.length ? (
    showScore ? (
      <div className="app">
        <ShowScore
          questionList={questionList}
          score={score}
          handleRestart={handleRestart}
          AnswersList={AnswersList}
        />
      </div>
    ) : (
      <div className="app">
        <QuestionAndAnswers
          questionList={questionList}
          currentQuestion={currentQuestion}
          handleClick={handleClick}
        />
      </div>
    )
  ) : (
    <Loading />
  );
}
