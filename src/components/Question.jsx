import React from "react";

export default function Question(props) {
  return (
    <>
      <div className="quiz-info">
        <h2>{props.question}</h2>
      </div>
      <div className="card-row">
        {props.answers.map((answer, answerIndex) => (
          <p
            onClick={() => props.holdAnswer(answerIndex)}
            className="card"
            key={answerIndex}
          >
            {answer} <span> Index: {answerIndex}</span>
          </p>
        ))}
      </div>
      <hr />
    </>
  );
}
