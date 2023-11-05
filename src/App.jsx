import Quiz from "./components/quiz/Quiz.jsx";
import Result from "./components/result/Result.jsx";
import "./app.scss";
import { useState, useEffect } from "react";

function App() {
  const [countryList, setCountryList] = useState([]);
  //store all countryList data

  const [currentQuestion, setCurrentQuestion] = useState(null);
  //stores the current question

  const [correctAsnwerCount, setCurrentAnswerCount] = useState(0);
  //store the count if the user seleted the correct answer

  const [capitalName, setCapitalName] = useState(null);
  //stores the captical names

  const [nextQuestion, setNextQuestion] = useState(0);
  //get the next question

  const [options, setOptions] = useState([]);
  //options

  const [limit, setLimit] = useState(0);

  const [resultsEnable, setResultEnable] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();

      setCountryList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCapitalName = async (countryList) => {
    let randomData = [];

    let randomIndices = [];
    let count = 0;

    while (count < 3 && randomIndices.length < countryList.length) {
      let random = Math.floor(Math.random() * countryList.length);
      if (!randomIndices.includes(random)) {
        randomIndices.push(random);
        randomData.push(countryList[random].capital[0]);
        count++;
      }
    }

    let dataOptions = [...randomData, capitalName];

    let randomOptions = dataOptions.sort(() => Math.random() - 0.5);

    setOptions(randomOptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [nextQuestion]);

  useEffect(() => {
    if (limit < 9) {
      getCapitalName(countryList);
    }
  }, [currentQuestion, nextQuestion]);

  useEffect(() => {
    if (limit < 9) {
      setCurrentQuestion(countryList[nextQuestion]);
      setCapitalName(currentQuestion?.capital[0]);
    } else {
      setResultEnable(true);
    }
  }, [countryList, nextQuestion]);

  return (
    <div className="quiz-container">
      {resultsEnable ? (
        <Result
          correctAsnwerCount={correctAsnwerCount}
          setResultEnable={setResultEnable}
        />
      ) : (
        <Quiz
          currentQuestion={currentQuestion}
          capitalName={capitalName}
          setCurrentAnswerCount={setCurrentAnswerCount}
          options={options}
          nextQuestion={nextQuestion}
          setNextQuestion={setNextQuestion}
          setLimit={setLimit}
        />
      )}
    </div>
  );
}

export default App;
