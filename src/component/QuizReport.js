import React from "react";
import styles from "../app/page.module.css";
import { Table } from 'semantic-ui-react';


const QuizReport = ({ quizData }) => {
  return (
    <div className={styles.quizReportContainer}>
      <h1 className={styles.quizReportTitle}>Quiz Report</h1>
      <p>
        Number of Correct Answers:{" "}
        {quizData.filter((response) => response && response.correctAnswer === response.userAnswer).length}
      </p>
      <p>
        Total Questions Answered:{" "}
        {quizData.filter((response) => response !== null).length}
      </p>

      <Table celled striped selectable size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No.</Table.HeaderCell>
          <Table.HeaderCell>Questions</Table.HeaderCell>
          <Table.HeaderCell>Correct Answer</Table.HeaderCell>
          <Table.HeaderCell>Your Answers</Table.HeaderCell>
          <Table.HeaderCell>Result</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {quizData.map((item, i) => (
          <Table.Row key={i + 1}>
          {item ? (
            <>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>{item.question}</Table.Cell>
            <Table.Cell>{item.correctAnswer}</Table.Cell>
            <Table.Cell>{item.userAnswer}</Table.Cell>
            <Table.Cell>{item.correctAnswer === item.userAnswer ? "Correct" : "Incorrect"}</Table.Cell>
            </>
            ) : (
              <></>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
  );
};

export default QuizReport;
