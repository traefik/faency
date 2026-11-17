import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { FieldVanilla } from '@/components/Field';

import { CheckboxVanilla } from './Checkbox.vanilla';

describe('CheckboxVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  it('should render as a checkbox button', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });

    expect(checkbox.tagName).toBe('BUTTON');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('should toggle when clicked', () => {
    const onCheckedChange = jest.fn();
    renderWithTheme(<CheckboxVanilla aria-label="Accept" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('should render the indicator when checked', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" defaultChecked />);

    expect(screen.getByRole('checkbox').querySelector('svg')).toBeInTheDocument();
  });

  it('should render the indeterminate state with a dash and aria-checked mixed', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Select all" checked="indeterminate" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    expect(checkbox.querySelector('span')).toHaveAttribute('data-state', 'indeterminate');
    expect(checkbox.querySelectorAll('svg')).toHaveLength(2);
  });

  it('should render with custom className', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" className="custom-class" />);

    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('should apply size variants', () => {
    (['medium', 'large'] as const).forEach((size) => {
      const { unmount } = renderWithTheme(<CheckboxVanilla aria-label="Accept" size={size} />);

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" style={{ margin: '10px' }} />);

    expect(screen.getByRole('checkbox').style.margin).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" css={{ m: '$2' }} />);

    expect(screen.getByRole('checkbox').style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <CheckboxVanilla
        aria-label="Accept"
        css={{ margin: '$2', padding: '$1' }}
        style={{ margin: '30px' }}
      />,
    );
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox.style.margin).toBe('30px');
    expect(checkbox.style.padding).toBe('4px');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(<CheckboxVanilla aria-label="Accept" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('checkbox'));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" data-testid="checkbox" id="accept" />);
    const checkbox = screen.getByTestId('checkbox');

    expect(checkbox).toHaveAttribute('id', 'accept');
  });

  it('should handle disabled state', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" disabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should set aria-invalid', () => {
    renderWithTheme(<CheckboxVanilla aria-label="Accept" aria-invalid />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should take its label, description, error and disabled state from FieldVanilla', () => {
    renderWithTheme(
      <FieldVanilla
        label="Accept the terms"
        description="Required"
        error="You must accept"
        labelPosition="end"
        disabled
      >
        <CheckboxVanilla />
      </FieldVanilla>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Accept the terms' });

    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription(expect.stringContaining('Required'));
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<CheckboxVanilla aria-label="Accept" />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should have no accessibility violations inside FieldVanilla', async () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Accept the terms" labelPosition="end">
        <CheckboxVanilla />
      </FieldVanilla>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider forcedTheme={theme}>
          <CheckboxVanilla aria-label="Accept" defaultChecked />
        </VanillaExtractThemeProvider>,
      );

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      unmount();
    });
  });

  it('should work with different primary colors', () => {
    (['blue', 'neon', 'orange', 'red', 'green', 'deepBlue', 'grayBlue'] as const).forEach(
      (primaryColor) => {
        const { unmount } = render(
          <VanillaExtractThemeProvider primaryColor={primaryColor}>
            <CheckboxVanilla aria-label="Accept" defaultChecked />
          </VanillaExtractThemeProvider>,
        );

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        unmount();
      },
    );
  });
});
