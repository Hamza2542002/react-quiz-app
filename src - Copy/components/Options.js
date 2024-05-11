export default function Options({ question, dispatch, answer }) {
  function handleOptionClick(index) {
    index === question.correctOption
      ? dispatch({
          type: "newAnswer",
          payload: { answer: index, score: question.points },
        })
      : dispatch({
          type: "newAnswer",
          payload: { answer: index, score: 0 },
        });
  }
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } ${answer === index ? "answer" : ""}`}
            key={index}
            id={index}
            onClick={() => handleOptionClick(index)}
            disabled={answer !== null}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
