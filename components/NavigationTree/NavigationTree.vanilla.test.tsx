import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

jest.mock('./NavigationTree.vanilla.css', () => ({
  navigationTreeNested: 'navigationTreeNested',
  navigationTreeItemExpandable: 'navigationTreeItemExpandable',
  navigationTreeItemFullWidth: 'navigationTreeItemFullWidth',
  navigationTreeLabel: 'navigationTreeLabel',
  navigationTreeLabelIndented: 'navigationTreeLabelIndented',
  navigationTreeDepth: 'var(--tree-depth)',
  navigationTreeFullWidthIndent: 'calc(16px + var(--tree-depth) * 20px)',
}));

import {
  NavigationTreeContainerVanilla,
  NavigationTreeDrawerVanilla,
  NavigationTreeItemVanilla,
} from './NavigationTree.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  { to: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>
>(({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />);
RouterLink.displayName = 'RouterLink';

describe('NavigationTreeVanilla', () => {
  it('renders items with their labels and subtitles', () => {
    renderWithTheme(
      <NavigationTreeContainerVanilla>
        <NavigationTreeItemVanilla label="One" subtitle="/one" />
        <NavigationTreeItemVanilla label="Two" />
      </NavigationTreeContainerVanilla>,
    );

    expect(screen.getByRole('button', { name: /One/ })).toHaveTextContent('/one');
    expect(screen.getByRole('button', { name: /Two/ })).toBeInTheDocument();
  });

  it('renders a non-string label as is', () => {
    renderWithTheme(<NavigationTreeItemVanilla label={<strong>Bold</strong>} />);

    expect(screen.getByText('Bold').nodeName).toBe('STRONG');
  });

  it('toggles nested children and aria-expanded when an expandable item is clicked', () => {
    renderWithTheme(
      <NavigationTreeContainerVanilla>
        <NavigationTreeItemVanilla label="Parent">
          <NavigationTreeItemVanilla label="Child" />
        </NavigationTreeItemVanilla>
      </NavigationTreeContainerVanilla>,
    );
    const parent = screen.getByRole('button', { name: /Parent/ });

    expect(parent).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: /Child/ })).not.toBeInTheDocument();

    fireEvent.click(parent);
    expect(parent).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /Child/ })).toBeInTheDocument();

    fireEvent.click(parent);
    expect(screen.queryByRole('button', { name: /Child/ })).not.toBeInTheDocument();
  });

  it('does not set aria-expanded on a leaf item', () => {
    renderWithTheme(<NavigationTreeItemVanilla label="Leaf" />);

    expect(screen.getByRole('button', { name: /Leaf/ })).not.toHaveAttribute('aria-expanded');
  });

  it('starts expanded with defaultExpanded', () => {
    renderWithTheme(
      <NavigationTreeItemVanilla label="Parent" defaultExpanded>
        <NavigationTreeItemVanilla label="Child" />
      </NavigationTreeItemVanilla>,
    );

    expect(screen.getByRole('button', { name: /Child/ })).toBeInTheDocument();
  });

  it('calls onClick for a leaf item but toggles (does not call onClick) for an expandable item', () => {
    const onLeafClick = jest.fn();
    const onParentClick = jest.fn();

    renderWithTheme(
      <NavigationTreeContainerVanilla>
        <NavigationTreeItemVanilla label="Leaf" onClick={onLeafClick} />
        <NavigationTreeItemVanilla label="Parent" onClick={onParentClick}>
          <NavigationTreeItemVanilla label="Child" />
        </NavigationTreeItemVanilla>
      </NavigationTreeContainerVanilla>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Leaf/ }));
    expect(onLeafClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Parent/ }));
    expect(onParentClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Child/ })).toBeInTheDocument();
  });

  it('inherits the container icons on expandable items, including collapse after expanding', () => {
    renderWithTheme(
      <NavigationTreeContainerVanilla
        defaultExpandIcon={<span data-testid="ctx-expand-icon" />}
        defaultCollapseIcon={<span data-testid="ctx-collapse-icon" />}
      >
        <NavigationTreeItemVanilla label="Parent">
          <NavigationTreeItemVanilla label="Child" />
        </NavigationTreeItemVanilla>
      </NavigationTreeContainerVanilla>,
    );

    expect(screen.getByTestId('ctx-expand-icon')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Parent/ }));
    expect(screen.getByTestId('ctx-collapse-icon')).toBeInTheDocument();
  });

  it('propagates the container context through non-tree wrappers to descendant items', () => {
    renderWithTheme(
      <NavigationTreeContainerVanilla defaultExpandIcon={<span data-testid="ctx-expand-icon" />}>
        <div>
          <NavigationTreeItemVanilla label="Wrapped">
            <NavigationTreeItemVanilla label="Child" />
          </NavigationTreeItemVanilla>
        </div>
      </NavigationTreeContainerVanilla>,
    );

    expect(screen.getByTestId('ctx-expand-icon')).toBeInTheDocument();
  });

  it('passes the icons down to nested items', () => {
    renderWithTheme(
      <NavigationTreeContainerVanilla defaultExpandIcon={<span data-testid="ctx-expand-icon" />}>
        <NavigationTreeItemVanilla label="Parent" defaultExpanded>
          <NavigationTreeItemVanilla label="Child">
            <NavigationTreeItemVanilla label="Grandchild" />
          </NavigationTreeItemVanilla>
        </NavigationTreeItemVanilla>
      </NavigationTreeContainerVanilla>,
    );

    expect(screen.getAllByTestId('ctx-expand-icon')).toHaveLength(1);
    expect(screen.getByRole('button', { name: /Child/ })).toContainElement(
      screen.getByTestId('ctx-expand-icon'),
    );
  });

  it('lets per-item and custom icon props override the inherited icon', () => {
    renderWithTheme(
      <NavigationTreeContainerVanilla defaultExpandIcon={<span data-testid="ctx-expand-icon" />}>
        <NavigationTreeItemVanilla
          label="Default"
          defaultExpandIcon={<span data-testid="item-expand-icon" />}
        >
          <NavigationTreeItemVanilla label="Child" />
        </NavigationTreeItemVanilla>
        <NavigationTreeItemVanilla
          label="Custom"
          customExpandIcon={<span data-testid="custom-expand-icon" />}
        >
          <NavigationTreeItemVanilla label="Child" />
        </NavigationTreeItemVanilla>
      </NavigationTreeContainerVanilla>,
    );

    expect(screen.getByTestId('item-expand-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-expand-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('ctx-expand-icon')).not.toBeInTheDocument();
  });

  it('prefers the startAdornment over the expand icon', () => {
    renderWithTheme(
      <NavigationTreeItemVanilla
        label="Parent"
        startAdornment={<span data-testid="adornment" />}
        defaultExpandIcon={<span data-testid="expand-icon" />}
      >
        <NavigationTreeItemVanilla label="Child" />
      </NavigationTreeItemVanilla>,
    );

    expect(screen.getByTestId('adornment')).toBeInTheDocument();
    expect(screen.queryByTestId('expand-icon')).not.toBeInTheDocument();
  });

  it('indents nested items with the container padding by default', () => {
    renderWithTheme(
      <NavigationTreeItemVanilla label="Parent" defaultExpanded>
        <NavigationTreeItemVanilla label="Child" />
      </NavigationTreeItemVanilla>,
    );
    const child = screen.getByRole('button', { name: /Child/ });

    expect(child.style.paddingLeft).toBe('');
    expect(child.parentElement?.parentElement).toHaveClass('navigationTreeNested');
  });

  it('indents the item content by depth in full width', () => {
    renderWithTheme(
      <NavigationTreeDrawerVanilla fullWidth>
        <NavigationTreeContainerVanilla>
          <NavigationTreeItemVanilla label="Parent" defaultExpanded>
            <NavigationTreeItemVanilla label="Child" defaultExpanded>
              <NavigationTreeItemVanilla label="Grandchild" />
            </NavigationTreeItemVanilla>
          </NavigationTreeItemVanilla>
        </NavigationTreeContainerVanilla>
      </NavigationTreeDrawerVanilla>,
    );
    const depthOf = (name: RegExp) =>
      screen.getByRole('button', { name }).style.getPropertyValue('--tree-depth');

    expect(depthOf(/Parent/)).toBe('0');
    expect(depthOf(/^Child/)).toBe('1');
    expect(depthOf(/Grandchild/)).toBe('2');
    ['Parent', 'Child', 'Grandchild'].forEach((name) => {
      expect(screen.getByRole('button', { name: new RegExp(`^${name}`) })).toHaveClass(
        'navigationTreeItemFullWidth',
      );
    });
    expect(
      screen.getByRole('button', { name: /Grandchild/ }).parentElement?.parentElement,
    ).not.toHaveClass('navigationTreeNested');
  });

  it('lets the css prop override the full width indent', () => {
    renderWithTheme(
      <NavigationTreeDrawerVanilla fullWidth>
        <NavigationTreeItemVanilla label="Item" css={{ paddingLeft: '4px' }} />
      </NavigationTreeDrawerVanilla>,
    );

    expect(screen.getByRole('button', { name: /Item/ }).style.paddingLeft).toBe('4px');
  });

  it('lets an item opt out of full width', () => {
    renderWithTheme(
      <NavigationTreeDrawerVanilla fullWidth>
        <NavigationTreeItemVanilla label="Item" fullWidth={false} />
      </NavigationTreeDrawerVanilla>,
    );

    const item = screen.getByRole('button', { name: /Item/ });
    expect(item.style.paddingLeft).toBe('');
    expect(item).not.toHaveClass('navigationTreeItemFullWidth');
  });

  it('passes the navigation item props through', () => {
    renderWithTheme(
      <NavigationTreeItemVanilla
        as={RouterLink}
        to="/settings"
        label="Settings"
        active
        className="custom"
        data-testid="item"
      />,
    );
    const link = screen.getByRole('link', { name: /Settings/ });

    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-active', '');
    expect(link).toHaveClass('custom');
    expect(link).toHaveAttribute('data-testid', 'item');
  });

  it('forwards refs', () => {
    const itemRef = React.createRef<HTMLButtonElement>();
    const containerRef = React.createRef<HTMLDivElement>();
    const drawerRef = React.createRef<HTMLElement>();

    renderWithTheme(
      <NavigationTreeDrawerVanilla ref={drawerRef}>
        <NavigationTreeContainerVanilla ref={containerRef}>
          <NavigationTreeItemVanilla ref={itemRef} label="Item" />
        </NavigationTreeContainerVanilla>
      </NavigationTreeDrawerVanilla>,
    );

    expect(drawerRef.current?.nodeName).toBe('NAV');
    expect(containerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merges css and style on the container and drawer', () => {
    renderWithTheme(
      <NavigationTreeDrawerVanilla data-testid="drawer" css={{ height: '200px' }} elevation={2}>
        <NavigationTreeContainerVanilla data-testid="container" style={{ margin: '4px' }}>
          <NavigationTreeItemVanilla label="Item" />
        </NavigationTreeContainerVanilla>
      </NavigationTreeDrawerVanilla>,
    );

    expect(screen.getByTestId('drawer').style.height).toBe('200px');
    expect(screen.getByTestId('container').style.margin).toBe('4px');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <NavigationTreeDrawerVanilla aria-label="Tree">
        <NavigationTreeContainerVanilla>
          <NavigationTreeItemVanilla label="Parent" subtitle="/parent" defaultExpanded>
            <NavigationTreeItemVanilla label="Child" />
          </NavigationTreeItemVanilla>
          <NavigationTreeItemVanilla label="Leaf" />
        </NavigationTreeContainerVanilla>
      </NavigationTreeDrawerVanilla>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider forcedTheme={theme} primaryColor="neon">
          <NavigationTreeDrawerVanilla fullWidth>
            <NavigationTreeItemVanilla label="Item" active />
          </NavigationTreeDrawerVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(screen.getByRole('button', { name: /Item/ })).toBeInTheDocument();
      unmount();
    });
  });
});
