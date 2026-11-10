import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('should link the label to the textarea without an id', () => {
    render(<Textarea label="Notes" />);
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument();
  });

  it('should keep the given id', () => {
    render(<Textarea label="Notes" id="notes" />);
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('id', 'notes');
  });

  it('should set aria-invalid when state is invalid', () => {
    render(<Textarea label="Notes" state="invalid" />);
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render the description and the error', () => {
    render(
      <Textarea label="Notes" description="Markdown is supported" error="Notes are required" />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Notes' });
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAccessibleDescription('Notes are required Markdown is supported');
  });

  it('should render without a label', () => {
    const { container } = render(<Textarea aria-label="Notes" />);
    expect(container.querySelector('label')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Textarea label="Notes" description="Markdown is supported" error="Notes are required" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should announce the error with the label text when announceError is set', () => {
    jest.useFakeTimers();
    try {
      const { container } = render(
        <Textarea label="Notes" error="Notes are required" announceError />,
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(
        /^Notes: Notes are required$/,
      );
    } finally {
      jest.useRealTimers();
    }
  });

  it('should keep the textarea when an error appears without a label', () => {
    const { rerender } = render(<Textarea aria-label="Notes" />);
    const textarea = screen.getByRole('textbox', { name: 'Notes' });
    textarea.focus();

    rerender(<Textarea aria-label="Notes" error="Required" />);

    expect(screen.getByRole('textbox', { name: 'Notes' })).toBe(textarea);
    expect(textarea).toHaveFocus();
  });
});
