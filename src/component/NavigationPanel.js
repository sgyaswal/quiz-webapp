import React from "react";
import styles from "../app/page.module.css";

const NavigationPanel = ({
  sampleQuestions,
  currentQuestionIndex,
  userAnswers,
  handleNavigateToQuestion,
}) => {
  return (
    <div className={styles.navigationPanel}>
      <h3>Question Overview</h3>
      <div className={styles.gridIndication}>
      <div
        className={styles.gridBox1}
      >Attempted</div>
      <div
        className={styles.gridBox2}
      >Unattempted</div>
    </div>
      <div className={styles.overviewList}>
        {sampleQuestions.results?.map((question, index) => (
          <div
            key={index}
            className={
              currentQuestionIndex === index
                ? styles.overviewItemActive
                : userAnswers[index]
                ? styles.overviewItemAttempted
                : styles.overviewItem
            }
            onClick={() => handleNavigateToQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationPanel;
