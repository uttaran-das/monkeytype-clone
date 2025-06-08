import './App.css'

function App() {
  const prompt = "Time was a wave, almost cruel in its relentlessness."

  return (
    <div className="app">
      <div className="words-container">
        <span className="cursor" data-testid="cursor"></span>
        {prompt}
      </div>
    </div>
  )
}

export default App
