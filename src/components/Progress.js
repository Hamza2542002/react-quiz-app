import { useQuiz } from "../context/QuizContext";

function Progress({ answer }) {
  const { index, score, questions, totalPoints } = useQuiz();
  return (
    <div className="progress">
      <progress value={index} max={questions.length}></progress>
      <p className="q">
        Question {index + 1}/{questions.length}
      </p>
      <p className="points">
        {score}/{totalPoints} Points
      </p>
    </div>
  );
}

export default Progress;
