import './Start.css'

export default function Start(props) {
  return (
    <header className="start-container">
      <h1 className="start-title">Quizzical</h1>
      <p className="start-subtitle">Test your knowledge with fun quizzes!</p>
      <button className="start-button" onClick={props.onStart}>Start Quiz</button>
    </header>
  )
}