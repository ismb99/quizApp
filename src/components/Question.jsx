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

// const renderQuizItems = () => {
//   return quizData.map((quiz, index) => (
//     <div className="quiz-container" key={index}>
//       <div className="quiz-info">
//         <h2>{quiz.question}</h2>
//       </div>
//       <div className="card-container">
//         <div className="card-row">
//           {quiz.incorrect_answers.map((incorrectAnswer, iaIndex) => (
//             <p className="card" key={iaIndex}>
//               {incorrectAnswer}
//             </p>
//           ))}
//           <p className="correct-answer">{quiz.correct_answer}</p>
//         </div>
//         <hr />
//       </div>
//     </div>
//   ));
// };
