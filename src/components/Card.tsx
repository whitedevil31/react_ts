import React from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

interface Props {
  question: string;
  answers: string[];
  callback: any;
  userAns: any;
  questionNo: number;
  totalQuestion: number;
}

const CardReact: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAns,
  questionNo,
  totalQuestion,
}) => (
  <div className="card w-75 h-50 d-inline-block mt-40">
    <div className="card-body">
      <div className="card-header text-center">
        Question: {questionNo} / {totalQuestion}
      </div>
      <div className="card-title text-center mt-3">
        <h4 dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className="card-body d-flex justify-content-center flex-column align-items-center">
        {answers.map((answer) => (
          <div key={answer}>
            <button
              className="pt-1 pb-2 mb-3 btn btn-warning btn-outline-danger btn-md btn-block customButton "
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
  </div>
);

export default CardReact;
