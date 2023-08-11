import React from "react";

export default function Question(props) {
  return (
    <>
      <div className="quiz-info">
        <h2>{props.question}</h2>
      </div>
      <div className="card-row">
        {props.incorrect_answers.map((incorrectAnswer, iaIndex) => (
          <p className="card" key={iaIndex}>
            {incorrectAnswer}
          </p>
        ))}
        <p className="correct-answer">{props.correct_answer}</p>
      </div>
      <hr />
    </>
  );
}
