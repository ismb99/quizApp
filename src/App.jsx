import React, { useState, useEffect } from "react";
import he from "he";
import Question from "./components/Question";
import Start from "./components/Start";
import Loader from "./components/loader";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("10");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!quizStarted) {
      setIsLoading(true);
      setError(null);
      const apiUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch quiz questions");
          }
          return res.json();
        })
        .then((data) => {
          if (data.response_code !== 0) {
            throw new Error("Unable to get quiz questions. Please try again.");
          }
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
        })
        .catch((err) => {
          setError(err.message);
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [quizStarted, category, difficulty]);

  function saveSelectedAnswer(currentValue, questionIndex) {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newAnswers = [...prevSelectedAnswers];
      newAnswers[questionIndex] = currentValue;
      return newAnswers;
    });
  }

  function compareSelectedAndCorrectAnswers(selected, correct) {
    if (selected.length !== correct.length) {
      toast.error("Please answer all questions before checking answers.");
      return;
    }

    let count = 0;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i] === correct[i]) count += 1;
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
    setError(null);
  }

  function startQuiz() {
    setQuizStarted(false);
  }

  function goBack() {
    resetGame();
  }

  const questionElements = quizQuestions.map((question, index) => (
    <Question
      key={index}
      questionIndex={index}
      correct_answer={question.correct_answer}
      question={question.question}
      incorrect_answers={question.incorrect_answers}
      answers={question.answerOptions}
      saveSelectedAnswer={saveSelectedAnswer}
      selectedAnswers={selectedAnswers}
      gameFinished={gameFinished}
    />
  ));

  const getGridClasses = () => {
    const questionCount = quizQuestions.length;
    if (questionCount <= 3) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    } else if (questionCount === 4) {
      return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
    } else {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
    }
  };

  return (
    <BrowserRouter>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-6 px-4 sm:px-6 lg:px-8">
        {quizStarted ? (
          <Start
            startQuiz={startQuiz}
            setDifficulty={setDifficulty}
            setCategory={setCategory}
          />
        ) : (
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="text-center">
                <p className="text-red-600 text-xl mb-4">{error}</p>
                <button
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  onClick={resetGame}
                >
                  Try Again
                </button>
              </div>
            ) : quizQuestions.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <button
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={goBack}
                  >
                    Back to Start
                  </button>
                  <h1 className="text-3xl font-bold text-cyan-800 text-center">
                    Quiz Time
                  </h1>
                </div>
                <div
                  className={`grid ${getGridClasses()} gap-6 justify-center`}
                >
                  {questionElements}
                </div>
                <div className="mt-12">
                  {gameFinished ? (
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-4 text-cyan-800">
                        {`You scored ${quizScore}/${selectedAnswers.length} correct answers`}
                      </p>
                      <button
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        onClick={resetGame}
                      >
                        Play Again
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full max-w-md mx-auto block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={() =>
                        compareSelectedAndCorrectAnswers(
                          selectedAnswers,
                          correctAnswers
                        )
                      }
                    >
                      Check Answers
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
