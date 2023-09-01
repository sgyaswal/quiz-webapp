
import React from "react";
import styles from "../app/page.module.css";

const Question = ({
  sampleQuestions,
  currentQuestionIndex,
  handleSelectAnswer,
  showResult,
  handleNextQuestion,
}) => {
  return (
    <div className={styles.questionContainer}>
      {sampleQuestions.results && (
        <div>
          <p>Type: {sampleQuestions.results[currentQuestionIndex].type}</p>
          <p>Difficulty: {sampleQuestions.results[currentQuestionIndex].difficulty}</p>
          <p>
            {sampleQuestions.results[currentQuestionIndex].question}
          </p>
          <ul className={styles.choicesList}>
            {sampleQuestions.results[currentQuestionIndex].incorrect_answers.map(
              (choice, index) => (
                <li
                  key={index}
                  className={styles.choiceItem}
                  onClick={() => handleSelectAnswer(choice)}
                >
                  {choice}
                </li>
              )
            )}
            <li
              className={styles.choiceItem}
              onClick={() =>
                handleSelectAnswer(
                  sampleQuestions.results[currentQuestionIndex]
                    .correct_answer
                )
              }
            >
              {sampleQuestions.results[currentQuestionIndex].correct_answer}
            </li>
          </ul>
        </div>
      )}
      {!showResult && (
        <button className={styles.nextButton} onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
      {showResult && (
        // Logic to display results
        <div className={styles.result}>
          {/* Display user's score and other information */}
        </div>
      )}
    </div>
  );
};

export default Question;
