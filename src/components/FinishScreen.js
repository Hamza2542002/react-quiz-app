import { useQuiz } from "../context/QuizContext";

export default function FinishScreen() {
  const { score, totalPoints, dispatch, hightScore } = useQuiz();
  return (
    <>
      <p className="result">
        Your Score is <strong>{score}</strong> out of {totalPoints} (
        {Math.round((score / totalPoints) * 100)} %)
      </p>
      <p className="highscore">(Hightscore: {hightScore} points)</p>
      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
        Restart Quiz
      </button>
    </>
  );
}
