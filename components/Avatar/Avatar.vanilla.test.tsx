import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { AvatarVanilla } from './Avatar.vanilla';

describe('AvatarVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render correctly', () => {
    const { container } = renderWithTheme(<AvatarVanilla />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with image source', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla src="https://picsum.photos/100" alt="Test Avatar" />,
    );

    expect(container.firstChild).toBeInTheDocument();
    const img = container.querySelector('img');
    if (img) {
      expect(img).toHaveAttribute('src', 'https://picsum.photos/100');
      expect(img).toHaveAttribute('alt', 'Test Avatar');
    }
  });

  it('should render fallback when no image source', () => {
    const { container } = renderWithTheme(<AvatarVanilla fallback="AB" />);
    expect(container.firstChild).toHaveTextContent('AB');
  });

  it('should apply size variants', () => {
    const sizes = ['1', '2', '3', '4', '5', '6'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(<AvatarVanilla size={size} />);
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['gray', 'red', 'purple', 'blue', 'green', 'orange'] as const;

    variants.forEach((variant) => {
      const { container, unmount } = renderWithTheme(
        <AvatarVanilla variant={variant} fallback="M" />,
      );
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply shape prop', () => {
    const shapes = ['square', 'circle'] as const;

    shapes.forEach((shape) => {
      const { container, unmount } = renderWithTheme(<AvatarVanilla shape={shape} />);
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should combine multiple variant props', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla size="4" variant="blue" shape="square" fallback="AB" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render the avatar as the root element, without a wrapper', () => {
    const { container } = renderWithTheme(<AvatarVanilla fallback="AB" />);
    const avatarRoot = container.firstChild as HTMLElement;

    expect(avatarRoot.tagName).toBe('SPAN');
    expect(avatarRoot).toHaveTextContent('AB');
  });

  it('should render with custom className and keep the recipe classes', () => {
    const { container: plain } = renderWithTheme(<AvatarVanilla />);
    const recipeClass = (plain.firstChild as HTMLElement).className;

    const { container } = renderWithTheme(<AvatarVanilla className="custom-avatar" />);
    const avatarRoot = container.firstChild as HTMLElement;

    expect(recipeClass).not.toBe('');
    expect(avatarRoot.className).toBe(`${recipeClass} custom-avatar`);
  });

  it('should apply css and style to the avatar, style winning on conflicts', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla
        css={{ padding: '$4', margin: '$2', alignSelf: 'center' }}
        style={{ border: '1px solid blue', padding: '30px' }}
      />,
    );
    const avatarRoot = container.firstChild as HTMLElement;

    expect(avatarRoot.style.margin).toBe('8px');
    expect(avatarRoot.style.alignSelf).toBe('center');
    expect(avatarRoot.style.border).toBe('1px solid blue');
    expect(avatarRoot.style.padding).toBe('30px');
  });

  it('should honour width and height passed through css', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla css={{ width: '50px', height: '50px' }} />,
    );
    const avatarRoot = container.firstChild as HTMLElement;

    expect(avatarRoot.style.width).toBe('50px');
    expect(avatarRoot.style.height).toBe('50px');
  });

  it('should forward ref to the avatar root', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = renderWithTheme(<AvatarVanilla ref={ref} />);

    expect(ref.current).toBe(container.firstChild);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla data-testid="test-avatar" aria-label="Test Avatar" />,
    );
    const avatarRoot = container.firstChild as HTMLElement;

    expect(avatarRoot.getAttribute('data-testid')).toBe('test-avatar');
    expect(avatarRoot.getAttribute('aria-label')).toBe('Test Avatar');
  });

  it('should have no accessibility violations with image', async () => {
    const { container } = renderWithTheme(
      <AvatarVanilla src="https://picsum.photos/100" alt="Test Avatar" />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with fallback', async () => {
    const { container } = renderWithTheme(<AvatarVanilla fallback="AB" />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <AvatarVanilla fallback="L" variant="blue" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <AvatarVanilla fallback="D" variant="green" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const primaryColors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    primaryColors.forEach((color) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <AvatarVanilla fallback="P" />
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply default variants when none specified', () => {
    const { container } = renderWithTheme(<AvatarVanilla />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle React node as fallback', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla fallback={<span data-testid="custom-fallback">Custom</span>} />,
    );
    const fallback = container.querySelector('[data-testid="custom-fallback"]');

    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveTextContent('Custom');
  });

  it('should treat a numeric size like its string key', () => {
    const { container: numeric } = renderWithTheme(<AvatarVanilla size={2} fallback="AB" />);
    const { container: string } = renderWithTheme(<AvatarVanilla size="2" fallback="AB" />);

    expect(numeric.innerHTML).toContain('size-string-2');
    expect(numeric.innerHTML).toBe(string.innerHTML);
  });
});
