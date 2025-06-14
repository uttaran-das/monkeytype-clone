// src/App.test.jsx
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from './App';

describe('App component - Full Test Flow', () => {
  const prompt = "Time was a wave, almost cruel in its relentlessness.";

  beforeEach(() => {
    // This ensures the spy is fresh and active before each test
    vi.spyOn(Date, 'now');
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('completes a perfect test run and displays correct stats', async () => {
    const user = userEvent.setup();
    render(<App />);

    // --- THIS IS THE FIX ---
    // STEP 1: Set the time for the START of the test.
    vi.mocked(Date.now).mockReturnValue(10000);
    // STEP 2: Perform the action that calls setStartTime.
    // We only need to type one character to start the timer.
    await user.keyboard(prompt[0]);

    // STEP 3: Set the time for the END of the test.
    vi.mocked(Date.now).mockReturnValue(22000);
    // STEP 4: Perform the action that calls setEndTime.
    await user.keyboard(prompt.slice(1));
    // --- END OF FIX ---

    // Now the assertions will use the explicitly mocked start and end times.
    expect(screen.getByTestId('results-card')).toBeInTheDocument();
    
    expect(screen.getByTestId('wpm-value')).toHaveTextContent('52');
    expect(screen.getByTestId('raw-wpm-value')).toHaveTextContent('52');
    expect(screen.getByTestId('accuracy-value')).toHaveTextContent('100%');
  });

  it('resets the test when "Try Again" is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.keyboard(prompt);
    
    const resetButton = screen.getByRole('button', { name: /try again/i });
    await user.click(resetButton);

    // --- FIX IS HERE ---
    // Instead of getByText, find the container and check its full text content.
    const typingArea = screen.getByTestId('typing-area');
    expect(typingArea).toBeInTheDocument();
    
    const normalizedTextContent = typingArea.textContent.replace(/\s/g, ' ');
    expect(normalizedTextContent).toBe(prompt);
    
    expect(screen.queryByTestId('results-card')).not.toBeInTheDocument();
  });
});