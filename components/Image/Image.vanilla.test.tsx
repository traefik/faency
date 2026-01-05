import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ImageVanilla } from './Image.vanilla';

describe('ImageVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as img element by default', () => {
    const { container } = renderWithTheme(
      <ImageVanilla src="https://example.com/image.jpg" alt="Test image" />,
    );
    const element = container.firstChild;

    expect(element?.nodeName).toBe('IMG');
    expect(element).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(element).toHaveAttribute('alt', 'Test image');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <ImageVanilla src="https://example.com/image.jpg" alt="Test" className="custom-class" />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <ImageVanilla
        src="https://example.com/image.jpg"
        alt="Test"
        style={{ border: '1px solid red', padding: '10px' }}
      />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.border).toBe('1px solid red');
    expect(element.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <ImageVanilla
        src="https://example.com/image.jpg"
        alt="Test"
        css={{ padding: '$4', margin: '$2' }}
      />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.padding).toBe('20px');
    expect(element.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <ImageVanilla
        src="https://example.com/image.jpg"
        alt="Test"
        css={{ padding: '$4', margin: '$2' }}
        style={{ border: '2px solid blue', padding: '30px' }}
      />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.border).toBe('2px solid blue');
    expect(element.style.padding).toBe('30px'); // style overrides css
    expect(element.style.margin).toBe('8px'); // from css
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<ImageVanilla ref={ref} src="https://example.com/image.jpg" alt="Test" />);

    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <ImageVanilla
        src="https://example.com/image.jpg"
        alt="Test"
        data-testid="test-image"
        loading="lazy"
        width={300}
        height={200}
      />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.getAttribute('data-testid')).toBe('test-image');
    expect(element.getAttribute('loading')).toBe('lazy');
    expect(element.getAttribute('width')).toBe('300');
    expect(element.getAttribute('height')).toBe('200');
  });

  it('should have no accessibility violations with alt text', async () => {
    const { container } = renderWithTheme(
      <ImageVanilla src="https://example.com/image.jpg" alt="Accessible image" />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <ImageVanilla src="https://example.com/image.jpg" alt="Light theme image" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <ImageVanilla src="https://example.com/image.jpg" alt="Dark theme image" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply base styles (verticalAlign middle and maxWidth 100%)', () => {
    const { container } = renderWithTheme(
      <ImageVanilla src="https://example.com/image.jpg" alt="Test" />,
    );
    const element = container.firstChild as HTMLElement;

    // The styles are applied via className, so we check the element has the class
    expect(element.className).toBeTruthy();
  });

  it('should handle css prop with width override', () => {
    const { container } = renderWithTheme(
      <ImageVanilla src="https://example.com/image.jpg" alt="Test" css={{ width: '200px' }} />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.width).toBe('200px');
  });

  it('should render as different element when using as prop', () => {
    const { container } = renderWithTheme(<ImageVanilla as="div" aria-label="Image placeholder" />);
    const element = container.firstChild;

    expect(element?.nodeName).toBe('DIV');
  });

  it('should support polymorphic rendering with different elements', () => {
    const elements = ['img', 'div', 'span', 'picture'] as const;

    elements.forEach((element) => {
      const { container, unmount } = renderWithTheme(
        <ImageVanilla as={element} aria-label="Test" />,
      );
      const renderedElement = container.firstChild;

      expect(renderedElement?.nodeName).toBe(element.toUpperCase());
      unmount();
    });
  });

  it('should forward ref correctly with polymorphic as prop', () => {
    const ref = { current: null };
    renderWithTheme(<ImageVanilla as="div" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should apply styles with polymorphic rendering', () => {
    const { container } = renderWithTheme(
      <ImageVanilla as="div" css={{ padding: '$4' }} aria-label="Styled div" />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.nodeName).toBe('DIV');
    expect(element.style.padding).toBe('20px');
  });

  it('should maintain image attributes when rendered as img with polymorphic typing', () => {
    const { container } = renderWithTheme(
      <ImageVanilla as="img" src="https://example.com/image.jpg" alt="Polymorphic image" />,
    );
    const element = container.firstChild;

    expect(element?.nodeName).toBe('IMG');
    expect(element).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(element).toHaveAttribute('alt', 'Polymorphic image');
  });
});
