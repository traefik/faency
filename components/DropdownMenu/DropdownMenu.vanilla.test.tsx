import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { ButtonVanilla } from '@/components/Button/Button.vanilla';

import {
  DropdownMenuCheckboxItemVanilla,
  DropdownMenuContentVanilla,
  DropdownMenuContentVanillaProps,
  DropdownMenuGroupVanilla,
  DropdownMenuItemVanilla,
  DropdownMenuLabelVanilla,
  DropdownMenuPortalVanilla,
  DropdownMenuRadioGroupVanilla,
  DropdownMenuRadioItemVanilla,
  DropdownMenuSeparatorVanilla,
  DropdownMenuTriggerVanilla,
  DropdownMenuVanilla,
} from './DropdownMenu.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const Menu = ({
  defaultOpen,
  contentRef,
  children,
  ...contentProps
}: DropdownMenuContentVanillaProps & {
  defaultOpen?: boolean;
  contentRef?: React.Ref<HTMLDivElement>;
}) => (
  <DropdownMenuVanilla defaultOpen={defaultOpen}>
    <DropdownMenuTriggerVanilla>Actions</DropdownMenuTriggerVanilla>
    <DropdownMenuPortalVanilla>
      <DropdownMenuContentVanilla ref={contentRef} aria-label="Actions" {...contentProps}>
        {children ?? <DropdownMenuItemVanilla>Edit</DropdownMenuItemVanilla>}
      </DropdownMenuContentVanilla>
    </DropdownMenuPortalVanilla>
  </DropdownMenuVanilla>
);

