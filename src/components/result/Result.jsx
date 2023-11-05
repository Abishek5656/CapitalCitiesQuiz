import "./style.scss";
import winnerImg from "../../assets/undraw_winners_ao2o 2.svg";
const Result = ({ correctAsnwerCount, setResultEnable }) => {
  return (
    <div className="results">
      <h1 className="title">Country Quiz</h1>
      <div className="result-info">
        <img src={winnerImg} alt="" />

        <p className="heading">Results</p>

        <p className="score">
          You got <span>{correctAsnwerCount}</span> correct answers
        </p>

        <div className="try-btn">
          <button onClick={() => { setResultEnable(false)}}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
