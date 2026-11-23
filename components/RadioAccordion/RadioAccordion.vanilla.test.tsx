import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import {
  RadioAccordionContentVanilla,
  RadioAccordionItemVanilla,
  RadioAccordionRootVanilla,
  RadioAccordionTriggerVanilla,
  RadioAccordionTriggerVanillaProps,
} from './RadioAccordion.vanilla';

describe('RadioAccordionVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  const renderAccordion = (
    triggerProps: Partial<RadioAccordionTriggerVanillaProps> = {},
    rootProps: Partial<React.ComponentProps<typeof RadioAccordionRootVanilla>> = {},
  ) =>
    renderWithTheme(
      <RadioAccordionRootVanilla data-testid="root" {...rootProps}>
        <RadioAccordionItemVanilla value="one" data-testid="item">
          <RadioAccordionTriggerVanilla {...triggerProps}>One</RadioAccordionTriggerVanilla>
          <RadioAccordionContentVanilla data-testid="content">
            Content one
          </RadioAccordionContentVanilla>
        </RadioAccordionItemVanilla>
        <RadioAccordionItemVanilla value="two">
          <RadioAccordionTriggerVanilla>Two</RadioAccordionTriggerVanilla>
          <RadioAccordionContentVanilla>Content two</RadioAccordionContentVanilla>
        </RadioAccordionItemVanilla>
      </RadioAccordionRootVanilla>,
    );

  it('should render the trigger in an h3 by default', () => {
    renderAccordion();

    expect(screen.getByRole('heading', { level: 3, name: 'One' })).toContainElement(
      screen.getByRole('button', { name: 'One' }),
    );
  });

  it('should render the trigger in a heading of the given level', () => {
    renderAccordion({ headingLevel: 2 });

    expect(screen.getByRole('heading', { level: 2, name: 'One' })).toBeInTheDocument();
  });

  it('should render the trigger without a heading', () => {
    renderAccordion({ headingLevel: 'none' });

    expect(screen.queryByRole('heading', { name: 'One' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
  });

  it('should not pass headingLevel to the button', () => {
    renderAccordion({ headingLevel: 2 });

    expect(screen.getByRole('button', { name: 'One' })).not.toHaveAttribute('headingLevel');
  });

  it('should open one item at a time and not collapse the open one', () => {
    const onValueChange = jest.fn();
    renderAccordion({}, { onValueChange });
    const one = screen.getByRole('button', { name: 'One' });
    const two = screen.getByRole('button', { name: 'Two' });

    fireEvent.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content one')).toBeInTheDocument();

    fireEvent.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(two);
    expect(two).toHaveAttribute('aria-expanded', 'true');
    expect(one).toHaveAttribute('aria-expanded', 'false');
    expect(onValueChange).toHaveBeenLastCalledWith('two');
  });

  it('should render a hidden radio before the label of each trigger', () => {
    renderAccordion();

    ['One', 'Two'].forEach((name) => {
      const radio = screen.getByRole('button', { name }).firstElementChild;

      expect(radio?.tagName).toBe('DIV');
      expect(radio).toHaveAttribute('aria-hidden', 'true');
      expect(radio?.firstElementChild).toBeInTheDocument();
    });
  });

  it('should mark only the open trigger as open, which fills its radio', () => {
    renderAccordion({}, { defaultValue: 'two' });

    expect(screen.getByRole('button', { name: 'Two' })).toHaveAttribute('data-state', 'open');
    expect(screen.getByRole('button', { name: 'One' })).toHaveAttribute('data-state', 'closed');

    fireEvent.click(screen.getByRole('button', { name: 'One' }));

    expect(screen.getByRole('button', { name: 'One' })).toHaveAttribute('data-state', 'open');
    expect(screen.getByRole('button', { name: 'Two' })).toHaveAttribute('data-state', 'closed');
  });

  it('should not open a disabled trigger', () => {
    renderAccordion({ disabled: true });
    const one = screen.getByRole('button', { name: 'One' });

    fireEvent.click(one);

    expect(one).toBeDisabled();
    expect(one).toHaveAttribute('data-state', 'closed');
  });

  it('should render with custom className', () => {
    renderAccordion({ className: 'trigger-class' }, { className: 'root-class' });

    expect(screen.getByTestId('root')).toHaveClass('root-class');
    expect(screen.getByRole('button', { name: 'One' })).toHaveClass('trigger-class');
  });

  it('should apply size and elevation variants', () => {
    (['small', 'medium', 'large'] as const).forEach((size, index) => {
      const { unmount } = renderAccordion({ size }, { elevation: index as 0 | 1 | 2 });

      expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply CSS prop and style prop', () => {
    renderAccordion({ css: { px: '$3' }, style: { color: 'red' } }, { css: { m: '$2' } });
    const trigger = screen.getByRole('button', { name: 'One' });

    expect(trigger.style.paddingLeft).toBe('16px');
    expect(trigger.style.color).toBe('red');
    expect(screen.getByTestId('root').style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderAccordion({ css: { px: '$3', py: '$1' }, style: { paddingLeft: '30px' } });
    const trigger = screen.getByRole('button', { name: 'One' });

    expect(trigger.style.paddingLeft).toBe('30px');
    expect(trigger.style.paddingTop).toBe('4px');
  });

  it('should forward refs', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDivElement>();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    renderWithTheme(
      <RadioAccordionRootVanilla ref={rootRef} defaultValue="one">
        <RadioAccordionItemVanilla value="one" ref={itemRef}>
          <RadioAccordionTriggerVanilla ref={triggerRef}>One</RadioAccordionTriggerVanilla>
          <RadioAccordionContentVanilla ref={contentRef}>Content</RadioAccordionContentVanilla>
        </RadioAccordionItemVanilla>
      </RadioAccordionRootVanilla>,
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'One' }));
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    renderAccordion({ 'aria-describedby': 'hint' }, { defaultValue: 'one' });

    expect(screen.getByTestId('item')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'One' })).toHaveAttribute('aria-describedby', 'hint');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderAccordion({ headingLevel: 2 }, { defaultValue: 'one' });

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider forcedTheme={theme}>
          <RadioAccordionRootVanilla defaultValue="one">
            <RadioAccordionItemVanilla value="one">
              <RadioAccordionTriggerVanilla>One</RadioAccordionTriggerVanilla>
              <RadioAccordionContentVanilla>Content</RadioAccordionContentVanilla>
            </RadioAccordionItemVanilla>
          </RadioAccordionRootVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
      unmount();
    });
  });
});
