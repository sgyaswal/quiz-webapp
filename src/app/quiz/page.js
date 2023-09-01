"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import NavigationPanel from "@/component/NavigationPanel";
import Question from "@/component/Question";

const QuizPage = () => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(1800); // 30 minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sampleQuestions, setSampleQuestions] = useState({});
  const [userAnswers, setUserAnswers] = useState(Array(0));
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=15");
        const data = await response.json();
        setSampleQuestions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      clearInterval(countdown);
      handleShowResult(); // Auto-submit the quiz
    }

    return () => clearInterval(countdown);
  }, [remainingTime]);

  const handleSelectAnswer = (selectedAnswer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);
  };

  const handleNavigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.results.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleShowResult();
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
    // Calculate score and other results here
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.quizContainer}>
        <div className={styles.timer}>
          <div className={styles.title}>Quiz Application</div>
          <div className={styles.timer11}>
            <div className={styles.time_left_txt}>Time Left</div>
            <div className={styles.timer1}>
              {Math.floor(remainingTime / 60)}:{remainingTime % 60}
            </div>
          </div>
        </div>
        <Question
          sampleQuestions={sampleQuestions}
          currentQuestionIndex={currentQuestionIndex}
          handleSelectAnswer={handleSelectAnswer}
          showResult={showResult}
          handleNextQuestion={handleNextQuestion}
        />
      </div>
      <NavigationPanel
        sampleQuestions={sampleQuestions}
        currentQuestionIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        handleNavigateToQuestion={handleNavigateToQuestion}
      />
    </div>
  );
};

export default QuizPage;