describe('DropdownMenuVanilla', () => {
  const { ResizeObserver } = window;
  const { matches } = Element.prototype;

  beforeAll(() => {
    // The shared mock calls back inside observe(), which floating-ui answers by observing again.
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    // nwsapi 2.2.27 recurses without end on these pseudo-classes, which floating-ui queries.
    Element.prototype.matches = function (this: Element, selector: string) {
      return /:(modal|popover-open|fullscreen)\b/.test(selector)
        ? false
        : matches.call(this, selector);
    };
  });

  afterAll(() => {
    window.ResizeObserver = ResizeObserver;
    Element.prototype.matches = matches;
  });

  it('should render a closed menu button', () => {
    renderWithTheme(<Menu />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should open on click and list the items', async () => {
    renderWithTheme(
      <Menu>
        <DropdownMenuItemVanilla>Edit</DropdownMenuItemVanilla>
        <DropdownMenuItemVanilla>Delete</DropdownMenuItemVanilla>
      </Menu>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual([
      'Edit',
      'Delete',
    ]);
  });

  it('should call onSelect and close when an item is chosen', async () => {
    const onSelect = jest.fn();
    renderWithTheme(
      <Menu>
        <DropdownMenuItemVanilla onSelect={onSelect}>Edit</DropdownMenuItemVanilla>
      </Menu>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should not select a disabled item', async () => {
    const onSelect = jest.fn();
    renderWithTheme(
      <Menu defaultOpen>
        <DropdownMenuItemVanilla disabled onSelect={onSelect}>
          Edit
        </DropdownMenuItemVanilla>
      </Menu>,
    );

    const item = screen.getByRole('menuitem', { name: 'Edit' });
    expect(item).toHaveAttribute('aria-disabled', 'true');
    expect(item).toHaveAttribute('data-disabled');

    await userEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should highlight the item with the keyboard', async () => {
    renderWithTheme(
      <Menu>
        <DropdownMenuItemVanilla>Edit</DropdownMenuItemVanilla>
        <DropdownMenuItemVanilla>Delete</DropdownMenuItemVanilla>
      </Menu>,
    );

    screen.getByRole('button', { name: 'Actions' }).focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute('data-highlighted');

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('data-highlighted');
  });

  it('should render checkbox items with an indicator when checked', async () => {
    const onCheckedChange = jest.fn();
    renderWithTheme(
      <Menu defaultOpen>
        <DropdownMenuCheckboxItemVanilla checked>Show labels</DropdownMenuCheckboxItemVanilla>
        <DropdownMenuCheckboxItemVanilla checked={false} onCheckedChange={onCheckedChange}>
          Show icons
        </DropdownMenuCheckboxItemVanilla>
      </Menu>,
    );

    const checked = screen.getByRole('menuitemcheckbox', { name: 'Show labels' });
    const unchecked = screen.getByRole('menuitemcheckbox', { name: 'Show icons' });
    expect(checked).toHaveAttribute('aria-checked', 'true');
    expect(checked.querySelector('svg')).toBeInTheDocument();
    expect(unchecked).toHaveAttribute('aria-checked', 'false');
    expect(unchecked.querySelector('svg')).not.toBeInTheDocument();

    await userEvent.click(unchecked);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should render radio items in a radio group', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(
      <Menu defaultOpen>
        <DropdownMenuRadioGroupVanilla value="one" onValueChange={onValueChange}>
          <DropdownMenuRadioItemVanilla value="one">One</DropdownMenuRadioItemVanilla>
          <DropdownMenuRadioItemVanilla value="two">Two</DropdownMenuRadioItemVanilla>
        </DropdownMenuRadioGroupVanilla>
      </Menu>,
    );

    expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('menuitemradio', { name: 'Two' })).toHaveAttribute(
      'aria-checked',
      'false',
    );

    await userEvent.click(screen.getByRole('menuitemradio', { name: 'Two' }));
    expect(onValueChange).toHaveBeenCalledWith('two');
  });

  it('should render groups, labels and separators', () => {
    renderWithTheme(
      <Menu defaultOpen>
        <DropdownMenuGroupVanilla>
          <DropdownMenuLabelVanilla>Account</DropdownMenuLabelVanilla>
          <DropdownMenuItemVanilla>Profile</DropdownMenuItemVanilla>
        </DropdownMenuGroupVanilla>
        <DropdownMenuSeparatorVanilla />
        <DropdownMenuItemVanilla>Log out</DropdownMenuItemVanilla>
      </Menu>,
    );

    expect(screen.getByRole('group')).toHaveTextContent('AccountProfile');
    expect(screen.getByText('Account')).not.toHaveAttribute('role');
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should render an item as another element with the as prop', async () => {
    const onSelect = jest.fn();
    renderWithTheme(
      <Menu defaultOpen>
        <DropdownMenuItemVanilla as="a" href="#profile" className="custom-item" onSelect={onSelect}>
          Profile
        </DropdownMenuItemVanilla>
      </Menu>,
    );

    const item = screen.getByRole('menuitem', { name: 'Profile' });
    expect(item.tagName).toBe('A');
    expect(item).toHaveAttribute('href', '#profile');
    expect(item.className).toContain('custom-item');
    expect(item.querySelector('a')).not.toBeInTheDocument();

    await userEvent.click(item);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should render the trigger as another component with the as prop', async () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(
      <DropdownMenuVanilla>
        <DropdownMenuTriggerVanilla
          as={ButtonVanilla}
          variant="secondary"
          ref={ref}
          className="custom-trigger"
          css={{ margin: '$2' }}
        >
          Actions
        </DropdownMenuTriggerVanilla>
        <DropdownMenuPortalVanilla>
          <DropdownMenuContentVanilla aria-label="Actions">
            <DropdownMenuItemVanilla>Edit</DropdownMenuItemVanilla>
          </DropdownMenuContentVanilla>
        </DropdownMenuPortalVanilla>
      </DropdownMenuVanilla>,
    );

    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger.className).toContain('custom-trigger');
    expect(trigger.style.margin).toBe('8px');

    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('should apply the elevation prop', () => {
    const elevations = [0, 1, 2, 3, 4, 5] as const;

    elevations.forEach((elevation) => {
      const { unmount } = renderWithTheme(<Menu defaultOpen elevation={elevation} />);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      unmount();
    });
  });

  it('should render with custom className', () => {
    renderWithTheme(
      <Menu defaultOpen className="custom-content">
        <DropdownMenuLabelVanilla className="custom-label">Label</DropdownMenuLabelVanilla>
        <DropdownMenuItemVanilla className="custom-item">Item</DropdownMenuItemVanilla>
        <DropdownMenuCheckboxItemVanilla className="custom-checkbox">
          Checkbox
        </DropdownMenuCheckboxItemVanilla>
        <DropdownMenuRadioGroupVanilla value="one">
          <DropdownMenuRadioItemVanilla value="one" className="custom-radio">
            Radio
          </DropdownMenuRadioItemVanilla>
        </DropdownMenuRadioGroupVanilla>
        <DropdownMenuSeparatorVanilla className="custom-separator" />
      </Menu>,
    );

    expect(screen.getByRole('menu').className).toContain('custom-content');
    expect(screen.getByText('Label').className).toContain('custom-label');
    expect(screen.getByRole('menuitem').className).toContain('custom-item');
    expect(screen.getByRole('menuitemcheckbox').className).toContain('custom-checkbox');
    expect(screen.getByRole('menuitemradio').className).toContain('custom-radio');
    expect(screen.getByRole('separator').className).toContain('custom-separator');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(<Menu defaultOpen style={{ backgroundColor: 'red', padding: '10px' }} />);
    const menu = screen.getByRole('menu');

    expect(menu.style.backgroundColor).toBe('red');
    expect(menu.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(
      <Menu defaultOpen css={{ padding: '$4', margin: '$2' }}>
        <DropdownMenuItemVanilla css={{ padding: '$4' }}>Edit</DropdownMenuItemVanilla>
        <DropdownMenuSeparatorVanilla css={{ margin: '$2' }} />
      </Menu>,
    );
    const menu = screen.getByRole('menu');

    expect(menu.style.padding).toBe('20px');
    expect(menu.style.margin).toBe('8px');
    expect(screen.getByRole('menuitem').style.padding).toBe('20px');
    expect(screen.getByRole('separator').style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <Menu
        defaultOpen
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const menu = screen.getByRole('menu');

    expect(menu.style.padding).toBe('30px');
    expect(menu.style.margin).toBe('8px');
    expect(menu.style.backgroundColor).toBe('blue');
  });

  it('should forward refs', () => {
    const contentRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const checkboxRef = createRef<HTMLDivElement>();
    const radioGroupRef = createRef<HTMLDivElement>();
    const radioRef = createRef<HTMLDivElement>();
    const groupRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLDivElement>();
    const separatorRef = createRef<HTMLDivElement>();

    renderWithTheme(
      <Menu defaultOpen contentRef={contentRef}>
        <DropdownMenuGroupVanilla ref={groupRef}>
          <DropdownMenuLabelVanilla ref={labelRef}>Label</DropdownMenuLabelVanilla>
          <DropdownMenuItemVanilla ref={itemRef}>Item</DropdownMenuItemVanilla>
          <DropdownMenuItemVanilla as="a" href="/" ref={linkRef}>
            Link
          </DropdownMenuItemVanilla>
        </DropdownMenuGroupVanilla>
        <DropdownMenuCheckboxItemVanilla ref={checkboxRef}>
          Checkbox
        </DropdownMenuCheckboxItemVanilla>
        <DropdownMenuRadioGroupVanilla ref={radioGroupRef}>
          <DropdownMenuRadioItemVanilla value="one" ref={radioRef}>
            Radio
          </DropdownMenuRadioItemVanilla>
        </DropdownMenuRadioGroupVanilla>
        <DropdownMenuSeparatorVanilla ref={separatorRef} />
      </Menu>,
    );

    expect(contentRef.current).toBe(screen.getByRole('menu'));
    expect(groupRef.current).toBe(screen.getAllByRole('group')[0]);
    expect(labelRef.current).toBe(screen.getByText('Label'));
    expect(itemRef.current).toBe(screen.getByRole('menuitem', { name: 'Item' }));
    expect(linkRef.current).toBe(screen.getByRole('menuitem', { name: 'Link' }));
    expect(checkboxRef.current).toBe(screen.getByRole('menuitemcheckbox'));
    expect(radioGroupRef.current).toBe(screen.getAllByRole('group')[1]);
    expect(radioRef.current).toBe(screen.getByRole('menuitemradio'));
    expect(separatorRef.current).toBe(screen.getByRole('separator'));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(
      <Menu defaultOpen data-testid="content" id="menu">
        <DropdownMenuItemVanilla data-testid="item" title="Edit the route">
          Edit
        </DropdownMenuItemVanilla>
      </Menu>,
    );

    expect(screen.getByTestId('content')).toHaveAttribute('id', 'menu');
    expect(screen.getByTestId('item')).toHaveAttribute('title', 'Edit the route');
  });

  it('should render in light and dark themes with a primary color', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = renderWithTheme(<Menu defaultOpen />, {
        forcedTheme: theme,
        primaryColor: 'neon',
      });
      expect(screen.getByRole('menu')).toBeInTheDocument();
      unmount();
    });
  });

  it('should not have accessibility violations, closed and open', async () => {
    const { container } = renderWithTheme(<Menu />);
    expect(await axe(container)).toHaveNoViolations();

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    // The open menu is portalled to the body, outside any landmark of the test page.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
