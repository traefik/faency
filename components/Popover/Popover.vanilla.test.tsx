import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { ButtonVanilla } from '@/components/Button/Button.vanilla';

import {
  PopoverAnchorVanilla,
  PopoverCloseVanilla,
  PopoverContentVanilla,
  PopoverContentVanillaProps,
  PopoverPortalVanilla,
  PopoverTriggerVanilla,
  PopoverVanilla,
} from './Popover.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const TestPopover = ({
  defaultOpen,
  contentRef,
  children,
  ...contentProps
}: PopoverContentVanillaProps & {
  defaultOpen?: boolean;
  contentRef?: React.Ref<HTMLDivElement>;
}) => (
  <PopoverVanilla defaultOpen={defaultOpen}>
    <PopoverTriggerVanilla>Details</PopoverTriggerVanilla>
    <PopoverPortalVanilla>
      <PopoverContentVanilla ref={contentRef} aria-label="Details" {...contentProps}>
        {children ?? <PopoverCloseVanilla>Close</PopoverCloseVanilla>}
      </PopoverContentVanilla>
    </PopoverPortalVanilla>
  </PopoverVanilla>
);

describe('PopoverVanilla', () => {
  it('should render a closed trigger', () => {
    renderWithTheme(<TestPopover />);

    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should open on trigger click and close with the close button', async () => {
    renderWithTheme(<TestPopover />);
    const trigger = screen.getByRole('button', { name: 'Details' });

    await userEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close on Escape', async () => {
    renderWithTheme(<TestPopover defaultOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render an arrow unless hideArrow is set', () => {
    const { unmount } = renderWithTheme(<TestPopover defaultOpen />);
    expect(screen.getByRole('dialog').querySelector('svg')).toBeInTheDocument();
    unmount();

    renderWithTheme(<TestPopover defaultOpen hideArrow />);
    expect(screen.getByRole('dialog').querySelector('svg')).not.toBeInTheDocument();
  });

  it('should apply arrowCss to the arrow', () => {
    renderWithTheme(<TestPopover defaultOpen arrowCss={{ fill: 'red' }} />);

    expect(screen.getByRole('dialog').querySelector('svg')).toHaveStyle({ fill: 'red' });
  });

  it('should apply the elevation prop', () => {
    const elevations = [0, 1, 2, 3, 4, 5] as const;

    elevations.forEach((elevation) => {
      const { unmount } = renderWithTheme(<TestPopover defaultOpen elevation={elevation} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      unmount();
    });
  });

  it('should render the trigger and close as another component with the as prop', async () => {
    const triggerRef = createRef<HTMLButtonElement>();
    const closeRef = createRef<HTMLButtonElement>();
    renderWithTheme(
      <PopoverVanilla>
        <PopoverTriggerVanilla
          as={ButtonVanilla}
          variant="secondary"
          ref={triggerRef}
          className="custom-trigger"
          css={{ margin: '$2' }}
        >
          Details
        </PopoverTriggerVanilla>
        <PopoverPortalVanilla>
          <PopoverContentVanilla aria-label="Details">
            <PopoverCloseVanilla as={ButtonVanilla} ref={closeRef} className="custom-close">
              Close
            </PopoverCloseVanilla>
          </PopoverContentVanilla>
        </PopoverPortalVanilla>
      </PopoverVanilla>,
    );

    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(triggerRef.current).toBe(trigger);
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger.className).toContain('custom-trigger');
    expect(trigger.style.margin).toBe('8px');

    await userEvent.click(trigger);
    const close = screen.getByRole('button', { name: 'Close' });
    expect(closeRef.current).toBe(close);
    expect(close.className).toContain('custom-close');
    expect(close.querySelector('button')).not.toBeInTheDocument();

    await userEvent.click(close);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render the anchor as another element with the as prop', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(
      <PopoverVanilla>
        <PopoverAnchorVanilla as="section" ref={ref} data-testid="anchor" css={{ padding: '$2' }}>
          <PopoverTriggerVanilla>Details</PopoverTriggerVanilla>
        </PopoverAnchorVanilla>
      </PopoverVanilla>,
    );

    const anchor = screen.getByTestId('anchor');
    expect(anchor.tagName).toBe('SECTION');
    expect(ref.current).toBe(anchor);
    expect(anchor.style.padding).toBe('8px');
  });

  it('should render with custom className', () => {
    renderWithTheme(<TestPopover defaultOpen className="custom-content" />);

    expect(screen.getByRole('dialog').className).toContain('custom-content');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(
      <TestPopover defaultOpen style={{ backgroundColor: 'red', padding: '10px' }} />,
    );
    const dialog = screen.getByRole('dialog');

    expect(dialog.style.backgroundColor).toBe('red');
    expect(dialog.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(<TestPopover defaultOpen css={{ padding: '$4', margin: '$2' }} />);
    const dialog = screen.getByRole('dialog');

    expect(dialog.style.padding).toBe('20px');
    expect(dialog.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <TestPopover
        defaultOpen
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const dialog = screen.getByRole('dialog');

    expect(dialog.style.padding).toBe('30px');
    expect(dialog.style.margin).toBe('8px');
    expect(dialog.style.backgroundColor).toBe('blue');
  });

  it('should forward refs', () => {
    const contentRef = createRef<HTMLDivElement>();
    const closeRef = createRef<HTMLButtonElement>();
    renderWithTheme(
      <TestPopover defaultOpen contentRef={contentRef}>
        <PopoverCloseVanilla ref={closeRef}>Close</PopoverCloseVanilla>
      </TestPopover>,
    );

    expect(contentRef.current).toBe(screen.getByRole('dialog'));
    expect(closeRef.current).toBe(screen.getByRole('button', { name: 'Close' }));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(<TestPopover defaultOpen data-testid="content" id="popover" />);

    expect(screen.getByTestId('content')).toHaveAttribute('id', 'popover');
  });

  it('should render in light and dark themes with a primary color', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = renderWithTheme(<TestPopover defaultOpen />, {
        forcedTheme: theme,
        primaryColor: 'neon',
      });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      unmount();
    });
  });

  it('should not have accessibility violations, closed and open', async () => {
    const { container } = renderWithTheme(<TestPopover />);
    expect(await axe(container)).toHaveNoViolations();

    await userEvent.click(screen.getByRole('button', { name: 'Details' }));
    // The open popover is portalled to the body, outside any landmark of the test page.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
