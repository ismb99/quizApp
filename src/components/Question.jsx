import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  function handleAnswerChange(event) {
    const { value } = event.target;
    setSelectedAnswer(value);
    props.saveSelectedAnswer(value, props.questionIndex);
  }

  const getAnswerHighlightClass = (answer) => {
    if (props.gameFinished) {
      return props.correct_answer === answer
        ? "bg-green-100 border-green-500 text-green-800"
        : selectedAnswer === answer
        ? "bg-red-100 border-red-500 text-red-800"
        : "opacity-50";
    }
    return "";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-cyan-600 p-4">
        <h2 className="text-lg font-semibold text-white">{props.question}</h2>
      </div>
      <div className="p-4">
        {props.answers.map((answer, answerIndex) => {
          const uniqueId = nanoid();
          return (
            <div key={answerIndex} className="mb-2 last:mb-0">
              <input
                type="radio"
                id={uniqueId}
                name={`answers-${props.questionIndex}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleAnswerChange}
                className="hidden peer"
                disabled={props.gameFinished}
              />
              <label
                htmlFor={uniqueId}
                className={`block w-full p-3 text-sm border rounded-md cursor-pointer transition-all duration-300 
                ${
                  selectedAnswer === answer
                    ? "bg-cyan-100 border-cyan-500"
                    : "bg-gray-50 border-gray-200"
                } 
                ${getAnswerHighlightClass(answer)}
                hover:bg-cyan-50 peer-checked:bg-cyan-100 peer-checked:border-cyan-500`}
              >
                {answer}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
