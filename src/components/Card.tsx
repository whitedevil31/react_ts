import React from "react";

interface Props {
  question: string;
  answers: string[];
  callback: any;
  userAns: any;
  questionNo: number;
  totalQuestion: number;
}

const Card: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAns,
  questionNo,
  totalQuestion,
}) => (
  <div>
    <p className="number">
      Question: {questionNo} / {totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />

    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button
            value={answer}
            onClick={callback}
            disabled={userAns ? true : false}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Card;
