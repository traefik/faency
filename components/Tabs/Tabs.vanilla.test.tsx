import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import {
  TabsContainerVanilla,
  TabsContainerVanillaProps,
  TabsContentVanilla,
  TabsListVanilla,
  TabsTriggerVanilla,
} from './Tabs.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const TestTabs = (props: Partial<TabsContainerVanillaProps>) => (
  <TabsContainerVanilla defaultValue="one" data-testid="tabs" {...props}>
    <TabsListVanilla aria-label="Sections">
      <TabsTriggerVanilla value="one">One</TabsTriggerVanilla>
      <TabsTriggerVanilla value="two">Two</TabsTriggerVanilla>
      <TabsTriggerVanilla value="three" disabled>
        Three
      </TabsTriggerVanilla>
    </TabsListVanilla>
    <TabsContentVanilla value="one">First panel</TabsContentVanilla>
    <TabsContentVanilla value="two">Second panel</TabsContentVanilla>
    <TabsContentVanilla value="three">Third panel</TabsContentVanilla>
  </TabsContainerVanilla>
);

describe('TabsVanilla', () => {
  it('should render a tablist with tabs and the default panel', () => {
    renderWithTheme(<TestTabs />);

    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });

  it('should render default elements', () => {
    renderWithTheme(<TestTabs />);

    expect(screen.getByTestId('tabs').tagName).toBe('DIV');
    expect(screen.getByRole('tablist').tagName).toBe('DIV');
    expect(screen.getByRole('tab', { name: 'One' }).tagName).toBe('BUTTON');
    expect(screen.getByRole('tabpanel').tagName).toBe('DIV');
  });

  it('should switch panels on click', async () => {
    renderWithTheme(<TestTabs />);

    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
  });

  it('should move between tabs with the keyboard and skip disabled ones', async () => {
    renderWithTheme(<TestTabs />);

    await userEvent.tab();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
  });

  it('should not activate a disabled tab', async () => {
    renderWithTheme(<TestTabs />);
    const disabled = screen.getByRole('tab', { name: 'Three' });

    expect(disabled).toBeDisabled();
    expect(disabled).toHaveAttribute('data-disabled');
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(disabled);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });

  it('should support controlled usage', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(
      <TestTabs defaultValue={undefined} value="two" onValueChange={onValueChange} />,
    );

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');

    await userEvent.click(screen.getByRole('tab', { name: 'One' }));
    expect(onValueChange).toHaveBeenCalledWith('one');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
  });

  it('should render the trigger as another element with the as prop', async () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one">
        <TabsListVanilla aria-label="Sections">
          <TabsTriggerVanilla as="div" value="one" ref={ref}>
            One
          </TabsTriggerVanilla>
          <TabsTriggerVanilla as="div" value="two">
            Two
          </TabsTriggerVanilla>
        </TabsListVanilla>
        <TabsContentVanilla value="one">First panel</TabsContentVanilla>
        <TabsContentVanilla value="two">Second panel</TabsContentVanilla>
      </TabsContainerVanilla>,
    );

    const tab = screen.getByRole('tab', { name: 'One' });
    expect(tab.tagName).toBe('DIV');
    expect(ref.current).toBe(tab);
    expect(tab.querySelector('button')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
  });

  it('should expose a disabled tab rendered with the as prop', async () => {
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one">
        <TabsListVanilla aria-label="Sections">
          <TabsTriggerVanilla as="div" value="one">
            One
          </TabsTriggerVanilla>
          <TabsTriggerVanilla as="div" value="two" disabled>
            Two
          </TabsTriggerVanilla>
        </TabsListVanilla>
        <TabsContentVanilla value="one">First panel</TabsContentVanilla>
        <TabsContentVanilla value="two">Second panel</TabsContentVanilla>
      </TabsContainerVanilla>,
    );
    const disabled = screen.getByRole('tab', { name: 'Two' });

    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('tab', { name: 'One' })).not.toHaveAttribute('aria-disabled');

    await userEvent.click(disabled);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });

  it('should focus a clicked tab without the keyboard focus ring', () => {
    const focus = jest.spyOn(HTMLElement.prototype, 'focus');
    const onMouseDown = jest.fn();
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one">
        <TabsListVanilla aria-label="Sections">
          <TabsTriggerVanilla value="one">One</TabsTriggerVanilla>
          <TabsTriggerVanilla value="two" onMouseDown={onMouseDown}>
            Two
          </TabsTriggerVanilla>
          <TabsTriggerVanilla value="three" disabled>
            Three
          </TabsTriggerVanilla>
        </TabsListVanilla>
      </TabsContainerVanilla>,
    );

    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Two' }));
    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledWith({ focusVisible: false });
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');

    focus.mockClear();
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Three' }));
    expect(focus).not.toHaveBeenCalled();
    focus.mockRestore();
  });

  it('should render with custom className on every part', () => {
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one" className="custom-root" data-testid="tabs">
        <TabsListVanilla className="custom-list">
          <TabsTriggerVanilla value="one" className="custom-trigger">
            One
          </TabsTriggerVanilla>
        </TabsListVanilla>
        <TabsContentVanilla value="one" className="custom-content">
          Panel
        </TabsContentVanilla>
      </TabsContainerVanilla>,
    );

    expect(screen.getByTestId('tabs').className).toContain('custom-root');
    expect(screen.getByRole('tablist').className).toContain('custom-list');
    expect(screen.getByRole('tab').className).toContain('custom-trigger');
    expect(screen.getByRole('tabpanel').className).toContain('custom-content');
  });

  it('should keep the base class next to a custom className', () => {
    const { unmount } = renderWithTheme(<TestTabs />);
    const baseClass = screen.getByRole('tab', { name: 'One' }).className;
    unmount();

    renderWithTheme(
      <TabsContainerVanilla defaultValue="one">
        <TabsListVanilla>
          <TabsTriggerVanilla value="one" className="custom-trigger">
            One
          </TabsTriggerVanilla>
        </TabsListVanilla>
      </TabsContainerVanilla>,
    );

    expect(baseClass).not.toBe('');
    expect(screen.getByRole('tab').className).toBe(`${baseClass} custom-trigger`);
  });

  it('should apply CSS prop styles on every part', () => {
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one" css={{ padding: '$4' }} data-testid="tabs">
        <TabsListVanilla css={{ gap: '$2' }}>
          <TabsTriggerVanilla value="one" css={{ px: '$3' }}>
            One
          </TabsTriggerVanilla>
        </TabsListVanilla>
        <TabsContentVanilla value="one" css={{ margin: '$2' }}>
          Panel
        </TabsContentVanilla>
      </TabsContainerVanilla>,
    );

    expect(screen.getByTestId('tabs').style.padding).toBe('20px');
    expect(screen.getByRole('tablist').style.gap).toBe('8px');
    expect(screen.getByRole('tab').style.paddingLeft).toBe('16px');
    expect(screen.getByRole('tab').style.paddingRight).toBe('16px');
    expect(screen.getByRole('tabpanel').style.margin).toBe('8px');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(<TestTabs style={{ backgroundColor: 'red', padding: '10px' }} />);
    const root = screen.getByTestId('tabs');

    expect(root.style.backgroundColor).toBe('red');
    expect(root.style.padding).toBe('10px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <TestTabs
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const root = screen.getByTestId('tabs');

    expect(root.style.padding).toBe('30px');
    expect(root.style.margin).toBe('8px');
    expect(root.style.backgroundColor).toBe('blue');
  });

  it('should forward refs', () => {
    const rootRef = createRef<HTMLDivElement>();
    const listRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one" ref={rootRef} data-testid="tabs">
        <TabsListVanilla ref={listRef}>
          <TabsTriggerVanilla value="one" ref={triggerRef}>
            One
          </TabsTriggerVanilla>
        </TabsListVanilla>
        <TabsContentVanilla value="one" ref={contentRef}>
          Panel
        </TabsContentVanilla>
      </TabsContainerVanilla>,
    );

    expect(rootRef.current).toBe(screen.getByTestId('tabs'));
    expect(listRef.current).toBe(screen.getByRole('tablist'));
    expect(triggerRef.current).toBe(screen.getByRole('tab'));
    expect(contentRef.current).toBe(screen.getByRole('tabpanel'));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(
      <TabsContainerVanilla defaultValue="one" id="tabs" data-testid="tabs">
        <TabsListVanilla data-testid="list">
          <TabsTriggerVanilla value="one" title="First">
            One
          </TabsTriggerVanilla>
        </TabsListVanilla>
        <TabsContentVanilla value="one" data-testid="content">
          Panel
        </TabsContentVanilla>
      </TabsContainerVanilla>,
    );

    expect(screen.getByTestId('tabs')).toHaveAttribute('id', 'tabs');
    expect(screen.getByTestId('list')).toBe(screen.getByRole('tablist'));
    expect(screen.getByRole('tab')).toHaveAttribute('title', 'First');
    expect(screen.getByTestId('content')).toBe(screen.getByRole('tabpanel'));
  });

  it('should support vertical orientation', () => {
    renderWithTheme(<TestTabs orientation="vertical" />);

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should render in light and dark themes with a primary color', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = renderWithTheme(<TestTabs />, {
        forcedTheme: theme,
        primaryColor: 'neon',
      });
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      unmount();
    });
  });

  it('should not have accessibility violations', async () => {
    const { container } = renderWithTheme(<TestTabs />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
