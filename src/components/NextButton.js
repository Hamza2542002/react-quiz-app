import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, index, questions } = useQuiz();
  return (
    answer !== null && (
      <button
        className="btn btn-ui"
        onClick={() =>
          index < questions.length - 1
            ? dispatch({ type: "nextQ" })
            : dispatch({ type: "finished" })
        }
      >
        {index < questions.length - 1 ? "Next" : "Finish"}
      </button>
    )
  );
}

export default NextButton;
