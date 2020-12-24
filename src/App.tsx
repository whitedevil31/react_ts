import React, { useState } from "react";
import Card from "./components/Card";
import { Difficulty, fetchQuiz, QuestionsState } from "./components/API";
import { GlobalStyle } from "./App.styles";
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
      <div className="App">
        <h1>QUIZ GAME</h1>
        {gameOver || userAnswers.length === TOTAL ? (
          <button className="startQuiz" onClick={startHandler}>
            START
          </button>
        ) : null}

        {!gameOver ? <p className="scores">Score:{score}</p> : null}
        {loading && <p>Loading Questions ......</p>}
        {!loading && !gameOver && (
          <Card
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
          <button className="nextQuiz" onClick={next}>
            NEXT
          </button>
        ) : null}
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
