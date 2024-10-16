import React from "react";

export default function Start(props) {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-600 text-center">
          Quiz Time
        </h1>
        <p className="text-lg mb-8 text-gray-600 text-center">
          Test your knowledge with our fun and challenging quiz. Choose your
          difficulty and category, then click "Start Quiz" to begin!
        </p>
        <div className="space-y-6 mb-8">
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Difficulty
            </label>
            <select
              id="difficulty"
              onChange={(e) => props.setDifficulty(e.target.value)}
              className="w-full p-3 text-gray-700 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Category
            </label>
            <select
              id="category"
              onChange={(e) => props.setCategory(e.target.value)}
              className="w-full p-3 text-gray-700 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
            >
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
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>
            </select>
          </div>
        </div>
        <button
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          onClick={props.startQuiz}
        >
          Start Quiz
        </button>
      </div>
    </section>
  );
}
