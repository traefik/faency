import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ParagraphVanilla } from './Paragraph.vanilla';

describe('ParagraphVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as p element by default', () => {
    const { container } = renderWithTheme(<ParagraphVanilla>Paragraph text</ParagraphVanilla>);
    const paragraph = container.querySelector('p');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('Paragraph text');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <ParagraphVanilla className="custom-paragraph">Paragraph</ParagraphVanilla>,
    );
    const paragraph = container.querySelector('p');

    expect(paragraph?.className).toContain('custom-paragraph');
  });

  it('should apply size prop', () => {
    const sizes = ['1', '2', '3', '4', '5'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(
        <ParagraphVanilla size={size}>Paragraph</ParagraphVanilla>,
      );
      expect(container.querySelector('p')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <ParagraphVanilla style={{ color: 'red', padding: '10px' }}>Paragraph</ParagraphVanilla>,
    );
    const paragraph = container.querySelector('p') as HTMLElement;

    expect(paragraph.style.color).toBe('red');
    expect(paragraph.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <ParagraphVanilla css={{ padding: '$4', margin: '$2' }}>Paragraph</ParagraphVanilla>,
    );
    const paragraph = container.querySelector('p') as HTMLElement;

    expect(paragraph.style.padding).toBe('20px');
    expect(paragraph.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <ParagraphVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ color: 'blue', padding: '30px' }}
      >
        Paragraph
      </ParagraphVanilla>,
    );
    const paragraph = container.querySelector('p') as HTMLElement;

    expect(paragraph.style.color).toBe('blue');
    expect(paragraph.style.padding).toBe('30px');
    expect(paragraph.style.margin).toBe('8px');
  });

  it('should render polymorphically as different element', () => {
    const { container } = renderWithTheme(<ParagraphVanilla as="div">Paragraph</ParagraphVanilla>);
    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent('Paragraph');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    renderWithTheme(<ParagraphVanilla ref={ref}>Paragraph</ParagraphVanilla>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('P');
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <ParagraphVanilla data-testid="test-paragraph" aria-label="Test Paragraph">
        Paragraph
      </ParagraphVanilla>,
    );
    const paragraph = container.querySelector('p') as HTMLElement;

    expect(paragraph.getAttribute('data-testid')).toBe('test-paragraph');
    expect(paragraph.getAttribute('aria-label')).toBe('Test Paragraph');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <ParagraphVanilla>Accessible Paragraph</ParagraphVanilla>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <ParagraphVanilla>Light Paragraph</ParagraphVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <ParagraphVanilla>Dark Paragraph</ParagraphVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <ParagraphVanilla>Paragraph</ParagraphVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.querySelector('p')).toBeInTheDocument();
      unmount();
    });
  });
});
