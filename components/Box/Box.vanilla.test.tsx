import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { BoxVanilla } from './Box.vanilla';

describe('BoxVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as a div by default', () => {
    const { container } = renderWithTheme(<BoxVanilla>Content</BoxVanilla>);
    const box = container.firstChild;

    expect(box?.nodeName).toBe('DIV');
    expect(box).toHaveTextContent('Content');
  });

  it('should render with custom element via as prop', () => {
    const { container } = renderWithTheme(<BoxVanilla as="section">Content</BoxVanilla>);
    const box = container.firstChild;

    expect(box?.nodeName).toBe('SECTION');
    expect(box).toHaveTextContent('Content');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <BoxVanilla className="custom-class">Content</BoxVanilla>,
    );
    const box = container.firstChild as HTMLElement;

    expect(box.className).toContain('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <BoxVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Content</BoxVanilla>,
    );
    const box = container.firstChild as HTMLElement;

    expect(box.style.backgroundColor).toBe('red');
    expect(box.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <BoxVanilla css={{ padding: '$4', margin: '$2' }}>Content</BoxVanilla>,
    );
    const box = container.firstChild as HTMLElement;

    expect(box.style.padding).toBe('20px');
    expect(box.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <BoxVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Content
      </BoxVanilla>,
    );
    const box = container.firstChild as HTMLElement;

    expect(box.style.backgroundColor).toBe('blue');
    // style prop should override css prop
    expect(box.style.padding).toBe('30px');
    expect(box.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<BoxVanilla ref={ref}>Content</BoxVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <BoxVanilla data-testid="test-box" aria-label="Test Box">
        Content
      </BoxVanilla>,
    );
    const box = container.firstChild as HTMLElement;

    expect(box.getAttribute('data-testid')).toBe('test-box');
    expect(box.getAttribute('aria-label')).toBe('Test Box');
  });

  it('should render multiple children', () => {
    const { container } = renderWithTheme(
      <BoxVanilla>
        <span>Child 1</span>
        <span>Child 2</span>
      </BoxVanilla>,
    );

    expect(container.textContent).toContain('Child 1');
    expect(container.textContent).toContain('Child 2');
  });

  it('should render with different semantic elements', () => {
    const elements: Array<keyof JSX.IntrinsicElements> = [
      'article',
      'aside',
      'footer',
      'header',
      'main',
      'nav',
      'section',
    ];

    elements.forEach((element) => {
      const { container } = renderWithTheme(<BoxVanilla as={element}>Content</BoxVanilla>);
      const box = container.firstChild;

      expect(box?.nodeName).toBe(element.toUpperCase());
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<BoxVanilla>Content</BoxVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <BoxVanilla>Light theme content</BoxVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <BoxVanilla>Dark theme content</BoxVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['blue', 'neon', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { container } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <BoxVanilla>Content</BoxVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
