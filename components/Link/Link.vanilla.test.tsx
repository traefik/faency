import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { LinkVanilla } from './Link.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  { to: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>
>(({ to, ...props }, ref) => <a ref={ref} href={to} data-router-link="" {...props} />);
RouterLink.displayName = 'RouterLink';

describe('LinkVanilla', () => {
  it('should render an anchor by default', () => {
    renderWithTheme(<LinkVanilla href="https://traefik.io">Traefik</LinkVanilla>);
    const link = screen.getByRole('link', { name: 'Traefik' });

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://traefik.io');
  });

  it('should apply every variant', () => {
    (['blue', 'primary', 'subtle', 'contrast'] as const).forEach((variant) => {
      const { unmount } = renderWithTheme(
        <LinkVanilla href="#" variant={variant}>
          {variant}
        </LinkVanilla>,
      );
      expect(screen.getByRole('link', { name: variant })).toBeInTheDocument();
      unmount();
    });
  });

  it('should render a router link with the as prop', () => {
    const ref = createRef<HTMLAnchorElement>();
    renderWithTheme(
      <LinkVanilla as={RouterLink} to="/docs" ref={ref} variant="primary">
        Docs
      </LinkVanilla>,
    );
    const link = screen.getByRole('link', { name: 'Docs' });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveAttribute('data-router-link');
    expect(ref.current).toBe(link);
  });

  it('should render as another element with the as prop', () => {
    renderWithTheme(
      <LinkVanilla as="button" type="button">
        Action
      </LinkVanilla>,
    );

    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    renderWithTheme(
      <LinkVanilla href="#" className="custom">
        Link
      </LinkVanilla>,
    );

    expect(screen.getByRole('link').className).toContain('custom');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(
      <LinkVanilla href="#" style={{ color: 'red', padding: '10px' }}>
        Link
      </LinkVanilla>,
    );
    const link = screen.getByRole('link');

    expect(link.style.color).toBe('red');
    expect(link.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(
      <LinkVanilla href="#" css={{ padding: '$4', margin: '$2' }}>
        Link
      </LinkVanilla>,
    );
    const link = screen.getByRole('link');

    expect(link.style.padding).toBe('20px');
    expect(link.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <LinkVanilla
        href="#"
        css={{ padding: '$4', margin: '$2' }}
        style={{ color: 'blue', padding: '30px' }}
      >
        Link
      </LinkVanilla>,
    );
    const link = screen.getByRole('link');

    expect(link.style.padding).toBe('30px');
    expect(link.style.margin).toBe('8px');
    expect(link.style.color).toBe('blue');
  });

  it('should forward refs', () => {
    const ref = createRef<HTMLAnchorElement>();
    renderWithTheme(
      <LinkVanilla href="#" ref={ref}>
        Link
      </LinkVanilla>,
    );

    expect(ref.current).toBe(screen.getByRole('link'));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(
      <LinkVanilla href="#" target="_blank" rel="noreferrer" data-testid="link">
        Link
      </LinkVanilla>,
    );
    const link = screen.getByTestId('link');

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('should render in light and dark themes with primary colors', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      (['blue', 'neon', 'orange'] as const).forEach((primaryColor) => {
        const { unmount } = renderWithTheme(
          <LinkVanilla href="#" variant="primary">
            Link
          </LinkVanilla>,
          { forcedTheme: theme, primaryColor },
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
        unmount();
      });
    });
  });

  it('should not have accessibility violations', async () => {
    const { container } = renderWithTheme(
      <LinkVanilla href="https://traefik.io">Traefik</LinkVanilla>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
