import "./quiz.scss";
import advantageSvg from "../../assets/undraw_adventure_4hum 1.svg";
import { useState } from "react";

const Quiz = ({
  currentQuestion,
  capitalName,
  setCurrentAnswerCount,
  nextQuestion,
  options,
  setNextQuestion,
  setLimit,
}) => {
  const [correct, setCorrect] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [nextbtn, setNextBtn] = useState(false);

  const handleClick = (capital, index) => {
    setNextBtn(true);
    if (!isButtonDisabled) {
      setActiveButton(index);
      if (capital && capital === currentQuestion.capital[0]) {
        setCurrentAnswerCount((prev) => prev + 1);
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setIsButtonDisabled(true);
    }
  };

  const handleNextBtn = () => {
    setLimit((prev) => prev + 1);
    setIsButtonDisabled(false);
    setActiveButton(null);
    setNextQuestion((prev) => prev + 1);
  };

  return (
    <div className="quiz">
      <h1>Country Quiz</h1>
      <img src={advantageSvg} alt="" />
      <div className="quiz-container">
        <h1 className="question">
          {currentQuestion?.name?.common} is the capital of
        </h1>
        <div className="quiz-options">
          {options.map((capital, index) => (
            <button
              disabled={isButtonDisabled}
              style={{
                backgroundColor:
                  activeButton === index ? (correct ? "green" : "red") : "",
              }}
              key={index}
              onClick={() => {
                handleClick(capital, index);
              }}
            >
              {capital}
            </button>
          ))}
        </div>
        {nextbtn ? (
          <button onClick={handleNextBtn} className="next-btn">
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Quiz;
