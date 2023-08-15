import React from "react";

export default function Start(props) {
  return (
    <section className="start-page">
      <h1 className="info-title">Quizzical</h1>
      <p className="info-text">Some description if needed</p>
      <button className="btn-start" onClick={props.startQuiz}>
        Start game
      </button>
    </section>
  );
}
