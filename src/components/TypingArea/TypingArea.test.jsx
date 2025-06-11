// src/components/TypingArea/TypingArea.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TypingArea from './TypingArea';

describe('TypingArea component', () => {
    const prompt = "Test prompt";

    it('renders correctly and matches snapshot', () => {
        const { container } = render(<TypingArea prompt={prompt} userInput="" />);
        expect(container).toMatchSnapshot();
    });

    it('styles characters correctly based on userInput', () => {
        // User typed "Tesk" instead of "Test"
        const userInput = "Tesk";
        render(<TypingArea prompt={prompt} userInput={userInput} />);

        const tElements = screen.getAllByText('t');

        expect(screen.getByText('T')).toHaveClass('correct');
        expect(screen.getByText('e')).toHaveClass('correct');
        expect(screen.getByText('s')).toHaveClass('correct');
        expect(tElements[0]).toHaveClass('incorrect');
        expect(tElements[1]).not.toHaveClass('incorrect');
        expect(tElements[1]).not.toHaveClass('correct');
    });

    it('positions the cursor after the last typed character', () => {
        const userInput = "Te";
        render(<TypingArea prompt={prompt} userInput={userInput} />);

        const cursor = screen.getByTestId('cursor');
        // The cursor's next sibling in the DOM should be the 's' character span
        const sCharElement = screen.getByText('s');
        expect(cursor.nextSibling).toBe(sCharElement);
    });

    it('positions the cursor at the end if the prompt is fully typed', () => {
        render(<TypingArea prompt={prompt} userInput={prompt} />);
        const cursor = screen.getByTestId('cursor');

        // The cursor should be the last child in its container span
        expect(cursor.nextSibling).toBeNull();
    });
});