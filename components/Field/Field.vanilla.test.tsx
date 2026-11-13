import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { InputVanilla } from '../Input';
import { TextareaVanilla } from '../Textarea';
import { FieldVanilla } from './Field.vanilla';

describe('FieldVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should link the label to the control without an id', () => {
    renderWithTheme(
      <FieldVanilla label="Name">
        <InputVanilla />
      </FieldVanilla>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('should mark the control as invalid and describe it', () => {
    renderWithTheme(
      <FieldVanilla label="Name" description="Lowercase letters only" error="Name is required">
        <InputVanilla />
      </FieldVanilla>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Name is required Lowercase letters only');
  });

  it('should support TextareaVanilla as a control', () => {
    renderWithTheme(
      <FieldVanilla label="Notes" description="Markdown is supported">
        <TextareaVanilla />
      </FieldVanilla>,
    );

    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAccessibleDescription(
      'Markdown is supported',
    );
  });

  describe('with announceError', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    const renderField = (error?: string) => (
      <FieldVanilla label="Name" announceError error={error}>
        <InputVanilla />
      </FieldVanilla>
    );

    it('should announce the error in a polite live region after a pause', () => {
      const { container, rerender } = renderWithTheme(renderField());
      const region = container.querySelector('[aria-live="polite"]');
      expect(region).toBeEmptyDOMElement();

      rerender(
        <VanillaExtractThemeProvider>
          {renderField('Name is already taken')}
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAccessibleDescription(
        'Name is already taken',
      );
      expect(region).toBeEmptyDOMElement();

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(container.querySelector('[aria-live="polite"]')).toBe(region);
      expect(region).toHaveTextContent(/^Name: Name is already taken$/);

      rerender(<VanillaExtractThemeProvider>{renderField()}</VanillaExtractThemeProvider>);

      act(() => {
        jest.advanceTimersByTime(0);
      });
      expect(region).toBeEmptyDOMElement();
    });

    it('should announce only the last error when it changes during the pause', () => {
      const { container, rerender } = renderWithTheme(renderField('Too short'));
      const region = container.querySelector('[aria-live="polite"]');

      act(() => {
        jest.advanceTimersByTime(600);
      });
      rerender(
        <VanillaExtractThemeProvider>
          {renderField('Only lowercase letters')}
        </VanillaExtractThemeProvider>,
      );
      act(() => {
        jest.advanceTimersByTime(600);
      });
      expect(region).toBeEmptyDOMElement();

      act(() => {
        jest.advanceTimersByTime(400);
      });
      expect(region).toHaveTextContent(/^Name: Only lowercase letters$/);
    });
  });

  it('should not render a live region by default', () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Name" error="Name is required">
        <InputVanilla />
      </FieldVanilla>,
    );

    expect(container.querySelector('[aria-live]')).not.toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Name" description="Lowercase letters only" error="Name is required">
        <InputVanilla />
      </FieldVanilla>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should put the label and the hint before the control with labelPosition start', () => {
    renderWithTheme(
      <FieldVanilla label="Name" hint="Names the route." labelPosition="start">
        <InputVanilla />
      </FieldVanilla>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAccessibleDescription('Names the route.');
    expect(screen.getByText('Names the route.').compareDocumentPosition(input)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('should name and describe the group with group', () => {
    renderWithTheme(
      <FieldVanilla label="Endpoint" error="Use a host or a path." group>
        <InputVanilla aria-label="Host" />
        <InputVanilla aria-label="Path" />
      </FieldVanilla>,
    );

    expect(screen.getByRole('group', { name: 'Endpoint' })).toHaveAccessibleDescription(
      'Use a host or a path.',
    );
    expect(screen.getByRole('textbox', { name: 'Host' })).not.toHaveAttribute('aria-invalid');
  });
});
