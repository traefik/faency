import { BookmarkIcon } from '@radix-ui/react-icons';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import {
  AccordionContentVanilla,
  AccordionItemVanilla,
  AccordionRootVanilla,
  AccordionRootVanillaProps,
  AccordionTriggerVanilla,
  AccordionTriggerVanillaProps,
} from './Accordion.vanilla';

describe('AccordionVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  const renderAccordion = (
    triggerProps: Partial<AccordionTriggerVanillaProps> = {},
    rootProps: Partial<Omit<Extract<AccordionRootVanillaProps, { type: 'single' }>, 'type'>> = {},
  ) =>
    renderWithTheme(
      <AccordionRootVanilla type="single" data-testid="root" {...rootProps}>
        <AccordionItemVanilla value="one" data-testid="item">
          <AccordionTriggerVanilla {...triggerProps}>One</AccordionTriggerVanilla>
          <AccordionContentVanilla data-testid="content">Content one</AccordionContentVanilla>
        </AccordionItemVanilla>
        <AccordionItemVanilla value="two">
          <AccordionTriggerVanilla>Two</AccordionTriggerVanilla>
          <AccordionContentVanilla>Content two</AccordionContentVanilla>
        </AccordionItemVanilla>
      </AccordionRootVanilla>,
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

  it('should render a hidden chevron by default', () => {
    renderAccordion();
    const icon = screen.getByRole('button', { name: 'One' }).querySelector('svg');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render a custom icon', () => {
    renderAccordion({ customIcon: <BookmarkIcon data-testid="custom-icon" /> });

    expect(screen.getByTestId('custom-icon').parentElement).toHaveAttribute('aria-hidden');
    expect(screen.getByRole('button', { name: 'One' }).querySelectorAll('svg')).toHaveLength(1);
  });

  it('should render no icon', () => {
    renderAccordion({ noIcon: true });

    expect(screen.getByRole('button', { name: 'One' }).querySelector('svg')).toBeNull();
  });

  it('should expand and collapse a collapsible single accordion', () => {
    renderAccordion({}, { collapsible: true });
    const one = screen.getByRole('button', { name: 'One' });

    fireEvent.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content one')).toBeInTheDocument();

    fireEvent.click(one);
    expect(one).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open several items in a multiple accordion', () => {
    renderWithTheme(
      <AccordionRootVanilla type="multiple">
        <AccordionItemVanilla value="one">
          <AccordionTriggerVanilla>One</AccordionTriggerVanilla>
          <AccordionContentVanilla>Content one</AccordionContentVanilla>
        </AccordionItemVanilla>
        <AccordionItemVanilla value="two">
          <AccordionTriggerVanilla>Two</AccordionTriggerVanilla>
          <AccordionContentVanilla>Content two</AccordionContentVanilla>
        </AccordionItemVanilla>
      </AccordionRootVanilla>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'One' }));
    fireEvent.click(screen.getByRole('button', { name: 'Two' }));

    expect(screen.getByRole('button', { name: 'One' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Two' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('should not open a disabled item', () => {
    renderAccordion({ disabled: true });
    const one = screen.getByRole('button', { name: 'One' });

    fireEvent.click(one);

    expect(one).toBeDisabled();
    expect(one).toHaveAttribute('aria-expanded', 'false');
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
      <AccordionRootVanilla type="single" defaultValue="one" ref={rootRef}>
        <AccordionItemVanilla value="one" ref={itemRef}>
          <AccordionTriggerVanilla ref={triggerRef}>One</AccordionTriggerVanilla>
          <AccordionContentVanilla ref={contentRef}>Content</AccordionContentVanilla>
        </AccordionItemVanilla>
      </AccordionRootVanilla>,
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
          <AccordionRootVanilla type="single" defaultValue="one">
            <AccordionItemVanilla value="one">
              <AccordionTriggerVanilla>One</AccordionTriggerVanilla>
              <AccordionContentVanilla>Content</AccordionContentVanilla>
            </AccordionItemVanilla>
          </AccordionRootVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
      unmount();
    });
  });
});
