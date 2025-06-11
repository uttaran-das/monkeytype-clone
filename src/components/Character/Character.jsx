import React from 'react'
import PropTypes from 'prop-types';

const Character = ({ char, state }) => {
    const stateClasses = {
        correct: 'correct',
        incorrect: 'incorrect',
    }

    const displayChar = char === ' '? '\u00A0' : char

    return <span className={`character ${stateClasses[state] || ''}`}>{displayChar}</span>
}

Character.propTypes = {
    char: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['correct', 'incorrect', undefined]),
}

export default Character