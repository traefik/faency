import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { NavigationLinkVanilla } from '@/components/Navigation/Navigation.vanilla';

import {
  NavigationMenuContentVanilla,
  NavigationMenuContentVanillaProps,
  NavigationMenuItemVanilla,
  NavigationMenuLinkVanilla,
  NavigationMenuListVanilla,
  NavigationMenuTriggerVanilla,
  NavigationMenuVanilla,
  NavigationMenuViewportVanilla,
} from './NavigationMenu.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const TestMenu = ({
  defaultValue,
  contentRef,
  ...contentProps
}: Partial<NavigationMenuContentVanillaProps> & {
  defaultValue?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}) => (
  <NavigationMenuVanilla defaultValue={defaultValue} aria-label="Main">
    <NavigationMenuListVanilla>
      <NavigationMenuItemVanilla value="docs">
        <NavigationMenuTriggerVanilla>Docs</NavigationMenuTriggerVanilla>
        <NavigationMenuContentVanilla ref={contentRef} data-testid="content" {...contentProps}>
          <NavigationMenuLinkVanilla href="/guides">Guides</NavigationMenuLinkVanilla>
        </NavigationMenuContentVanilla>
      </NavigationMenuItemVanilla>
    </NavigationMenuListVanilla>
  </NavigationMenuVanilla>
);

