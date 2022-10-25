function shuffleQuestionsArray(updatedQuestions, index) {
    for (let k = updatedQuestions[index].answerOptions.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      const temp = updatedQuestions[index].answerOptions[k];
      updatedQuestions[index].answerOptions[k] =
        updatedQuestions[index].answerOptions[j];
      updatedQuestions[index].answerOptions[j] = temp;
    }
  }

  function populateQuestionsArray(updatedQuestions, index, question) {
    updatedQuestions[index].questionText = question.question;
    for (let i = 0; i < question.incorrect_answers.length; i++) {
      updatedQuestions[index].answerOptions.push({
        answerText: question.incorrect_answers[i],
        isCorrect: false,
      });
    }
    updatedQuestions[index].answerOptions.push({
      answerText: question.correct_answer,
      isCorrect: true,
    });
  }

  export { shuffleQuestionsArray, populateQuestionsArray }