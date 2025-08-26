import React from 'react'
import clsx from 'clsx'
import './question.css'

export default function Question(props) {
  const { id, question, answers, onChange, disabled, correctAnswer, quizCompleted } = props

  const choiceClassName = clsx('choice', quizCompleted && correctAnswer &&'choice-disabled')

  function getChoiceClassName(answer) {
    return clsx('choice', {
      'choice-correct': quizCompleted && answer === correctAnswer,
    })
  }
  
  return (
    <div className="question-container">
      <h3 className="question-text">{question}</h3>

      <div
        className="choices"
        role="radiogroup"
        aria-labelledby={`q-${id}-label`}
      >
        <span id={`q-${id}-label`} className="sr-only-vis">
          {question}
        </span>

        {answers.map((answer, index) => {
          const answerId = `q${id}-a${index}`
          return (
            <React.Fragment key={answerId}>
              <input
                type="radio"
                id={answerId}
                name={`question-${id}`}
                value={answer}
                className="sr-only"
                onChange={() => onChange(id, answer)}
                disabled={disabled}
              />
              <label htmlFor={answerId} className={getChoiceClassName(answer)}>
                {answer}
              </label>
            </React.Fragment>
          )
        })}
      </div>

      <hr />
    </div>
  )
}