import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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
    case "questions/loaded":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "rejected":
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

function QuizProvider({ children }) {
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
        dispatch({ type: "questions/loaded", payload: data });
      })
      .catch((error) => dispatch({ type: "rejected" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        hightScore,
        score,
        timing,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) return;
  return context;
}

export { useQuiz, QuizProvider };
