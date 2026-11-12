import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { SpinnerVanilla } from './Spinner.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

describe('SpinnerVanilla', () => {
  it('renders a status announcing "Loading" by default', () => {
    renderWithTheme(<SpinnerVanilla />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('announces a custom label', () => {
    renderWithTheme(<SpinnerVanilla label="Loading more results" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading more results');
  });

  it('hides the graphic from assistive tech', () => {
    const { container } = renderWithTheme(<SpinnerVanilla />);

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('can be hidden entirely when loading is announced elsewhere', () => {
    renderWithTheme(<SpinnerVanilla aria-hidden />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders every size', () => {
    (['small', 'medium', 'large'] as const).forEach((size) => {
      const { unmount } = renderWithTheme(<SpinnerVanilla size={size} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies a color', () => {
    const { unmount } = renderWithTheme(<SpinnerVanilla color="rgb(0, 128, 0)" />);
    expect(screen.getByRole('status').style.color).toBe('rgb(0, 128, 0)');
    unmount();

    renderWithTheme(<SpinnerVanilla color="currentColor" />);
    expect(screen.getByRole('status').style.color).toBe('currentcolor');
  });

  it('resolves a color token', () => {
    renderWithTheme(<SpinnerVanilla color="$hiContrast" />);

    expect(screen.getByRole('status').style.color).not.toBe('');
    expect(screen.getByRole('status').style.color).not.toBe('$hiContrast');
  });

  it('leaves the default color to the stylesheet and lets css win over color', () => {
    const { unmount } = renderWithTheme(<SpinnerVanilla />);
    expect(screen.getByRole('status').style.color).toBe('');
    unmount();

    renderWithTheme(<SpinnerVanilla color="rgb(0, 128, 0)" css={{ c: 'rgb(255, 0, 0)' }} />);
    expect(screen.getByRole('status').style.color).toBe('rgb(255, 0, 0)');
  });

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    renderWithTheme(<SpinnerVanilla ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('merges className, css and style, and passes HTML attributes through', () => {
    renderWithTheme(
      <SpinnerVanilla
        className="custom"
        css={{ mt: '$2', c: 'rgb(255, 0, 0)' }}
        style={{ marginLeft: '4px' }}
        data-testid="spinner"
      />,
    );
    const spinner = screen.getByTestId('spinner');

    expect(spinner.className).toContain('custom');
    expect(spinner.style.marginTop).toBe('8px');
    expect(spinner.style.color).toBe('rgb(255, 0, 0)');
    expect(spinner.style.marginLeft).toBe('4px');
  });

  it('works in light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider defaultTheme={theme}>
          <SpinnerVanilla />
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <>
        <SpinnerVanilla />
        <SpinnerVanilla size="large" label="Loading more results" />
      </>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
