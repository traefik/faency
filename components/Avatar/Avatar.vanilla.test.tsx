import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
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
    const wrapper = container.firstChild;

    expect(wrapper).toHaveTextContent('AB');
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

  it('should render with custom className', () => {
    const { container } = renderWithTheme(<AvatarVanilla className="custom-avatar" />);
    const wrapper = container.firstChild;
    const avatarRoot = wrapper?.firstChild as HTMLElement;

    expect(avatarRoot.className).toContain('custom-avatar');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(<AvatarVanilla style={{ border: '2px solid red' }} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.border).toBe('2px solid red');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(<AvatarVanilla css={{ padding: '$4', margin: '$2' }} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.padding).toBe('20px');
    expect(wrapper.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ border: '1px solid blue', padding: '30px' }}
      />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.border).toBe('1px solid blue');
    expect(wrapper.style.padding).toBe('30px');
    expect(wrapper.style.margin).toBe('8px');
  });

  it('should apply wrapper styles including custom css', () => {
    const { container } = renderWithTheme(<AvatarVanilla css={{ padding: '$4' }} />);
    const wrapper = container.firstChild as HTMLElement;
    const avatarRoot = wrapper.firstChild as HTMLElement;

    expect(wrapper).toBeInTheDocument();
    expect(avatarRoot).toBeInTheDocument();

    // Custom padding from css prop should be applied to wrapper
    expect(wrapper.style.padding).toBe('20px');
    const styleAttr = wrapper.getAttribute('style');
    expect(styleAttr).toContain('position');
    expect(styleAttr).toContain('padding: 20px');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    renderWithTheme(<AvatarVanilla ref={ref} />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <AvatarVanilla data-testid="test-avatar" aria-label="Test Avatar" />,
    );
    const wrapper = container.firstChild;
    const avatarRoot = wrapper?.firstChild as HTMLElement;

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
});
