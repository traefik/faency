import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { OverlayVanilla } from './Overlay.vanilla';

describe('OverlayVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  it('should render as a div by default', () => {
    const { container } = renderWithTheme(<OverlayVanilla>Content</OverlayVanilla>);
    const element = container.firstChild;

    expect(element?.nodeName).toBe('DIV');
    expect(element).toHaveTextContent('Content');
  });

  it('should render with custom element via as prop', () => {
    const { container } = renderWithTheme(<OverlayVanilla as="section" />);

    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(<OverlayVanilla className="custom-class" />);
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass('custom-class');
    expect(element.classList.length).toBeGreaterThan(1);
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(<OverlayVanilla style={{ position: 'fixed' }} />);

    expect((container.firstChild as HTMLElement).style.position).toBe('fixed');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(<OverlayVanilla css={{ p: '$4', m: '$2' }} />);
    const element = container.firstChild as HTMLElement;

    expect(element.style.padding).toBe('20px');
    expect(element.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <OverlayVanilla css={{ margin: '$2', padding: '$1' }} style={{ margin: '30px' }} />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.margin).toBe('30px');
    expect(element.style.padding).toBe('4px');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = renderWithTheme(<OverlayVanilla ref={ref} />);

    expect(ref.current).toBe(container.firstChild);
  });

  it('should pass through HTML attributes', () => {
    const { getByTestId } = renderWithTheme(
      <OverlayVanilla data-testid="overlay" id="overlay" aria-hidden />,
    );
    const element = getByTestId('overlay');

    expect(element).toHaveAttribute('id', 'overlay');
    expect(element).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<OverlayVanilla />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider forcedTheme={theme}>
          <OverlayVanilla />
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });
});
