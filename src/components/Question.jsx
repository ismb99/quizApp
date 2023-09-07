import { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [radioBtnValue, setRadioBtnValue] = useState("");

  function handleAnswerChange(event) {
    const { value, type, checked } = event.target;
    const selectedValue = type === "checkbox" ? checked : value;
    props.saveSelectedAnswer(selectedValue);
    setRadioBtnValue(selectedValue);
  }

  const getAnswerHighlightClass = (answer) => {
    if (props.gameFinished) {
      return props.correct_answer === answer
        ? "correct-answer"
        : props.selectedAnswers.includes(answer)
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
          const isSelectedValue = radioBtnValue === answer;
          return (
            <div key={answerIndex} className="radio-toolbar">
              <input
                type="radio"
                id={uniqueId}
                name={`answers ${props.question} - ${answerIndex}`}
                value={answer}
                checked={props.selectedAnswers[props.question] === answer}
                onChange={handleAnswerChange}
              />
              <label
                style={{
                  backgroundColor: isSelectedValue ? "#d6dbf5" : "transparent",
                }}
                className={`${getAnswerHighlightClass(answer)}`}
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
