import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { CardVanilla } from './Card.vanilla';

describe('CardVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as div by default', () => {
    const { container } = renderWithTheme(<CardVanilla>Card</CardVanilla>);
    const card = container.firstChild;

    expect(card?.nodeName).toBe('DIV');
    expect(card).toHaveTextContent('Card');
  });

  it('should render as button when interactive', () => {
    const { container } = renderWithTheme(<CardVanilla interactive>Card</CardVanilla>);
    const card = container.firstChild;

    expect(card?.nodeName).toBe('BUTTON');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(<CardVanilla className="custom-card">Card</CardVanilla>);
    const card = container.firstChild as HTMLElement;

    expect(card.className).toContain('custom-card');
  });

  it('should apply elevation prop', () => {
    const elevations = [0, 1, 2, 3, 4, 5] as const;

    elevations.forEach((elevation) => {
      const { container } = renderWithTheme(<CardVanilla elevation={elevation}>Card</CardVanilla>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['inner', 'ghost'] as const;

    variants.forEach((variant) => {
      const { container } = renderWithTheme(<CardVanilla variant={variant}>Card</CardVanilla>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should apply active prop', () => {
    const { container } = renderWithTheme(<CardVanilla active>Card</CardVanilla>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should combine multiple variant props', () => {
    const { container } = renderWithTheme(
      <CardVanilla elevation={2 as const} variant="ghost" active>
        Combined Card
      </CardVanilla>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Combined Card');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <CardVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Card</CardVanilla>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.style.backgroundColor).toBe('red');
    expect(card.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <CardVanilla css={{ padding: '$4', margin: '$2' }}>Card</CardVanilla>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.style.padding).toBe('20px');
    expect(card.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <CardVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Card
      </CardVanilla>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.style.backgroundColor).toBe('blue');
    expect(card.style.padding).toBe('30px');
    expect(card.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<CardVanilla ref={ref}>Card</CardVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should forward ref correctly for interactive card', () => {
    const ref = { current: null };
    renderWithTheme(
      <CardVanilla ref={ref} interactive>
        Card
      </CardVanilla>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <CardVanilla data-testid="test-card" aria-label="Test Card">
        Card
      </CardVanilla>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.getAttribute('data-testid')).toBe('test-card');
    expect(card.getAttribute('aria-label')).toBe('Test Card');
  });

  it('should handle onClick for interactive card', () => {
    const handleClick = jest.fn();
    const { container } = renderWithTheme(
      <CardVanilla interactive onClick={handleClick}>
        Clickable Card
      </CardVanilla>,
    );
    const card = container.firstChild as HTMLButtonElement;

    card.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have tabIndex 0 for interactive card', () => {
    const { container } = renderWithTheme(<CardVanilla interactive>Card</CardVanilla>);
    const card = container.firstChild as HTMLElement;

    expect(card.getAttribute('tabindex')).toBe('0');
  });

  it('should have no accessibility violations for static card', async () => {
    const { container } = renderWithTheme(<CardVanilla>Card</CardVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations for interactive card', async () => {
    const { container } = renderWithTheme(<CardVanilla interactive>Card</CardVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <CardVanilla>Light Card</CardVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <CardVanilla>Dark Card</CardVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
