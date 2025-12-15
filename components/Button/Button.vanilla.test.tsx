import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ButtonVanilla } from './Button.vanilla';

describe('ButtonVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as button element by default', () => {
    const { getByRole } = renderWithTheme(<ButtonVanilla>Click me</ButtonVanilla>);
    const button = getByRole('button');

    expect(button.nodeName).toBe('BUTTON');
    expect(button).toHaveTextContent('Click me');
  });

  it('should render with custom className', () => {
    const { getByRole } = renderWithTheme(
      <ButtonVanilla className="custom-button">Button</ButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.className).toContain('custom-button');
  });

  it('should apply size prop', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const { getByRole, unmount } = renderWithTheme(
        <ButtonVanilla size={size}>Button</ButtonVanilla>,
      );
      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['primary', 'secondary'] as const;

    variants.forEach((variant) => {
      const { getByRole, unmount } = renderWithTheme(
        <ButtonVanilla variant={variant}>Button</ButtonVanilla>,
      );
      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply state prop', () => {
    const states = ['waiting', 'success', 'error'] as const;

    states.forEach((state) => {
      const { getByRole, unmount } = renderWithTheme(
        <ButtonVanilla state={state}>Button</ButtonVanilla>,
      );
      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply ghost prop', () => {
    const { getByRole } = renderWithTheme(<ButtonVanilla ghost>Button</ButtonVanilla>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should apply rounded prop', () => {
    const { getByRole } = renderWithTheme(<ButtonVanilla rounded>Button</ButtonVanilla>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should combine multiple variant props', () => {
    const { getByRole } = renderWithTheme(
      <ButtonVanilla size="large" variant="primary" state="success" ghost rounded>
        Button
      </ButtonVanilla>,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { getByRole } = renderWithTheme(
      <ButtonVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Button</ButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.style.backgroundColor).toBe('red');
    expect(button.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { getByRole } = renderWithTheme(
      <ButtonVanilla css={{ padding: '$4', margin: '$2' }}>Button</ButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.style.padding).toBe('20px');
    expect(button.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { getByRole } = renderWithTheme(
      <ButtonVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Button
      </ButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.style.backgroundColor).toBe('blue');
    expect(button.style.padding).toBe('30px');
    expect(button.style.margin).toBe('8px');
  });

  it('should render polymorphically as different element', () => {
    const { container } = renderWithTheme(
      <ButtonVanilla as="a" href="https://traefik.io">
        Link Button
      </ButtonVanilla>,
    );
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://traefik.io');
    expect(link).toHaveTextContent('Link Button');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(<ButtonVanilla ref={ref}>Button</ButtonVanilla>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('BUTTON');
  });

  it('should pass through HTML attributes', () => {
    const { getByRole } = renderWithTheme(
      <ButtonVanilla data-testid="test-button" aria-label="Test Button">
        Button
      </ButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.getAttribute('data-testid')).toBe('test-button');
    expect(button.getAttribute('aria-label')).toBe('Test Button');
  });

  it('should handle disabled state', () => {
    const { getByRole } = renderWithTheme(<ButtonVanilla disabled>Button</ButtonVanilla>);
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
  });

  it('should handle onClick event', () => {
    const handleClick = jest.fn();
    const { getByRole } = renderWithTheme(
      <ButtonVanilla onClick={handleClick}>Button</ButtonVanilla>,
    );
    const button = getByRole('button');

    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<ButtonVanilla>Accessible Button</ButtonVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { getByRole } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <ButtonVanilla>Light Button</ButtonVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { getByRole } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <ButtonVanilla>Dark Button</ButtonVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { getByRole, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <ButtonVanilla>Button</ButtonVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });
});
