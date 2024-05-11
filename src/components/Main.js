import { useQuiz } from "../context/QuizContext";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Loader from "./Loader";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

export default function Main() {
  const { status } = useQuiz();
  return (
    <div className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <div className="btns">
            <Timer />
            <NextButton />
          </div>
        </>
      )}
      {status === "finished" && <FinishScreen />}
    </div>
  );
}
