import React, { useState, useEffect } from "react";
import he from "he";
import "./index.css";
import Question from "./components/Question";
import Start from "./components/Start";

export default function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [setshuffeldAnswers, setSetshuffeldAnswers] = useState([]);

  console.log(correctAnswers);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.results.map((question) => {
          const answerOptions = [
            ...question.incorrect_answers.map((answer) => he.decode(answer)),
            he.decode(question.correct_answer),
          ];
          // Shuffle answers for this question
          answerOptions.sort(() => Math.random() - 0.5);

          return {
            ...question,
            question: he.decode(question.question),
            isSelected: false,
            answerOptions: answerOptions, // use the shuffled answerOptions here
          };
        });
        setQuizQuestions(decodedData);
        const correctAnswers = decodedData.map(
          (question) => question.correct_answer
        );
        setCorrectAnswers(correctAnswers);
      });
  }, [gameFinished]);

  // function shuffleAnswers(array) {
  //   return array.sort(() => Math.random() - 0.5);
  // }

  // saves users answers from the radio input to the allAnswers state. currentValue is evry answer user choose
  // The Array lenght is always 5
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
    if (selected.length !== correct.length) return false;
    else {
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
  }

  function startQuiz() {
    setQuizStarted(false);
  }

  const questionElements = quizQuestions.map((question, index) => (
    <Question
      key={index}
      correct_answer={question.correct_answer}
      question={question.question} // Question
      incorrect_answers={question.incorrect_answers}
      answers={question.answerOptions}
      saveSelectedAnswer={saveSelectedAnswer}
      selectedAnswers={selectedAnswers}
      gameFinished={gameFinished}
      setshuffeldAnswers={setshuffeldAnswers}
    />
  ));

  return (
    <>
      {quizStarted ? (
        <Start startQuiz={startQuiz} />
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
                  {/* <button
                    className="checkAnswer-btn"
                    onClick={() =>
                      compareSelectedAndCorrectAnswers(
                        selectedAnswers,
                        correctAnswers
                      )
                    }
                  >
                    Check answers
                  </button> */}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
