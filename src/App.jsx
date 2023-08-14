import React, { useState, useEffect } from "react";
import he from "he"; // Import the "he" library
import { nanoid } from "nanoid";
import "./index.css";
import Question from "./components/Question";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]); // Håll reda på alla svar här

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

  // function updateAllAnswers(question, answer) {
  //   setAllAnswers((prevAnswers) => [
  //     ...prevAnswers,
  //     { question: question, answer: answer },
  //   ]);
  // }

  function handleChange(event) {
    const { value, type, checked } = event.target;
    const checkValue = type === "checkbox" ? checked : value;
    saveAllAnswers(checkValue);
  }

  function saveAllAnswers(currentValue) {
    setAllAnswers((prevState) => {
      return [...prevState, currentValue];
    });
  }

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
      // updateAllAnswers={updateAllAnswers} // Skicka med funktionen som prop
      saveAllAnswers={saveAllAnswers}
      allAnswers={allAnswers}
      handleChange={handleChange}
    />
  ));

  return (
    <div className="container">
      {quizData.length > 0 ? questionElements : <p>Loading...</p>}
    </div>
  );
}
