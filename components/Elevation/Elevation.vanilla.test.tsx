import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ElevationVanilla } from './Elevation.vanilla';

describe('ElevationVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as div by default', () => {
    const { container } = renderWithTheme(<ElevationVanilla>Elevation</ElevationVanilla>);
    const elevation = container.firstChild;

    expect(elevation?.nodeName).toBe('DIV');
    expect(elevation).toHaveTextContent('Elevation');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla className="custom-elevation">Elevation</ElevationVanilla>,
    );
    const elevation = container.firstChild as HTMLElement;

    expect(elevation.className).toContain('custom-elevation');
  });

  it('should apply variant prop', () => {
    const variants = [0, 1, 2, 3, 4, 5] as const;

    variants.forEach((variant) => {
      const { container } = renderWithTheme(
        <ElevationVanilla variant={variant}>Elevation</ElevationVanilla>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla style={{ backgroundColor: 'red', padding: '10px' }}>
        Elevation
      </ElevationVanilla>,
    );
    const elevation = container.firstChild as HTMLElement;

    expect(elevation.style.backgroundColor).toBe('red');
    expect(elevation.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla css={{ padding: '$4', margin: '$2' }}>Elevation</ElevationVanilla>,
    );
    const elevation = container.firstChild as HTMLElement;

    expect(elevation.style.padding).toBe('20px');
    expect(elevation.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Elevation
      </ElevationVanilla>,
    );
    const elevation = container.firstChild as HTMLElement;

    expect(elevation.style.backgroundColor).toBe('blue');
    expect(elevation.style.padding).toBe('30px');
    expect(elevation.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<ElevationVanilla ref={ref}>Elevation</ElevationVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla data-testid="test-elevation" aria-label="Test Elevation">
        Elevation
      </ElevationVanilla>,
    );
    const elevation = container.firstChild as HTMLElement;

    expect(elevation.getAttribute('data-testid')).toBe('test-elevation');
    expect(elevation.getAttribute('aria-label')).toBe('Test Elevation');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<ElevationVanilla>Elevation</ElevationVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <ElevationVanilla>Light Elevation</ElevationVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <ElevationVanilla>Dark Elevation</ElevationVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render as custom element when as prop is provided', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla as="section">Elevation</ElevationVanilla>,
    );
    const elevation = container.firstChild;

    expect(elevation?.nodeName).toBe('SECTION');
    expect(elevation).toHaveTextContent('Elevation');
  });

  it('should render as article element with as prop', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla as="article">Elevation</ElevationVanilla>,
    );
    const elevation = container.firstChild;

    expect(elevation?.nodeName).toBe('ARTICLE');
  });

  it('should render as span element with as prop', () => {
    const { container } = renderWithTheme(<ElevationVanilla as="span">Elevation</ElevationVanilla>);
    const elevation = container.firstChild;

    expect(elevation?.nodeName).toBe('SPAN');
  });

  it('should apply className and styles when using as prop', () => {
    const { container } = renderWithTheme(
      <ElevationVanilla as="section" className="custom" style={{ color: 'red' }}>
        Elevation
      </ElevationVanilla>,
    );
    const elevation = container.firstChild as HTMLElement;

    expect(elevation.nodeName).toBe('SECTION');
    expect(elevation.className).toContain('custom');
    expect(elevation.style.color).toBe('red');
  });

  it('should forward ref correctly when using as prop', () => {
    const ref = React.createRef<HTMLElement>();
    renderWithTheme(
      <ElevationVanilla as="section" ref={ref}>
        Elevation
      </ElevationVanilla>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.nodeName).toBe('SECTION');
  });
});
