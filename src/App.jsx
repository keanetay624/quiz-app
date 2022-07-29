import { useState, useEffect } from 'react'
import './App.css'
import StartScreen from "./components/StartScreen"
import Quiz from "./components/Quiz"
import blob from "./blobs.png"
import blob1 from "./blobs-1.png"

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  
  useEffect(() => {
    reloadQuestions()
  },[])

  async function reloadQuestions() {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&encode=base64")
    const data = await res.json()
    const shuffledOptions = shuffleOptions([...data.results])
    setAllQuestions(shuffledOptions)
  }

  function shuffleOptions(data) {
    if (data) {
      const newData = data.map(questionGroup => {
        let options = []

        const incorrect_answers = questionGroup.incorrect_answers;
        options.push(questionGroup.correct_answer)
        incorrect_answers.map(option => options.push(option))
        options = options.map(option => atob(option))
        shuffleArray(options)

        return {
          ...questionGroup,
          options
        }
      })
      return newData
    }
    return
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  function toggleQuizStart() {
    setQuizStarted(prevIsStarted => !prevIsStarted);
  }
  
  return (
    <div className="App">
      <img className="blob" src={blob}/>
      <img className="blob-1" src={blob1}/>
      {!quizStarted ? <StartScreen toggleQuizStart={toggleQuizStart}/> 
        : <Quiz allQuestions={allQuestions} 
        toggleQuizStart={toggleQuizStart} 
        isStarted={quizStarted}
        reloadQuestions={reloadQuestions}/>}
    </div>
  )
}

export default App
