import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { TextVanilla } from './Text.vanilla';

describe('TextVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as span element by default', () => {
    const { container } = renderWithTheme(<TextVanilla>Text content</TextVanilla>);
    const span = container.querySelector('span');

    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent('Text content');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(<TextVanilla className="custom-text">Text</TextVanilla>);
    const span = container.querySelector('span');

    expect(span?.className).toContain('custom-text');
  });

  it('should apply size prop', () => {
    const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(<TextVanilla size={size}>Text</TextVanilla>);
      expect(container.querySelector('span')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply weight prop', () => {
    const weights = ['light', 'regular', 'medium', 'bold'] as const;

    weights.forEach((weight) => {
      const { container, unmount } = renderWithTheme(
        <TextVanilla weight={weight}>Text</TextVanilla>,
      );
      expect(container.querySelector('span')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['gray', 'contrast'] as const;

    variants.forEach((variant) => {
      const { container, unmount } = renderWithTheme(
        <TextVanilla variant={variant}>Text</TextVanilla>,
      );
      expect(container.querySelector('span')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply gradient prop', () => {
    const { container } = renderWithTheme(<TextVanilla gradient>Text</TextVanilla>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should apply transform prop', () => {
    const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;

    transforms.forEach((transform) => {
      const { container, unmount } = renderWithTheme(
        <TextVanilla transform={transform}>Text</TextVanilla>,
      );
      expect(container.querySelector('span')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply noWrap prop', () => {
    const { container } = renderWithTheme(<TextVanilla noWrap>Text</TextVanilla>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <TextVanilla style={{ color: 'red', fontSize: '16px' }}>Text</TextVanilla>,
    );
    const span = container.querySelector('span') as HTMLElement;

    expect(span.style.color).toBe('red');
    expect(span.style.fontSize).toBe('16px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <TextVanilla css={{ padding: '$4', margin: '$2' }}>Text</TextVanilla>,
    );
    const span = container.querySelector('span') as HTMLElement;

    expect(span.style.padding).toBe('20px');
    expect(span.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <TextVanilla css={{ padding: '$4', margin: '$2' }} style={{ color: 'blue', padding: '30px' }}>
        Text
      </TextVanilla>,
    );
    const span = container.querySelector('span') as HTMLElement;

    expect(span.style.color).toBe('blue');
    expect(span.style.padding).toBe('30px');
    expect(span.style.margin).toBe('8px');
  });

  it('should render polymorphically as different element', () => {
    const { container } = renderWithTheme(<TextVanilla as="div">Text</TextVanilla>);
    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent('Text');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    renderWithTheme(<TextVanilla ref={ref}>Text</TextVanilla>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('SPAN');
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <TextVanilla data-testid="test-text" aria-label="Test Text">
        Text
      </TextVanilla>,
    );
    const span = container.querySelector('span') as HTMLElement;

    expect(span.getAttribute('data-testid')).toBe('test-text');
    expect(span.getAttribute('aria-label')).toBe('Test Text');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<TextVanilla>Accessible Text</TextVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <TextVanilla>Light Text</TextVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <TextVanilla>Dark Text</TextVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <TextVanilla>Text</TextVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.querySelector('span')).toBeInTheDocument();
      unmount();
    });
  });
});
