import React from "react";

export default function Results(props) {
  return (
    <>
      {props.correct ? (
        <div className="correct-answer">
          <h1>Correct</h1>
        </div>
      ) : (
        <div className="wrong-answer">
          <h1>Failed</h1>
        </div>
      )}
    </>
  );
}
