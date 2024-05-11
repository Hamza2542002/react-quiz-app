import { useEffect, useReducer } from "react";
import "./App.css";

import Error from "./components/Error";
import FinishScreen from "./components/FinishScreen";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  // loading , error ,ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  hightScore: 0,
  timing: null,
};

const SEC_PER_Q = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "activate":
      return {
        ...state,
        status: "active",
        timing: state.questions.length * SEC_PER_Q,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload.answer,
        score: action.payload.score + state.score,
      };
    case "nextQ":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        hightScore:
          state.score > state.hightScore ? state.score : state.hightScore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        hightScore: state.hightScore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        timing: state.timing - 1,
        status: state.timing === 0 ? "finished" : state.status,
      };
    default:
      throw Error("UnKown Action");
  }
}

function App() {
  const [
    { questions, status, index, answer, hightScore, score, timing },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalPoints = questions
    .map((question) => question.points)
    .reduce((a, b) => a + b, 0);
  useEffect(function () {
    fetch("https://data-acyk.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataRecieved", payload: data });
      })
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app container">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              score={score}
              totalPoints={totalPoints}
              questionNum={questions.length}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <div className="btns">
              <Timer dispatch={dispatch} timing={timing} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionNum={questions.length}
              />
            </div>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            totalPoints={totalPoints}
            dispatch={dispatch}
            hightScore={hightScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
