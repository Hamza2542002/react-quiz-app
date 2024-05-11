function NextButton({ dispatch, answer, index, questionNum }) {
  return (
    answer !== null && (
      <button
        className="btn btn-ui"
        onClick={() =>
          index < questionNum - 1
            ? dispatch({ type: "nextQ" })
            : dispatch({ type: "finished" })
        }
      >
        {index < questionNum - 1 ? "Next" : "Finish"}
      </button>
    )
  );
}

export default NextButton;
