import { useState, useEffect } from "react";

export default function GetQuestionList() {
  const [questionList, setQuestionList] = useState([]);
  const url =
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestionList(data.results);
      });
  });
}
