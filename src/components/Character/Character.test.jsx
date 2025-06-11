// src/components/Character/Character.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import Character from './Character';

describe('Character component', () => {
    it('renders a character with no state class if state is undefined', () => {
        render(<Character char="a" />);
        const charElement = screen.getByText('a');
        expect(charElement).toHaveClass('character');
        expect(charElement).not.toHaveClass('correct');
        expect(charElement).not.toHaveClass('incorrect');
    });

    it('renders a character with the "correct" class', () => {
        render(<Character char="b" state="correct" />);
        const charElement = screen.getByText('b');
        expect(charElement).toHaveClass('character', 'correct');
    });

    it('renders a character with the "incorrect" class', () => {
        render(<Character char="c" state="incorrect" />);
        const charElement = screen.getByText('c');
        expect(charElement).toHaveClass('character', 'incorrect');
    });
});