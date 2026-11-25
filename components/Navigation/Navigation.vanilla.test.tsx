import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import {
  NavigationContainerVanilla,
  NavigationDrawerVanilla,
  NavigationItemVanilla,
  NavigationLinkVanilla,
} from './Navigation.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  { to: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>
>(({ to, ...props }, ref) => <a ref={ref} href={to} data-router-link="" {...props} />);
RouterLink.displayName = 'RouterLink';

describe('NavigationContainerVanilla', () => {
  it('should render a div by default', () => {
    const { container } = renderWithTheme(
      <NavigationContainerVanilla>Content</NavigationContainerVanilla>,
    );

    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render the as element', () => {
    const { container } = renderWithTheme(
      <NavigationContainerVanilla as="section">Content</NavigationContainerVanilla>,
    );

    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('should merge className, css and style', () => {
    const { container } = renderWithTheme(
      <NavigationContainerVanilla
        className="custom"
        css={{ p: '$4', m: '$2' }}
        style={{ padding: '30px' }}
      >
        Content
      </NavigationContainerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass('custom');
    expect(element.style.padding).toBe('30px');
    expect(element.style.margin).toBe('8px');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<NavigationContainerVanilla ref={ref}>Content</NavigationContainerVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('NavigationDrawerVanilla', () => {
  it('should render a nav landmark by default', () => {
    renderWithTheme(<NavigationDrawerVanilla aria-label="Main">Content</NavigationDrawerVanilla>);

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  it('should render the as element', () => {
    const { container } = renderWithTheme(
      <NavigationDrawerVanilla as="aside">Content</NavigationDrawerVanilla>,
    );

    expect(container.firstChild?.nodeName).toBe('ASIDE');
  });

  it('should apply a different class per elevation', () => {
    const classNames = ([0, 1, 2, 3, 4, 5] as const).map((elevation) => {
      const { container, unmount } = renderWithTheme(
        <NavigationDrawerVanilla elevation={elevation}>Content</NavigationDrawerVanilla>,
      );
      const className = (container.firstChild as HTMLElement).className;
      unmount();
      return className;
    });

    expect(new Set(classNames).size).toBe(6);
  });

  it('should add a class for fullWidth', () => {
    const { container, rerender } = renderWithTheme(
      <NavigationDrawerVanilla>Content</NavigationDrawerVanilla>,
    );
    const defaultClassName = (container.firstChild as HTMLElement).className;

    rerender(
      <VanillaExtractThemeProvider>
        <NavigationDrawerVanilla fullWidth>Content</NavigationDrawerVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect((container.firstChild as HTMLElement).className).not.toBe(defaultClassName);
  });

  it('should merge className, css and style', () => {
    const { container } = renderWithTheme(
      <NavigationDrawerVanilla className="custom" css={{ height: '200px' }} style={{ width: 100 }}>
        Content
      </NavigationDrawerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass('custom');
    expect(element.style.height).toBe('200px');
    expect(element.style.width).toBe('100px');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLElement>();
    renderWithTheme(<NavigationDrawerVanilla ref={ref}>Content</NavigationDrawerVanilla>);

    expect(ref.current?.nodeName).toBe('NAV');
  });
});

describe('NavigationItemVanilla', () => {
  it('should render a button of type button by default', () => {
    renderWithTheme(<NavigationItemVanilla>Menu</NavigationItemVanilla>);

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('type', 'button');
  });

  it('should keep the type of the caller', () => {
    renderWithTheme(<NavigationItemVanilla type="submit">Send</NavigationItemVanilla>);

    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit');
  });

  it('should render a link without a type', () => {
    renderWithTheme(
      <NavigationItemVanilla as="a" href="/home">
        Home
      </NavigationItemVanilla>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('type');
  });

  it('should render a custom component through as', () => {
    renderWithTheme(
      <NavigationItemVanilla as={RouterLink} to="/settings" active>
        Settings
      </NavigationItemVanilla>,
    );
    const link = screen.getByRole('link', { name: 'Settings' });

    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveAttribute('data-router-link');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('should mark an active link as the current page', () => {
    renderWithTheme(
      <>
        <NavigationItemVanilla as="a" href="/home" active>
          Home
        </NavigationItemVanilla>
        <NavigationItemVanilla as="a" href="/about">
          About
        </NavigationItemVanilla>
      </>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('should not set aria-current on a button', () => {
    renderWithTheme(<NavigationItemVanilla active>Menu</NavigationItemVanilla>);

    expect(screen.getByRole('button', { name: 'Menu' })).not.toHaveAttribute('aria-current');
  });

  it('should expose the active state as a data attribute and class', () => {
    renderWithTheme(
      <>
        <NavigationItemVanilla active>Active</NavigationItemVanilla>
        <NavigationItemVanilla>Inactive</NavigationItemVanilla>
      </>,
    );
    const active = screen.getByRole('button', { name: 'Active' });
    const inactive = screen.getByRole('button', { name: 'Inactive' });

    expect(active).toHaveAttribute('data-active', '');
    expect(inactive).not.toHaveAttribute('data-active');
    expect(active.className).not.toBe(inactive.className);
    expect(active).not.toHaveAttribute('active');
  });

  it('should render the adornments around the label', () => {
    renderWithTheme(
      <NavigationItemVanilla
        startAdornment={<svg data-testid="start" />}
        endAdornment={<span data-testid="end">99+</span>}
      >
        Settings
      </NavigationItemVanilla>,
    );
    const button = screen.getByRole('button');
    const slots = Array.from(button.children);

    expect(slots).toHaveLength(3);
    expect(slots[0]).toContainElement(screen.getByTestId('start'));
    expect(slots[1]).toHaveTextContent('Settings');
    expect(slots[2]).toContainElement(screen.getByTestId('end'));
    expect(button).not.toHaveAttribute('startAdornment');
  });

  it('should only render the label slot without adornments', () => {
    renderWithTheme(<NavigationItemVanilla>Settings</NavigationItemVanilla>);

    expect(screen.getByRole('button').children).toHaveLength(1);
  });

  it('should call onClick', async () => {
    const onClick = jest.fn();
    renderWithTheme(<NavigationItemVanilla onClick={onClick}>Menu</NavigationItemVanilla>);

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should merge className, css and style', () => {
    renderWithTheme(
      <NavigationItemVanilla
        className="custom"
        css={{ p: '$4', m: '$2' }}
        style={{ padding: '30px' }}
      >
        Menu
      </NavigationItemVanilla>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom');
    expect(button.style.padding).toBe('30px');
    expect(button.style.margin).toBe('8px');
  });

  it('should pass HTML attributes through', () => {
    renderWithTheme(
      <NavigationItemVanilla data-testid="item" aria-label="Open menu" disabled>
        Menu
      </NavigationItemVanilla>,
    );
    const button = screen.getByTestId('item');

    expect(button).toHaveAttribute('aria-label', 'Open menu');
    expect(button).toBeDisabled();
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(<NavigationItemVanilla ref={ref}>Menu</NavigationItemVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe('NavigationLinkVanilla', () => {
  it('should render a link and mark the active one as the current page', () => {
    renderWithTheme(
      <>
        <NavigationLinkVanilla href="/home" active>
          Home
        </NavigationLinkVanilla>
        <NavigationLinkVanilla href="/about">About</NavigationLinkVanilla>
      </>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('should keep the aria-current of the caller', () => {
    renderWithTheme(
      <NavigationLinkVanilla href="/step" active aria-current="step">
        Step
      </NavigationLinkVanilla>,
    );

    expect(screen.getByRole('link', { name: 'Step' })).toHaveAttribute('aria-current', 'step');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    renderWithTheme(
      <NavigationLinkVanilla ref={ref} href="/home">
        Home
      </NavigationLinkVanilla>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});

describe('Navigation vanilla accessibility and themes', () => {
  const renderSample = () => (
    <NavigationDrawerVanilla aria-label="Main">
      <NavigationContainerVanilla>
        <NavigationLinkVanilla href="/" active startAdornment={<svg aria-hidden />}>
          Dashboard
        </NavigationLinkVanilla>
        <NavigationItemVanilla endAdornment={<span>3</span>}>Settings</NavigationItemVanilla>
      </NavigationContainerVanilla>
    </NavigationDrawerVanilla>
  );

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(renderSample());

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render with light and dark themes and other primary colors', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      (['blue', 'neon', 'orange'] as const).forEach((primaryColor) => {
        const { unmount } = render(
          <VanillaExtractThemeProvider forcedTheme={theme} primaryColor={primaryColor}>
            {renderSample()}
          </VanillaExtractThemeProvider>,
        );

        expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
        unmount();
      });
    });
  });
});
