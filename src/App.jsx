import { useState } from 'react'

import Start from './components/Start'
import Quiz from './components/Quiz'

import './App.css'

function App() {
  const [quizState, setQuizState] = useState("start")

  function startQuiz() {
    setQuizState("quiz")
  }

  function handleQuiz() {
    switch (quizState) {
      case "start":
        return <Start onStart={startQuiz} />
      case "quiz":
        return <Quiz />
      default:
        return <Start onStart={startQuiz} />
    }
  }

  return (
    <>
      {handleQuiz()}
    </>
  )

}
export default App
