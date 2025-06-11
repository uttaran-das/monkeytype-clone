import { useEffect, useState } from 'react'
import './App.css'
import TypingArea from './components/TypingArea/TypingArea'

function App() {
  const prompt = "Time was a wave, almost cruel in its relentlessness."
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (userInput.length >= prompt.length && e.key !== 'Backspace') return
      if (e.key === 'Backspace') setUserInput((prev) => prev.slice(0, -1))
      else if (e.key.length === 1) setUserInput((prev => prev + e.key));
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userInput.length, prompt.length])

  return (
    <div className="app">
      <TypingArea prompt={prompt} userInput={userInput} />
    </div>
  )
}

export default App
