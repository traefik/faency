import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { BlockquoteVanilla } from './Blockquote.vanilla';

describe('BlockquoteVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as blockquote element by default', () => {
    const { container } = renderWithTheme(<BlockquoteVanilla>Quote text</BlockquoteVanilla>);
    const blockquote = container.querySelector('blockquote');

    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent('Quote text');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <BlockquoteVanilla className="custom-blockquote">Quote</BlockquoteVanilla>,
    );
    const blockquote = container.querySelector('blockquote');

    expect(blockquote?.className).toContain('custom-blockquote');
  });

  it('should apply size prop', () => {
    const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(
        <BlockquoteVanilla size={size}>Quote</BlockquoteVanilla>,
      );
      expect(container.querySelector('blockquote')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply weight prop', () => {
    const weights = ['light', 'regular', 'medium', 'bold'] as const;

    weights.forEach((weight) => {
      const { container, unmount } = renderWithTheme(
        <BlockquoteVanilla weight={weight}>Quote</BlockquoteVanilla>,
      );
      expect(container.querySelector('blockquote')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['gray', 'contrast'] as const;

    variants.forEach((variant) => {
      const { container, unmount } = renderWithTheme(
        <BlockquoteVanilla variant={variant}>Quote</BlockquoteVanilla>,
      );
      expect(container.querySelector('blockquote')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply gradient prop', () => {
    const { container } = renderWithTheme(<BlockquoteVanilla gradient>Quote</BlockquoteVanilla>);
    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  it('should apply transform prop', () => {
    const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;

    transforms.forEach((transform) => {
      const { container, unmount } = renderWithTheme(
        <BlockquoteVanilla transform={transform}>Quote</BlockquoteVanilla>,
      );
      expect(container.querySelector('blockquote')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply noWrap prop', () => {
    const { container } = renderWithTheme(<BlockquoteVanilla noWrap>Quote</BlockquoteVanilla>);
    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <BlockquoteVanilla style={{ backgroundColor: 'red', padding: '10px' }}>
        Quote
      </BlockquoteVanilla>,
    );
    const blockquote = container.querySelector('blockquote') as HTMLElement;

    expect(blockquote.style.backgroundColor).toBe('red');
    expect(blockquote.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <BlockquoteVanilla css={{ padding: '$4', margin: '$2' }}>Quote</BlockquoteVanilla>,
    );
    const blockquote = container.querySelector('blockquote') as HTMLElement;

    expect(blockquote.style.padding).toBe('20px');
    expect(blockquote.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <BlockquoteVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Quote
      </BlockquoteVanilla>,
    );
    const blockquote = container.querySelector('blockquote') as HTMLElement;

    expect(blockquote.style.backgroundColor).toBe('blue');
    expect(blockquote.style.padding).toBe('30px');
    expect(blockquote.style.margin).toBe('8px');
  });

  it('should render polymorphically as different element', () => {
    const { container } = renderWithTheme(<BlockquoteVanilla as="div">Quote</BlockquoteVanilla>);
    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent('Quote');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLQuoteElement>();
    renderWithTheme(<BlockquoteVanilla ref={ref}>Quote</BlockquoteVanilla>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('BLOCKQUOTE');
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <BlockquoteVanilla data-testid="test-blockquote" aria-label="Test Quote">
        Quote
      </BlockquoteVanilla>,
    );
    const blockquote = container.querySelector('blockquote') as HTMLElement;

    expect(blockquote.getAttribute('data-testid')).toBe('test-blockquote');
    expect(blockquote.getAttribute('aria-label')).toBe('Test Quote');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<BlockquoteVanilla>Accessible Quote</BlockquoteVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <BlockquoteVanilla>Light Quote</BlockquoteVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <BlockquoteVanilla>Dark Quote</BlockquoteVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <BlockquoteVanilla>Quote</BlockquoteVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.querySelector('blockquote')).toBeInTheDocument();
      unmount();
    });
  });
});
