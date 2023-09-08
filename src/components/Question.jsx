import { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // function handleAnswerChange(event) {
  //   const { value } = event.target;
  //   setSelectedAnswer(value);
  //   props.saveSelectedAnswer(value);
  // }

  function handleAnswerChange(event) {
    const { value } = event.target;
    setSelectedAnswer(value);
    props.saveSelectedAnswer(value, props.questionIndex);
  }

  const getAnswerHighlightClass = (answer) => {
    if (props.gameFinished) {
      return props.correct_answer === answer
        ? "correct-answer"
        : selectedAnswer === answer
        ? "incorrect-answer"
        : "";
    }
    return "";
  };

  return (
    <>
      <h2 className="question-text">{props.question}</h2>
      <div className="card-row">
        {props.answers.map((answer, answerIndex) => {
          const uniqueId = nanoid();
          return (
            <div key={answerIndex} className="radio-toolbar">
              <input
                type="radio"
                id={uniqueId}
                name={`answers-${props.question}`} // Use a unique name for each question
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleAnswerChange}
              />
              <label
                style={{
                  backgroundColor:
                    selectedAnswer === answer ? "#d6dbf5" : "transparent",
                }}
                className={`radio-button-label ${getAnswerHighlightClass(
                  answer
                )}`}
                htmlFor={uniqueId}
              >
                {answer}
              </label>
            </div>
          );
        })}
      </div>
      <hr />
    </>
  );
}
