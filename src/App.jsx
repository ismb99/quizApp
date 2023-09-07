import React, { useState, useEffect } from "react";
import he from "he";
import "./index.css";
import Question from "./components/Question";
import Start from "./components/Start";
import Loader from "./components/loader";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("10");

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.results.map((question) => {
          const answerOptions = [
            ...question.incorrect_answers.map((answer) => he.decode(answer)),
            he.decode(question.correct_answer),
          ];
          answerOptions.sort(() => Math.random() - 0.5);
          return {
            ...question,
            question: he.decode(question.question),
            answerOptions: answerOptions,
          };
        });
        setQuizQuestions(decodedData);
        const correctAnswers = decodedData.map(
          (question) => question.correct_answer
        );
        setCorrectAnswers(correctAnswers);
      });
  }, [quizStarted, category, difficulty]);

  function saveSelectedAnswer(currentValue) {
    if (!selectedAnswers.includes(currentValue)) {
      setSelectedAnswers((prevSelectedAnswers) => {
        if (prevSelectedAnswers.length < 5) {
          return [...prevSelectedAnswers, currentValue];
        }
        return prevSelectedAnswers;
      });
    }
  }

  function compareSelectedAndCorrectAnswers(selected, correct) {
    let count = 0;
    console.log(selected, "slected", correct);
    if (selected.length !== correct.length) {
      toast.error("Answer All Questions");
      return;
    } else {
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] === correct[i]) count = count + 1;
      }
    }
    setQuizScore(count);
    setGameFinished(true);
  }

  function resetGame() {
    setSelectedAnswers([]);
    setQuizScore(0);
    setGameFinished(false);
    setQuizStarted(true);
    setDifficulty("easy");
    setCategory("10");
  }

  function startQuiz() {
    setQuizStarted(false);
  }

  const questionElements = quizQuestions.map((question, index) => (
    <Question
      key={index}
      correct_answer={question.correct_answer}
      question={question.question}
      incorrect_answers={question.incorrect_answers}
      answers={question.answerOptions}
      saveSelectedAnswer={saveSelectedAnswer}
      selectedAnswers={selectedAnswers}
      gameFinished={gameFinished}
    />
  ));

  return (
    <>
      <Toaster />
      {quizStarted ? (
        <Start
          startQuiz={startQuiz}
          setDifficulty={setDifficulty}
          setCategory={setCategory}
        />
      ) : (
        <div className="container">
          <div className="question-card">
            {quizQuestions.length > 0 ? (
              <div>
                {questionElements}
                <div>
                  {gameFinished ? (
                    <div className="score">
                      <p className="socre-text">
                        {`You scored ${quizScore}/${selectedAnswers.length} correct answers`}
                      </p>
                      <button className="btn-play-again" onClick={resetGame}>
                        Play again
                      </button>
                    </div>
                  ) : (
                    <button
                      className="checkAnswer-btn"
                      onClick={() =>
                        compareSelectedAndCorrectAnswers(
                          selectedAnswers,
                          correctAnswers
                        )
                      }
                    >
                      Check answers
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      )}
    </>
  );
}
