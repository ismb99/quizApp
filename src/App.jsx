import React, { useState, useEffect } from "react";
import he from "he"; // Import the "he" library
import { nanoid } from "nanoid";
import "./index.css";
import Question from "./components/Question";

export default function App() {
  const [quizData, setQuizData] = useState([]);

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
          isSelected: false,
        }));

        setQuizData(decodedData);
      });
  }, []);

  const questionElements = quizData.map((quiz, index) => (
    <Question
      key={index}
      category={quiz.category}
      correct_answer={quiz.correct_answer}
      difficulty={quiz.difficulty}
      question={quiz.question}
      type={quiz.type}
      incorrect_answers={quiz.incorrect_answers}
      answers={quiz.answers}
    />
  ));

  return (
    <div className="container">
      {quizData.length > 0 ? questionElements : <p>Loading...</p>}
    </div>
  );
}
