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
      let updatedQuestions = new Array(data.results.length).fill(null).map(() => ({
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
        console.log("iterator is: ", i, "object is: ", updatedQuestions);
        for (let k = updatedQuestions[i].answerOptions.length - 1; k > 0; k--) {
          const j = Math.floor(Math.random() * (k + 1));
          const temp = updatedQuestions[i].answerOptions[k];
          updatedQuestions[i].answerOptions[k] = updatedQuestions[i].answerOptions[j];
          updatedQuestions[i].answerOptions[j] = temp;
        }
      }
      setQuestionList(updatedQuestions);
    };
    getQuestions();
  }, []);

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
            <p>{questionList[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section">
            {questionList[currentQuestion].answerOptions.map((item) => (
              <button onClick={() => handleClick(item.isCorrect)}>{item.answerText}</button>
            ))}
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
