import React, { useState, useEffect } from "react";
import he from "he";
import { nanoid } from "nanoid";
import "./index.css";
import Question from "./components/Question";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]); // Håll reda på alla svar här
  const [correctAnswers, setCorrectAnswers] = useState([]);

  console.log(quizData);
  console.log(correctAnswers);

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
        const correctAnswers = decodedData.map((quiz) => quiz.correct_answer);
        setCorrectAnswers(correctAnswers);
      });
  }, []);

  function saveAllAnswers(currentValue) {
    setAllAnswers((prevState) => {
      return [...prevState, currentValue];
    });
  }

  const questionElements = quizData.map((quiz, index) => (
    <Question
      key={index}
      // category={quiz.category}
      correct_answer={quiz.correct_answer}
      // difficulty={quiz.difficulty}
      question={quiz.question}
      // type={quiz.type}
      incorrect_answers={quiz.incorrect_answers}
      answers={quiz.answers}
      saveAllAnswers={saveAllAnswers}
      allAnswers={allAnswers}
      // handleChange={handleChange}
    />
  ));

  return (
    <div className="container">
      {quizData.length > 0 ? questionElements : <p>Loading...</p>}
    </div>
  );
}
