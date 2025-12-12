import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { IconButtonVanilla } from './IconButton.vanilla';

describe('IconButtonVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  const TestIcon = () => <span data-testid="icon">Icon</span>;

  it('should render as button element by default', () => {
    const { getByRole, getByTestId } = renderWithTheme(
      <IconButtonVanilla>
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.nodeName).toBe('BUTTON');
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla className="custom-icon-button">
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.className).toContain('custom-icon-button');
  });

  it('should apply size prop', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const { getByRole, unmount } = renderWithTheme(
        <IconButtonVanilla size={size}>
          <TestIcon />
        </IconButtonVanilla>,
      );
      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['contrast', 'gray', 'soft'] as const;

    variants.forEach((variant) => {
      const { getByRole, unmount } = renderWithTheme(
        <IconButtonVanilla variant={variant}>
          <TestIcon />
        </IconButtonVanilla>,
      );
      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('should combine multiple variant props', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla size="large" variant="contrast">
        <TestIcon />
      </IconButtonVanilla>,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla style={{ backgroundColor: 'red', padding: '10px' }}>
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.style.backgroundColor).toBe('red');
    expect(button.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla css={{ padding: '$4', margin: '$2' }}>
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.style.padding).toBe('20px');
    expect(button.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.style.backgroundColor).toBe('blue');
    expect(button.style.padding).toBe('30px');
    expect(button.style.margin).toBe('8px');
  });

  it('should render polymorphically as different element', () => {
    const { container } = renderWithTheme(
      <IconButtonVanilla as="a" href="https://traefik.io">
        <TestIcon />
      </IconButtonVanilla>,
    );
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://traefik.io');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(
      <IconButtonVanilla ref={ref}>
        <TestIcon />
      </IconButtonVanilla>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('BUTTON');
  });

  it('should pass through HTML attributes', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla data-testid="test-icon-button" aria-label="Test Icon Button">
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    expect(button.getAttribute('data-testid')).toBe('test-icon-button');
    expect(button.getAttribute('aria-label')).toBe('Test Icon Button');
  });

  it('should handle disabled state', () => {
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla disabled>
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
  });

  it('should handle onClick event', () => {
    const handleClick = jest.fn();
    const { getByRole } = renderWithTheme(
      <IconButtonVanilla onClick={handleClick}>
        <TestIcon />
      </IconButtonVanilla>,
    );
    const button = getByRole('button');

    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations with aria-label', async () => {
    const { container } = renderWithTheme(
      <IconButtonVanilla aria-label="Icon Button">
        <TestIcon />
      </IconButtonVanilla>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { getByRole } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <IconButtonVanilla>
          <TestIcon />
        </IconButtonVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { getByRole } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <IconButtonVanilla>
          <TestIcon />
        </IconButtonVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { getByRole, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <IconButtonVanilla>
            <TestIcon />
          </IconButtonVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });
});