describe('NavigationMenuVanilla', () => {
  it('should render a navigation landmark with a closed trigger', () => {
    renderWithTheme(<TestMenu />);

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Docs' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should open and close the content on trigger click', () => {
    renderWithTheme(<TestMenu />);
    const trigger = screen.getByRole('button', { name: 'Docs' });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should apply the elevation prop', () => {
    const elevations = [0, 1, 2, 3, 4, 5] as const;

    elevations.forEach((elevation) => {
      const { unmount } = renderWithTheme(<TestMenu defaultValue="docs" elevation={elevation} />);
      expect(screen.getByTestId('content')).toBeInTheDocument();
      unmount();
    });
  });

  it('should mark an active link and call onSelect', () => {
    const onSelect = jest.fn();
    renderWithTheme(
      <NavigationMenuVanilla>
        <NavigationMenuListVanilla>
          <NavigationMenuItemVanilla>
            <NavigationMenuLinkVanilla href="/home" active onSelect={onSelect}>
              Home
            </NavigationMenuLinkVanilla>
          </NavigationMenuItemVanilla>
        </NavigationMenuListVanilla>
      </NavigationMenuVanilla>,
    );
    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-active', '');

    fireEvent.click(link);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should render parts as other elements and components with the as prop', () => {
    const triggerRef = createRef<HTMLAnchorElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    renderWithTheme(
      <NavigationMenuVanilla defaultValue="docs">
        <NavigationMenuListVanilla as="ol" data-testid="list">
          <NavigationMenuItemVanilla value="docs" as="li" data-testid="item">
            <NavigationMenuTriggerVanilla as="span" ref={triggerRef} className="custom-trigger">
              Docs
            </NavigationMenuTriggerVanilla>
            <NavigationMenuContentVanilla>
              <NavigationMenuLinkVanilla
                as={NavigationLinkVanilla}
                href="/guides"
                active
                ref={linkRef}
              >
                Guides
              </NavigationMenuLinkVanilla>
            </NavigationMenuContentVanilla>
          </NavigationMenuItemVanilla>
        </NavigationMenuListVanilla>
      </NavigationMenuVanilla>,
    );

    expect(screen.getByTestId('list').tagName).toBe('OL');
    const trigger = screen.getByText('Docs');
    expect(trigger.tagName).toBe('SPAN');
    expect(triggerRef.current).toBe(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.className).toContain('custom-trigger');

    const link = screen.getByRole('link', { name: 'Guides' });
    expect(linkRef.current).toBe(link);
    expect(link).toHaveAttribute('href', '/guides');
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-active', '');
    expect(link.querySelector('a')).not.toBeInTheDocument();
  });

  it('should render the content inside the viewport', () => {
    renderWithTheme(
      <NavigationMenuVanilla defaultValue="docs">
        <NavigationMenuListVanilla>
          <NavigationMenuItemVanilla value="docs">
            <NavigationMenuTriggerVanilla>Docs</NavigationMenuTriggerVanilla>
            <NavigationMenuContentVanilla>Guides</NavigationMenuContentVanilla>
          </NavigationMenuItemVanilla>
        </NavigationMenuListVanilla>
        <NavigationMenuViewportVanilla data-testid="viewport" css={{ margin: '$2' }} />
      </NavigationMenuVanilla>,
    );

    expect(screen.getByTestId('viewport').style.margin).toBe('8px');
    expect(screen.getByTestId('viewport')).toHaveTextContent('Guides');
  });

  it('should render with custom className', () => {
    renderWithTheme(<TestMenu defaultValue="docs" className="custom-content" />);

    expect(screen.getByTestId('content').className).toContain('custom-content');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(
      <TestMenu defaultValue="docs" style={{ backgroundColor: 'red', padding: '10px' }} />,
    );
    const content = screen.getByTestId('content');

    expect(content.style.backgroundColor).toBe('red');
    expect(content.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(<TestMenu defaultValue="docs" css={{ padding: '$4', margin: '$2' }} />);
    const content = screen.getByTestId('content');

    expect(content.style.padding).toBe('20px');
    expect(content.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <TestMenu
        defaultValue="docs"
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const content = screen.getByTestId('content');

    expect(content.style.padding).toBe('30px');
    expect(content.style.margin).toBe('8px');
    expect(content.style.backgroundColor).toBe('blue');
  });

  it('should apply css to the root', () => {
    renderWithTheme(
      <NavigationMenuVanilla css={{ padding: '$2' }} style={{ margin: '4px' }}>
        <NavigationMenuListVanilla />
      </NavigationMenuVanilla>,
    );
    const root = screen.getByRole('navigation');

    expect(root.style.padding).toBe('8px');
    expect(root.style.margin).toBe('4px');
  });

  it('should forward refs', () => {
    const rootRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const contentRef = createRef<HTMLDivElement>();
    renderWithTheme(
      <NavigationMenuVanilla ref={rootRef} defaultValue="docs">
        <NavigationMenuListVanilla ref={listRef}>
          <NavigationMenuItemVanilla ref={itemRef} value="docs">
            <NavigationMenuTriggerVanilla>Docs</NavigationMenuTriggerVanilla>
            <NavigationMenuContentVanilla ref={contentRef}>Guides</NavigationMenuContentVanilla>
          </NavigationMenuItemVanilla>
        </NavigationMenuListVanilla>
      </NavigationMenuVanilla>,
    );

    expect(rootRef.current).toBe(screen.getByRole('navigation'));
    expect(listRef.current).toBe(screen.getByRole('list'));
    expect(itemRef.current).toBe(screen.getByRole('listitem'));
    expect(contentRef.current).toHaveTextContent('Guides');
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(<TestMenu defaultValue="docs" id="docs-menu" />);

    expect(screen.getByTestId('content')).toHaveAttribute('id', 'docs-menu');
  });

  it('should render in light and dark themes with a primary color', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = renderWithTheme(<TestMenu defaultValue="docs" />, {
        forcedTheme: theme,
        primaryColor: 'neon',
      });
      expect(screen.getByTestId('content')).toBeInTheDocument();
      unmount();
    });
  });

  it('should not have accessibility violations, closed and open', async () => {
    const { container, unmount } = renderWithTheme(<TestMenu />);
    expect(await axe(container)).toHaveNoViolations();
    unmount();

    const open = renderWithTheme(<TestMenu defaultValue="docs" />);
    expect(await axe(open.container)).toHaveNoViolations();
  });
});
