import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';

import { BadgeVanilla, COLORS } from './Badge.vanilla';

describe('BadgeVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as span by default', () => {
    const { container } = renderWithTheme(<BadgeVanilla>Badge</BadgeVanilla>);
    const badge = container.firstChild;

    expect(badge?.nodeName).toBe('SPAN');
    expect(badge).toHaveTextContent('Badge');
  });

  it('should render as button when interactive', () => {
    const { container } = renderWithTheme(<BadgeVanilla interactive>Badge</BadgeVanilla>);
    const badge = container.firstChild;

    expect(badge?.nodeName).toBe('BUTTON');
  });

  it('should render with custom element via as prop', () => {
    const { container } = renderWithTheme(<BadgeVanilla as="section">Badge</BadgeVanilla>);
    const badge = container.firstChild;

    expect(badge?.nodeName).toBe('SECTION');
    expect(badge).toHaveTextContent('Badge');
  });

  it('should render as link with as prop and interactive', () => {
    const { getByRole } = renderWithTheme(
      <BadgeVanilla as="a" href="https://traefik.io" interactive>
        Link Badge
      </BadgeVanilla>,
    );

    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('link')).toHaveTextContent('Link Badge');
    expect(getByRole('link')).toHaveAttribute('href', 'https://traefik.io');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <BadgeVanilla className="custom-badge">Badge</BadgeVanilla>,
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge.className).toContain('custom-badge');
  });

  it('should apply variant prop', () => {
    const variants = ['neon', 'green', 'blue'] as const;

    variants.forEach((variant) => {
      const { container } = renderWithTheme(<BadgeVanilla variant={variant}>Badge</BadgeVanilla>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should apply size prop', () => {
    const sizes = ['small', 'large'] as const;

    sizes.forEach((size) => {
      const { container } = renderWithTheme(<BadgeVanilla size={size}>Badge</BadgeVanilla>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should render with all available colors', () => {
    COLORS.forEach((color) => {
      const { container } = renderWithTheme(
        <BadgeVanilla css={{ color: color }}>{color} Badge</BadgeVanilla>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should apply alphaBg prop', () => {
    const { container } = renderWithTheme(<BadgeVanilla alphaBg>Badge</BadgeVanilla>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply borderless prop', () => {
    const { container } = renderWithTheme(<BadgeVanilla borderless>Badge</BadgeVanilla>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should combine multiple variant props', () => {
    const { container } = renderWithTheme(
      <BadgeVanilla variant="neon" size="small" alphaBg borderless>
        Combined Badge
      </BadgeVanilla>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Combined Badge');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <BadgeVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Badge</BadgeVanilla>,
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge.style.backgroundColor).toBe('red');
    expect(badge.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <BadgeVanilla css={{ padding: '$4', margin: '$2' }}>Badge</BadgeVanilla>,
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge.style.padding).toBe('20px');
    expect(badge.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <BadgeVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Badge
      </BadgeVanilla>,
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge.style.backgroundColor).toBe('blue');
    expect(badge.style.padding).toBe('30px');
    expect(badge.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<BadgeVanilla ref={ref}>Badge</BadgeVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('should forward ref correctly for interactive badge', () => {
    const ref = { current: null };
    renderWithTheme(
      <BadgeVanilla ref={ref} interactive>
        Badge
      </BadgeVanilla>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <BadgeVanilla data-testid="test-badge" aria-label="Test Badge">
        Badge
      </BadgeVanilla>,
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge.getAttribute('data-testid')).toBe('test-badge');
    expect(badge.getAttribute('aria-label')).toBe('Test Badge');
  });

  it('should handle onClick for interactive badge', () => {
    const handleClick = jest.fn();
    const { container } = renderWithTheme(
      <BadgeVanilla interactive onClick={handleClick}>
        Clickable Badge
      </BadgeVanilla>,
    );
    const badge = container.firstChild as HTMLButtonElement;

    badge.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations for static badge', async () => {
    const { container } = renderWithTheme(<BadgeVanilla>Badge</BadgeVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations for interactive badge', async () => {
    const { container } = renderWithTheme(<BadgeVanilla interactive>Badge</BadgeVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <BadgeVanilla>Light Badge</BadgeVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <BadgeVanilla>Dark Badge</BadgeVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
