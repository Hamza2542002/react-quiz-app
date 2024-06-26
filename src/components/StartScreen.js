import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { questions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome To The React Quiz !</h2>
      <h3>{questions.length} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "activate" })}
      >
        Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
