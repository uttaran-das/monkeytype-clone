import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TypingArea from './components/TypingArea/TypingArea'
import Stats from './components/Stats/Stats'

const prompt = "Time was a wave, almost cruel in its relentlessness."

function App() {
  const [userInput, setUserInput] = useState('')
  const [gameState, setGameState] = useState('waiting');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'finished') return
      if (e.key === 'Backspace') setUserInput((prev) => prev.slice(0, -1))
      else if (e.key.length === 1) {
        if (gameState === 'waiting') {
          setGameState('running')
          setStartTime(Date.now())
        }
        setUserInput((currentInput) => {
          const newTyped = currentInput + e.key
          if (newTyped.length === prompt.length) {
            setEndTime(Date.now())
            setGameState('finished')
          }
          return newTyped
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState])

  const stats = useMemo(() => {
    if(!prompt) return { wpm: 0, rawWpm: 0, accuracy: 0, correctChars: 0, totalChars: 0 }

    const totalChars = userInput.length;
    const correctChars = userInput.split('').reduce((acc, char, index) => {
      return acc + (char===prompt[index]?1:0)
    },0)

    let wpm = 0
    let rawWpm = 0
    let accuracy = 0

    if(startTime && endTime){
      console.log(startTime)
      console.log(endTime)
      const durationInMinutes = (endTime-startTime)/1000/60
      wpm = durationInMinutes > 0 ? Math.round((correctChars / 5) / durationInMinutes) : 0;
      rawWpm = durationInMinutes > 0 ? Math.round((totalChars / 5) / durationInMinutes) : 0;
    }

    if (totalChars > 0) accuracy = Math.round((correctChars / totalChars) * 100)

    return { wpm, rawWpm, accuracy, correctChars, totalChars }
  }, [userInput, prompt, startTime, endTime])

  const resetTest = () => {
    setGameState('waiting');
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
  }

  return (
    <div className="app">
      {gameState !== 'finished' && (
        <TypingArea prompt={prompt} userInput={userInput} />
      )}
      <Stats {...stats} gameState={gameState} onReset={resetTest} />
    </div>
  )
}

export default App
