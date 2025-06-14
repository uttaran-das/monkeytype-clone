import React from 'react'
import PropTypes from 'prop-types'

const Stats = ({ gameState, wpm, rawWpm, accuracy, correctChars, totalChars, onReset }) => {
    // live stats

    if (gameState === 'running') {
        return (
            <div className="stats-container live-stats" data-testid="live-stats">
                <span>Correct: {correctChars}</span>
                <span data-testid="total-chars-live">Total: {totalChars}</span>
            </div>
        )
    }

    // final result

    if (gameState === 'finished') {
        return (
            <div className="stats-container results-card" data-testid="results-card">
                <h2>Results</h2>
                <div className="results-grid">
                    <div className="results-item">
                        <div className="results-label">WPM</div>
                        {/* Add data-testid to the value containers */}
                        <div className="results-value" data-testid="wpm-value">{wpm}</div>
                    </div>
                    <div className="results-item">
                        <div className="results-label">Raw</div>
                        <div className="results-value" data-testid="raw-wpm-value">{rawWpm}</div>
                    </div>
                    <div className="results-item">
                        <div className="results-label">Accuracy</div>
                        <div className="results-value" data-testid="accuracy-value">{accuracy}%</div>
                    </div>
                </div>
                <button className="reset-button" onClick={onReset}>Try Again</button>
            </div>
        )
    }

return null;
}

Stats.propTypes = {
    gameState: PropTypes.oneOf(['waiting', 'running', 'finished']).isRequired,
    wpm: PropTypes.number.isRequired,
    rawWpm: PropTypes.number.isRequired,
    accuracy: PropTypes.number.isRequired,
    correctChars: PropTypes.number.isRequired,
    totalChars: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
}

export default Stats