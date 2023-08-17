// import { useState } from "react";
// import { nanoid } from "nanoid";

// export default function Question(props) {
//   const [radioBtnValue, setRadioBtnValue] = useState("");
//   // function takes user input from radio button and store the answer in allAnswers array
//   function handleAnswerChange(event) {
//     const { value, type, checked } = event.target;
//     const selectedValue = type === "checkbox" ? checked : value;
//     props.saveSelectedAnswer(selectedValue);
//     setRadioBtnValue(selectedValue);
//   }
//   // function shuffleAnswers(array) {
//   //   return array.sort(() => Math.random() - 0.5);
//   // }
//   // const shuf = props.answers;
//   // shuffleAnswers(shuf);

//   let isSelectedValue = "";
//   function determineColor(answer) {
//     if (props.gameFinished) {
//       if (answer === props.correct_answer && answer === radioBtnValue) {
//         return "green"; // användaren valde rätt svar
//       } else if (answer !== props.correct_answer && answer === radioBtnValue) {
//         return "red"; // användaren valde fel svar
//       }
//     }
//     return isSelectedValue ? "#d6dbf5" : "transparent";
//   }

//   return (
//     <>
//       <h2 className="question-text">{props.question}</h2>
//       <div className="card-row">
//         {props.answers.map((answer, answerIndex) => {
//           const color = determineColor(answer);

//           const uniqueId = nanoid(); // Generate unik nanoid
//           isSelectedValue = radioBtnValue === answer;
//           return (
//             <div key={answerIndex} className="radio-toolbar">
//               <input
//                 type="radio"
//                 id={uniqueId} // Use same unik nanoId
//                 //radio inputs with the same name attribute are grouped together so that you can only pick 1 value among them.
//                 name={`answers ${props.question} - ${answerIndex}`} //Name have to bee same on alla radio button to limit choice to one
//                 value={answer}
//                 checked={props.selectedAnswers[props.question] === answer} // This is controlled component.
//                 //compare state value(selectedValue) with answer. I radio
//                 // button value is sames as answer then checked will be true and tells react that this radio button have been choosed. React will controll the state
//                 onChange={handleAnswerChange}
//               />
//               <label
//                 style={{ backgroundColor: color }}
//                 className="radio-button-label"
//                 htmlFor={uniqueId} // Use same unik nanoId from id in htmlfor
//               >
//                 {answer}
//               </label>
//             </div>
//           );
//         })}
//       </div>
//       <hr />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [radioBtnValue, setRadioBtnValue] = useState("");
  const [finalSelectedAnswer, setFinalSelectedAnswer] = useState("");

  function handleAnswerChange(event) {
    const { value, type } = event.target;
    const selectedValue = type === "checkbox" ? event.target.checked : value;
    props.saveSelectedAnswer(selectedValue);
    setRadioBtnValue(selectedValue);
  }

  useEffect(() => {
    if (props.gameFinished) {
      setFinalSelectedAnswer(radioBtnValue);
    }
  }, [props.gameFinished, radioBtnValue]);

  function determineColor(answer) {
    const isSelectedValue = props.gameFinished
      ? finalSelectedAnswer === answer
      : radioBtnValue === answer;

    if (props.gameFinished) {
      if (answer === props.correct_answer && isSelectedValue) {
        return "green"; // användaren valde rätt svar
      } else if (answer !== props.correct_answer && isSelectedValue) {
        return "red"; // användaren valde fel svar
      }
    }
    return isSelectedValue ? "#d6dbf5" : "transparent";
  }

  return (
    <>
      <h2 className="question-text">{props.question}</h2>
      <div className="card-row">
        {props.answers.map((answer, answerIndex) => {
          const color = determineColor(answer);
          const uniqueId = nanoid(); // Generate unique nanoid

          return (
            <div key={answerIndex} className="radio-toolbar">
              <input
                type="radio"
                id={uniqueId} // Use same unique nanoid
                name={`answers ${props.question} - ${answerIndex}`}
                value={answer}
                checked={props.selectedAnswers[props.question] === answer}
                onChange={handleAnswerChange}
              />
              <label
                style={{ backgroundColor: color }}
                className="radio-button-label"
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
