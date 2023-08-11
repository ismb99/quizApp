import React, { useState, useEffect } from "react";
import he from "he";
import "./index.css";

export default function App() {
  const [quizData, setQuizData] = useState([]);

  console.log("HDHDH");

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.results.map((quiz) => ({
          ...quiz,
          question: he.decode(quiz.question),
          answers: [
            ...quiz.incorrect_answers.map((answer) => he.decode(answer)),
            he.decode(quiz.correct_answer),
          ],
        }));

        setQuizData(decodedData);
      });
  }, []);

  const renderQuizItems = () => {
    return quizData.map((quiz, index) => (
      <div className="quiz-container" key={index}>
        <div className="quiz-info">
          <h2>{quiz.question}</h2>
        </div>
        <div className="card-container">
          <div className="card-row">
            {quiz.answers.map((answer, iaIndex) => (
              <p
                className={`card ${
                  answer === quiz.correct_answer ? "correct-answer" : ""
                }`}
                key={iaIndex}
              >
                {answer}
              </p>
            ))}
          </div>
          <hr />
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      {quizData.length > 0 ? renderQuizItems() : <p>Loading...</p>}
    </div>
  );
}
