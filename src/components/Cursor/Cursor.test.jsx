import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Cursor from './Cursor';

describe('Cursor component', () => {
    it('renders the cursor element with correct class and test ID', () => {
        render(<Cursor />);
        const cursorElement = screen.getByTestId('cursor');

        expect(cursorElement).toBeInTheDocument();
        expect(cursorElement).toHaveClass('cursor');
    });
});