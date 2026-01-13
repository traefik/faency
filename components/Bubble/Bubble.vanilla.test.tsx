import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { BubbleVanilla } from './Bubble.vanilla';

describe('BubbleVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render correctly', () => {
    const { container } = renderWithTheme(<BubbleVanilla />);
    const bubble = container.firstChild;

    expect(bubble?.nodeName).toBe('DIV');
    expect(bubble).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(<BubbleVanilla className="custom-bubble" />);
    const bubble = container.firstChild as HTMLElement;

    expect(bubble.className).toContain('custom-bubble');
  });

  it('should apply variant prop', () => {
    const variants = ['red', 'green', 'orange', 'blue', 'yellow', 'purple', 'gray'] as const;

    variants.forEach((variant) => {
      const { container, unmount } = renderWithTheme(<BubbleVanilla variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply size prop', () => {
    const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(<BubbleVanilla size={size} />);
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply noAnimation prop', () => {
    const { container } = renderWithTheme(<BubbleVanilla noAnimation />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should combine multiple variant props', () => {
    const { container } = renderWithTheme(
      <BubbleVanilla variant="green" size="large" noAnimation />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <BubbleVanilla style={{ backgroundColor: 'red', padding: '10px' }} />,
    );
    const bubble = container.firstChild as HTMLElement;

    expect(bubble.style.backgroundColor).toBe('red');
    expect(bubble.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(<BubbleVanilla css={{ padding: '$4', margin: '$2' }} />);
    const bubble = container.firstChild as HTMLElement;

    expect(bubble.style.padding).toBe('20px');
    expect(bubble.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <BubbleVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const bubble = container.firstChild as HTMLElement;

    expect(bubble.style.backgroundColor).toBe('blue');
    expect(bubble.style.padding).toBe('30px');
    expect(bubble.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<BubbleVanilla ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <BubbleVanilla data-testid="test-bubble" aria-label="Test Bubble" />,
    );
    const bubble = container.firstChild as HTMLElement;

    expect(bubble.getAttribute('data-testid')).toBe('test-bubble');
    expect(bubble.getAttribute('aria-label')).toBe('Test Bubble');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<BubbleVanilla />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <BubbleVanilla />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <BubbleVanilla />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const primaryColors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    primaryColors.forEach((primaryColor) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={primaryColor}>
          <BubbleVanilla />
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should render with all variant combinations in light theme', () => {
    const variants = ['red', 'green', 'orange', 'blue', 'yellow', 'purple', 'gray'] as const;
    const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        const { container, unmount } = render(
          <VanillaExtractThemeProvider defaultTheme="light">
            <BubbleVanilla variant={variant} size={size} />
          </VanillaExtractThemeProvider>,
        );

        expect(container.firstChild).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('should render with all variant combinations in dark theme', () => {
    const variants = ['red', 'green', 'orange', 'blue', 'yellow', 'purple', 'gray'] as const;
    const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        const { container, unmount } = render(
          <VanillaExtractThemeProvider defaultTheme="dark">
            <BubbleVanilla variant={variant} size={size} />
          </VanillaExtractThemeProvider>,
        );

        expect(container.firstChild).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('should render with animation disabled', () => {
    const { container } = renderWithTheme(<BubbleVanilla noAnimation />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle all size variants with noAnimation', () => {
    const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(<BubbleVanilla size={size} noAnimation />);
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });
});
