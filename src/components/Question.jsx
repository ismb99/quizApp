import { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  // const [selectedValue, setSelectedValue] = useState("");
  // const [allAnswers, setAllAnswers] = useState([]); flyttar till app

  console.log("Alla svar", props.allAnswers);

  // function handleChange(event) {
  //   const { value, type, checked } = event.target;
  //   const checkValue = type === "checkbox" ? checked : value;
  //   props.saveAllAnswers(checkValue);
  // }

  // function saveAllAnswers(currentValue) {
  //   setAllAnswers((prevState) => {
  //     return [...prevState, currentValue];
  //   });
  // }

  return (
    <>
      <div className="quiz-info">
        <h2>{props.question}</h2>
      </div>
      <div className="card-row">
        {props.answers.map((answer, answerIndex) => {
          const uniqueId = nanoid(); // Generate unik nanoid
          return (
            <div key={answerIndex} className="radio-toolbar">
              <input
                type="radio"
                id={uniqueId} // Use same unik nanoId
                //dio inputs with the same name attribute are grouped together so that you can only pick 1 value among them.
                name={props.question} //Name have to bee same on alla radio button to limit choice to one
                value={answer}
                checked={props.allAnswers[props.question] === answer} // This is controlled component. compare state value(selectedValue) with answer. I radio
                // button value is sames as answer then checked will be true and tells react that this radio button have been choosed. React will controll the state
                onChange={props.answerhandleChange}
              />
              <label
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
