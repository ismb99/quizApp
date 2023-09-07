import React from "react";

export default function Start(props) {
  return (
    <section className="start-page">
      <h1 className="info-title">Quizzical</h1>
      <p className="info-text">
        Dive into Quizzical – the ultimate trivia adventure! Click the "Start"
        button and let the fun begin!
      </p>
      <div className="container-start">
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Select Difficulty</label>
          <select
            id="difficulty"
            onChange={(e) => props.setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="category-selector">
          <label htmlFor="category">Select Category </label>
          <select
            id="category"
            onChange={(e) => props.setCategory(e.target.value)}
          >
            <option value="10">General Knowledge</option>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
        </div>
      </div>
      <button className="btn-start" onClick={props.startQuiz}>
        Start quiz
      </button>
    </section>
  );
}
