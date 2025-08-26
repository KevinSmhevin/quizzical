import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";

import Question from "./Question";

import './quiz.css'

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                setLoading(true);
                const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");;
                if (!res.ok) throw new Error("Network response was not ok");
                const { results } = await res.json();

                const normalized = results.map((questionItem, index) => {
                    const id = nanoid();
                    const question = he.decode(questionItem.question);
                    const correctAnswer = he.decode(questionItem.correct_answer);
                    const incorrectAnswers = questionItem.incorrect_answers.map(ans => he.decode(ans));
                    const shuffledAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);
                    return {
                        id,
                        question,
                        correctAnswer,
                        incorrectAnswers,
                        answers: shuffledAnswers
                    }

                });
                setQuestions(normalized);

            } catch (error) {
                console.log("Fetch error: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [reset]); 

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function loadQuestions() {
        return questions.map((questionItem, index) => {
            return (
                <Question 
                    key={questionItem.id}
                    id={questionItem.id}
                    question={questionItem.question}
                    correctAnswer={questionItem.correctAnswer}
                    answers={questionItem.answers}
                    quizCompleted={quizCompleted}
                    onChange={handleAnswerChange}
                    disabled={quizCompleted}
                />
            )
    });
    }

    function handleAnswerChange(questionId, selectedAnswer) {
        setAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
    }

    const allAnswered = questions.length > 0 && questions.every(q => answers.hasOwnProperty(q.id));

    function handleSubmit(e) {
        e.preventDefault();
        calculateScore();
        setQuizCompleted(true);
    }

    function calculateScore() {
        let newScore = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
    }

    function resetQuiz(e) {
        setQuestions([]);
        setAnswers({});
        setLoading(true);
        setError(null);
        setScore(0);
        setQuizCompleted(false);
        setReset(prev => !prev);
    }

    function handlePlayAgain() {
        resetQuiz();
    }

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error: {error}</p>


  return (
    <form className="quiz-container">
      {loadQuestions()}
      {quizCompleted ? 
      (
        <div className="quiz-results">
          <p>You scored {score} out of {questions.length}</p>
          <button className="quiz-button" onClick={handlePlayAgain}>
              Play Again
          </button>
        </div>
      ) : (
        <button className="quiz-button" disabled={!allAnswered} onClick={handleSubmit}>
            Check answers
        </button>
      )}
    </form>
  )
}