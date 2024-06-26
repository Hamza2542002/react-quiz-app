import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, timing } = useQuiz();
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {Math.round(timing / 60) <= 9
        ? `0${Math.floor(timing / 60)}`
        : Math.floor(timing / 60)}
      :{timing % 60 <= 9 ? `0${timing % 60}` : timing % 60}
    </div>
  );
}

export default Timer;
