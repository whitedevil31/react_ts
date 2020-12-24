import React, { useState } from "react";
import CardReact from "./components/Card";
import { Difficulty, fetchQuiz, QuestionsState } from "./components/API";
import { GlobalStyle } from "./App.styles";

import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import TextInput from "./TextInput";
// import { Counter } from "./Counter";
const TOTAL = 10;
type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [endCard, setEndCard] = useState(false);

  const startHandler = async () => {
    setLoading(true);
    setGameOver(false);
    const questionList = await fetchQuiz(TOTAL, Difficulty.EASY);
    setQuestions(questionList);
    console.log(questions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);

    setLoading(false);
  };
  const next = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  const checkAns = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore(score + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1 className="mt-3 !important">QUIZ GAME</h1>
        {!gameOver && !loading && (
          <h4 className="mt-5 text-light bg-dark">Your Score: {score}</h4>
        )}
        {gameOver || userAnswers.length === TOTAL ? (
          <Button
            className="start mt-3 btn-lg"
            onClick={startHandler}
            variant="success"
          >
            START
          </Button>
        ) : null}

        {loading && (
          <h4 className="text-warning mt-5 bg-dark">
            Loading Questions for you ......
          </h4>
        )}

        {!loading && !gameOver && number <= TOTAL && (
          <CardReact
            questionNo={number + 1}
            totalQuestion={TOTAL}
            question={questions[number].question}
            answers={questions[number].answers}
            userAns={userAnswers ? userAnswers[number] : undefined}
            callback={checkAns}
          />
        )}

        {!loading &&
        !gameOver &&
        userAnswers.length === number + 1 &&
        number !== TOTAL - 1 ? (
          <Button className="btn-success btn-lg next mt-4" onClick={next}>
            NEXT
          </Button>
        ) : null}
        {userAnswers.length > 10 && (
          <div>
            <h1 className="text-warning mt-5">Game Over !</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
{
  /* <Counter>
        {(count, setCount) => (
          <div>
            {count}
            <button onClick={() => setCount(count + 1)}>INCREMENT</button>
          </div>
        )}
      </Counter>
      <TextInput
        digits={5}
        text="nanda"
        handleChange={(e) => console.log(e.target.value)}
      /> */
}
//https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple
