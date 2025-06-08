import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe('App component', () => {
    const promptText = "Time was a wave, almost cruel in its relentlessness.";

    it('renders the fixed prompt text', () => {
        render(<App />);
        const promptElement = screen.getByText(promptText);
        expect(promptElement).toBeInTheDocument();
    });

    it('renders the blinking cursor element', () => {
        render(<App />);
        const cursorElement = screen.getByTestId('cursor');
        expect(cursorElement).toBeInTheDocument();
        expect(cursorElement).toHaveClass('cursor');
    });
})