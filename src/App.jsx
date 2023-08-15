import React, { useState, useEffect } from "react";
import he from "he";
import "./index.css";
import Question from "./components/Question";
import Start from "./components/Start";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]); // Håll reda på alla svar här
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(true);

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
    if (!allAnswers.includes(currentValue)) {
      setAllAnswers((prevState) => {
        if (prevState.length < 5) {
          return [...prevState, currentValue];
        }
        return prevState;
      });
    }
  }

  function compareArrays(a, b) {
    let count = 0;
    if (a.length !== b.length) return false;
    else {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === b[i]) count = count + 1;
      }
    }
    setScore(count);
    console.log(`You got ${count} of ${a.length}`);
  }

  function startQuiz() {
    setStartGame(false);
  }

  const questionElements = quizData.map((quiz, index) => (
    <Question
      key={index}
      correct_answer={quiz.correct_answer}
      question={quiz.question}
      incorrect_answers={quiz.incorrect_answers}
      answers={quiz.answers}
      saveAllAnswers={saveAllAnswers}
      allAnswers={allAnswers}
    />
  ));

  return (
    <div className="container">
      {startGame ? (
        <Start startQuiz={startQuiz} />
      ) : quizData.length > 0 ? (
        <div>
          {questionElements}
          <div>
            <button onClick={() => compareArrays(allAnswers, correctAnswers)}>
              Check answers
            </button>
            <h2>
              You got: {score} of {allAnswers.length}
            </h2>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
