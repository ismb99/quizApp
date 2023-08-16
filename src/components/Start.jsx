import React from "react";

export default function Start(props) {
  return (
    <section className="start-page">
      <h1 className="info-title">Quizzical</h1>
      <p className="info-text">
        Dive into Quizzical – the ultimate trivia adventure! Click the "Start"
        button and let the fun begin!
      </p>
      <button className="btn-start" onClick={props.startQuiz}>
        Start quiz
      </button>
    </section>
  );
}
