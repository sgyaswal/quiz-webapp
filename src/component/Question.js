import React, { useState } from "react";
import styles from "../app/page.module.css";
import QuizReport from "./QuizReport";

const Question = ({
  sampleQuestions,
  currentQuestionIndex,
  handleSelectAnswer,
  handleNextQuestion,
  handlePrevQuestion,
  isLastQuestion,
  handleShowResult,
  userAnswers,
}) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Function to handle selecting an answer
  const handleAnswerSelection = (selectedAnswer) => {
    setSelectedChoice(selectedAnswer);
    // Get the current question
    const currentQuestion = sampleQuestions.results[currentQuestionIndex];

    // Create an object to represent the user's response for this question
    const response = {
      questionNumber: currentQuestionIndex + 1,
      correctAnswer: currentQuestion.correct_answer,
      userAnswer: selectedAnswer,
      question: currentQuestion.question,
    };
    console.log(currentQuestion);

    // Call the parent function to handle answer selection
    handleSelectAnswer(response);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    handleShowResult();
  };

  return (
    <div className={styles.questionContainer}>
      {!quizSubmitted && sampleQuestions.results && (
        <div>
          <p className={styles.questionWrapper}>
            Type: {sampleQuestions.results[currentQuestionIndex].type}
          </p>
          <p className={styles.questionWrapper}>
            Difficulty:{" "}
            {sampleQuestions.results[currentQuestionIndex].difficulty}
          </p>
          <p className={styles.questionWrapper}>
            {currentQuestionIndex +
              1 +
              ". " +
              sampleQuestions.results[currentQuestionIndex].question}
          </p>
          <ul className={styles.choicesList}>
            {sampleQuestions.results[
              currentQuestionIndex
            ].incorrect_answers.map((choice, index) => (
              <li
                key={index}
                className={`${styles.choiceItem} ${
                  selectedChoice === choice ? styles.selectedChoice : ""
                }`}
                onClick={() => handleAnswerSelection(choice)}
              >
                {choice}
              </li>
            ))}
            <li
              className={`${styles.choiceItem} ${
                selectedChoice ===
                sampleQuestions.results[currentQuestionIndex].correct_answer
                  ? styles.selectedChoice
                  : ""
              }`}
              onClick={() =>
                handleAnswerSelection(
                  sampleQuestions.results[currentQuestionIndex].correct_answer
                )
              }
            >
              {sampleQuestions.results[currentQuestionIndex].correct_answer}
            </li>
          </ul>
        </div>
      )}
      {!quizSubmitted && currentQuestionIndex > 0 && (
        <button
          className={styles.prevButton}
          onClick={handlePrevQuestion}
        >
          Previous Question
        </button>
      )}
      {!isLastQuestion && !quizSubmitted && (
        <button className={currentQuestionIndex==0 ? styles.prevButton : styles.nextButton} onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
      {isLastQuestion && !quizSubmitted && (
        <button className={styles.submitButton} onClick={handleQuizSubmit}>
          Submit
        </button>
      )}
      {quizSubmitted && <QuizReport quizData={userAnswers} />}
    </div>
  );
};

export default Question;
