import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import {
  TooltipContentVanilla,
  TooltipPortalVanilla,
  TooltipRootVanilla,
  TooltipTriggerVanilla,
  TooltipVanilla,
  TooltipVanillaProps,
} from './Tooltip.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const TestTooltip = ({
  content = 'Tip',
  contentRef,
  ...props
}: Partial<TooltipVanillaProps> & { contentRef?: React.Ref<HTMLDivElement> }) => (
  <TooltipVanilla ref={contentRef} content={content} {...props}>
    <button type="button">Trigger</button>
  </TooltipVanilla>
);

describe('TooltipVanilla', () => {
  it('renders the trigger with the tooltip closed', () => {
    renderWithTheme(<TestTooltip />);

    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on focus and closes on Escape', async () => {
    renderWithTheme(<TestTooltip />);

    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip');

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('is controlled through open and onOpenChange', async () => {
    const onOpenChange = jest.fn();
    renderWithTheme(<TestTooltip open onOpenChange={onOpenChange} />);

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('wraps string content in a paragraph', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<TestTooltip defaultOpen contentRef={ref} />);

    const paragraph = ref.current?.querySelector('p');
    expect(paragraph).toHaveTextContent('Tip');
    expect(paragraph?.style.color).toBe('currentcolor');
  });

  it('renders node content as is', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <TestTooltip defaultOpen contentRef={ref} content={<strong>Bold tip</strong>} />,
    );

    expect(ref.current?.querySelector('p')).toBeNull();
    expect(ref.current?.querySelector('strong')).toHaveTextContent('Bold tip');
  });

  it('applies the multiline variant and line height', () => {
    const ref = createRef<HTMLDivElement>();
    const { unmount } = renderWithTheme(<TestTooltip defaultOpen contentRef={ref} />);
    const singleLineClass = ref.current?.className;
    unmount();

    renderWithTheme(<TestTooltip defaultOpen multiline contentRef={ref} />);

    expect(ref.current?.className).not.toBe(singleLineClass);
    expect(ref.current?.querySelector('p')?.style.lineHeight).toBe('20px');
  });

  it('renders the arrow', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<TestTooltip defaultOpen contentRef={ref} />);

    expect(ref.current?.querySelector('svg')).toBeInTheDocument();
  });

  it('forwards className, css and style to the content, with style winning on conflicts', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <TestTooltip
        defaultOpen
        contentRef={ref}
        className="custom-tooltip"
        css={{ padding: '$4', margin: '$2' }}
        style={{ padding: '30px' }}
      />,
    );

    expect(ref.current).toHaveClass('custom-tooltip');
    expect(ref.current?.style.padding).toBe('30px');
    expect(ref.current?.style.margin).toBe('8px');
  });

  it('passes HTML attributes to the content', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<TestTooltip defaultOpen contentRef={ref} data-testid="tooltip-content" />);

    expect(ref.current).toHaveAttribute('data-testid', 'tooltip-content');
  });

  it.each(['light', 'dark'] as const)('renders with the %s theme', (theme) => {
    renderWithTheme(<TestTooltip defaultOpen />, { defaultTheme: theme });

    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip');
  });

  it('has no accessibility violations when open', async () => {
    renderWithTheme(<TestTooltip defaultOpen />);

    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});

describe('Tooltip parts', () => {
  const TestParts = ({ trigger }: { trigger: React.ReactElement }) => (
    <TooltipRootVanilla>
      {trigger}
      <TooltipPortalVanilla>
        <TooltipContentVanilla>Tip</TooltipContentVanilla>
      </TooltipPortalVanilla>
    </TooltipRootVanilla>
  );

  it('renders the trigger as a button by default', async () => {
    renderWithTheme(<TestParts trigger={<TooltipTriggerVanilla>Trigger</TooltipTriggerVanilla>} />);

    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await userEvent.tab();

    expect(trigger).toHaveAttribute('data-state', 'instant-open');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip');
  });

  it('keeps the Radix trigger behavior on the `as` element', async () => {
    const ref = createRef<HTMLAnchorElement>();
    renderWithTheme(
      <TestParts
        trigger={
          <TooltipTriggerVanilla as="a" href="/docs" ref={ref} css={{ margin: '$2' }}>
            Docs
          </TooltipTriggerVanilla>
        }
      />,
    );

    const link = screen.getByRole('link', { name: 'Docs' });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute('data-state', 'closed');
    expect(link.style.margin).toBe('8px');

    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip');
  });
});
