import { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [radioBtnValue, setRadioBtnValue] = useState("");
  // function takes user input from radio button and store the answer in allAnswers array
  function handleAnswerChange(event) {
    const { value, type, checked } = event.target;
    const selectedValue = type === "checkbox" ? checked : value;
    props.saveSelectedAnswer(selectedValue);
    setRadioBtnValue(selectedValue);
  }
  // function shuffleAnswers(array) {
  //   return array.sort(() => Math.random() - 0.5);
  // }
  // const shuf = props.answers;
  // shuffleAnswers(shuf);

  // function for bg color wrong & correcet answers
  // use radioBtnValue === answer?
  // Do i need gameFinished?

  return (
    <>
      <h2 className="question-text">{props.question}</h2>
      <div className="card-row">
        {props.answers.map((answer, answerIndex) => {
          const uniqueId = nanoid(); // Generate unik nanoid
          const isSelectedValue = radioBtnValue === answer;
          return (
            <div key={answerIndex} className="radio-toolbar">
              <input
                type="radio"
                id={uniqueId} // Use same unik nanoId
                //radio inputs with the same name attribute are grouped together so that you can only pick 1 value among them.
                name={`answers ${props.question} - ${answerIndex}`} //Name have to bee same on alla radio button to limit choice to one
                value={answer}
                checked={props.selectedAnswers[props.question] === answer} // This is controlled component.
                //compare state value(selectedValue) with answer. I radio
                // button value is sames as answer then checked will be true and tells react that this radio button have been choosed. React will controll the state
                onChange={handleAnswerChange}
              />
              <label
                style={{
                  backgroundColor: isSelectedValue ? "#d6dbf5" : "transparent",
                }}
                className="radio-button-label"
                htmlFor={uniqueId} // Use same unik nanoId from id in htmlfor
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
