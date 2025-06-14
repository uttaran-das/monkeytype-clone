// src/components/Stats/Stats.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Stats from './Stats';

describe('Stats component', () => {
  it('renders nothing when gameState is "waiting"', () => {
    const { container } = render(
      <Stats gameState="waiting" wpm={0} rawWpm={0} accuracy={0} correctChars={0} totalChars={0} onReset={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders live stats when gameState is "running"', () => {
    render(
      <Stats gameState="running" wpm={0} rawWpm={0} accuracy={0} correctChars={5} totalChars={6} onReset={() => {}} />
    );
    // These queries are still fine as they test the full output.
    expect(screen.getByText('Correct: 5')).toBeInTheDocument();
    expect(screen.getByTestId('total-chars-live')).toHaveTextContent('Total: 6');
  });

  it('renders final results when gameState is "finished"', () => {
    render(
      <Stats gameState="finished" wpm={50} rawWpm={52} accuracy={95} correctChars={0} totalChars={0} onReset={() => {}} />
    );
    // Use data-testid for the dynamic values
    expect(screen.getByTestId('wpm-value')).toHaveTextContent('50');
    expect(screen.getByTestId('raw-wpm-value')).toHaveTextContent('52');
    expect(screen.getByTestId('accuracy-value')).toHaveTextContent('95%');

    // Querying by role is still the best practice for buttons
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls onReset when the "Try Again" button is clicked', () => {
    const handleReset = vi.fn();
    render(
      <Stats gameState="finished" wpm={50} rawWpm={52} accuracy={95} correctChars={0} totalChars={0} onReset={handleReset} />
    );
    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});