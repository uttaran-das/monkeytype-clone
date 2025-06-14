import React from 'react'
import PropTypes from 'prop-types'
import Character from "../Character/Character";
import Cursor from "../Cursor/Cursor";

const TypingArea = ({ prompt, userInput }) => {
    const characters = prompt.split('');

    return (
        <div className="words-container" data-testid="typing-area">
            {characters.map((char, index) => {
                const isTyped = index < userInput.length
                let state
                if (isTyped) state = userInput[index] === char ? 'correct' : 'incorrect'
                const isCurrentChar = index === userInput.length

                return (
                    <span key={index}>
                        {isCurrentChar && <Cursor />}
                        <Character char={char} state={state} />
                    </span>
                )
            })}
            {userInput.length >= prompt.length && <Cursor />}
        </div>
    )
}

TypingArea.propTypes = {
    prompt: PropTypes.string.isRequired,
    userInput: PropTypes.string.isRequired,
}

export default TypingArea