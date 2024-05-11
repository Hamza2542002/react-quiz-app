function Progress({ index, score, questionNum, totalPoints, answer }) {
  return (
    <div className="progress">
      <progress value={index} max={questionNum}></progress>
      <p className="q">
        Question {index + 1}/{questionNum}
      </p>
      <p className="points">
        {score}/{totalPoints} Points
      </p>
    </div>
  );
}

export default Progress;
