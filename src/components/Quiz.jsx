import React, { useEffect, useState } from "react";
import he from "he";
import Question from "./Question";

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                setLoading(true);
                const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");;
                if (!res.ok) throw new Error("Network response was not ok");
                const { results } = await res.json();

                const normalized = results.map((questionItem, index) => {
                    const id = `${index}-{questionItem.question}`;
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
    }, []); 

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    function loadQuestions() {
        return questions.map((questionItem, index) => {
            return (
                <Question 
                    key={index}
                    id={index}
                    question={questionItem.question}
                    correctAnswer={questionItem.correct_answer}
                    answers={questionItem.answers}
                    onChange={handleAnswerChange}
                />
            )
    });
    }

    function handleAnswerChange(questionId, selectedAnswer) {
        setAnswers(prev => (prev[questionId] === selectedAnswer ? prev : { ...prev, [questionId]: selectedAnswer }));
    }

    console.log(questions)

  return (
    <form className="quiz-container">
      {loadQuestions()}
    </form>
  )
}