import React, { useState, useEffect } from "react";
import he from "he"; // Import the "he" library
import "./index.css";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  console.log(quizData);

  // const combinedAnswers = [];
  // function combineArray() {
  //   for (let quiz of quizData) {
  //     combinedAnswers.push(...quiz.incorrect_answers, quiz.correct_answer);
  //   }
  //   return combinedAnswers;
  // }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.results.map((quiz) => ({
          ...quiz,
          question: he.decode(quiz.question),
          incorrect_answers: quiz.incorrect_answers.map((answer) =>
            he.decode(answer)
          ),
          correct_answer: he.decode(quiz.correct_answer),
          all_answers: [
            ...quiz.incorrect_answers.map((answer) => ({
              text: answer,
              isCorrect: false,
            })),
            { text: quiz.correct_answer, isCorrect: true },
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
            {quiz.incorrect_answers.map((incorrectAnswer, iaIndex) => (
              <p className="card" key={iaIndex}>
                {incorrectAnswer}
              </p>
            ))}
            <p className="correct-answer">{quiz.correct_answer}</p>
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
