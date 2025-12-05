import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { PanelVanilla } from './Panel.vanilla';

describe('PanelVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as div by default', () => {
    const { container } = renderWithTheme(<PanelVanilla>Panel</PanelVanilla>);
    const panel = container.firstChild;

    expect(panel?.nodeName).toBe('DIV');
    expect(panel).toHaveTextContent('Panel');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <PanelVanilla className="custom-panel">Panel</PanelVanilla>,
    );
    const panel = container.firstChild as HTMLElement;

    expect(panel.className).toContain('custom-panel');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <PanelVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Panel</PanelVanilla>,
    );
    const panel = container.firstChild as HTMLElement;

    expect(panel.style.backgroundColor).toBe('red');
    expect(panel.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <PanelVanilla css={{ padding: '$4', margin: '$2' }}>Panel</PanelVanilla>,
    );
    const panel = container.firstChild as HTMLElement;

    expect(panel.style.padding).toBe('20px');
    expect(panel.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <PanelVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Panel
      </PanelVanilla>,
    );
    const panel = container.firstChild as HTMLElement;

    expect(panel.style.backgroundColor).toBe('blue');
    expect(panel.style.padding).toBe('30px');
    expect(panel.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<PanelVanilla ref={ref}>Panel</PanelVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <PanelVanilla data-testid="test-panel" aria-label="Test Panel">
        Panel
      </PanelVanilla>,
    );
    const panel = container.firstChild as HTMLElement;

    expect(panel.getAttribute('data-testid')).toBe('test-panel');
    expect(panel.getAttribute('aria-label')).toBe('Test Panel');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<PanelVanilla>Panel</PanelVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <PanelVanilla>Light Panel</PanelVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <PanelVanilla>Dark Panel</PanelVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
