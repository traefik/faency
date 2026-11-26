import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { VisuallyHiddenVanilla } from './VisuallyHidden.vanilla';

describe('VisuallyHiddenVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  it('should render its content as a span', () => {
    renderWithTheme(<VisuallyHiddenVanilla>Hidden text</VisuallyHiddenVanilla>);
    const element = screen.getByText('Hidden text');

    expect(element.tagName).toBe('SPAN');
  });

  it('should hide its content visually', () => {
    renderWithTheme(<VisuallyHiddenVanilla>Hidden text</VisuallyHiddenVanilla>);
    const element = screen.getByText('Hidden text');

    expect(element.style.position).toBe('absolute');
    expect(element.style.width).toBe('1px');
    expect(element.style.height).toBe('1px');
    expect(element.style.overflow).toBe('hidden');
  });

  it('should keep its content in the accessible name', () => {
    renderWithTheme(
      <button>
        <svg aria-hidden />
        <VisuallyHiddenVanilla>Settings</VisuallyHiddenVanilla>
      </button>,
    );

    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });

  it('should render the as element hidden', () => {
    renderWithTheme(
      <table>
        <VisuallyHiddenVanilla as="caption">Hidden caption</VisuallyHiddenVanilla>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>,
    );
    const caption = screen.getByText('Hidden caption');

    expect(caption.tagName).toBe('CAPTION');
    expect(caption.style.position).toBe('absolute');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(
      <VisuallyHiddenVanilla css={{ color: '$hiContrast' }}>Hidden</VisuallyHiddenVanilla>,
    );
    const element = screen.getByText('Hidden');

    expect(element.style.color).not.toBe('');
    expect(element.style.position).toBe('absolute');
  });

  it('should render with custom className', () => {
    renderWithTheme(<VisuallyHiddenVanilla className="custom-class">Hidden</VisuallyHiddenVanilla>);

    expect(screen.getByText('Hidden')).toHaveClass('custom-class');
  });

  it('should merge the style prop', () => {
    renderWithTheme(<VisuallyHiddenVanilla style={{ color: 'red' }}>Hidden</VisuallyHiddenVanilla>);
    const element = screen.getByText('Hidden');

    expect(element.style.color).toBe('red');
    expect(element.style.position).toBe('absolute');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    renderWithTheme(<VisuallyHiddenVanilla ref={ref}>Hidden</VisuallyHiddenVanilla>);

    expect(ref.current).toBe(screen.getByText('Hidden'));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(
      <VisuallyHiddenVanilla data-testid="hidden" id="hidden-id">
        Hidden
      </VisuallyHiddenVanilla>,
    );

    expect(screen.getByTestId('hidden')).toHaveAttribute('id', 'hidden-id');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <button>
        <svg aria-hidden />
        <VisuallyHiddenVanilla>Settings</VisuallyHiddenVanilla>
      </button>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider forcedTheme={theme}>
          <VisuallyHiddenVanilla>Hidden</VisuallyHiddenVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(screen.getByText('Hidden')).toBeInTheDocument();
      unmount();
    });
  });
});
