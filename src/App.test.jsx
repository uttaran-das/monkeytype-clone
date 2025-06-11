// src/App.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

// Mock the child component to isolate the App component's logic
vi.mock('./components/TypingArea/TypingArea', () => ({
    default: ({ prompt, userInput }) => (
        <div data-testid="typing-area">
            <p>{prompt}</p>
            <p data-testid="user-input-display">{userInput}</p>
        </div>
    ),
}));

describe('App component - State Management', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('updates the userInput state on key press', async () => {
        const user = userEvent.setup();
        await user.keyboard('abc');

        const userInputDisplay = screen.getByTestId('user-input-display');
        expect(userInputDisplay).toHaveTextContent('abc');
    });

    it('handles backspace correctly by updating state', async () => {
        const user = userEvent.setup();
        await user.keyboard('abc');
        await user.keyboard('{backspace}');

        const userInputDisplay = screen.getByTestId('user-input-display');
        expect(userInputDisplay).toHaveTextContent('ab');
    });
});