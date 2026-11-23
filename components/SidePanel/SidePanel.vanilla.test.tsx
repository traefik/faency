import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { DialogTitleVanilla } from '@/components/Dialog/Dialog.vanilla';

import { SidePanelVanilla, SidePanelVanillaProps } from './SidePanel.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const renderPanel = (
  props: Partial<SidePanelVanillaProps> & { ref?: React.Ref<HTMLDivElement> } = {},
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => {
  const onOpenChange = jest.fn();
  const result = renderWithTheme(
    <SidePanelVanilla open onOpenChange={onOpenChange} {...props}>
      <DialogTitleVanilla>Details</DialogTitleVanilla>
    </SidePanelVanilla>,
    themeProps,
  );
  return { ...result, onOpenChange };
};

const getOverlay = () =>
  document.querySelector<HTMLElement>('[data-state="open"]:not([role="dialog"])');

describe('SidePanelVanilla', () => {
  it('should not render when closed', () => {
    renderPanel({ open: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render a dialog named by its title', () => {
    renderPanel();

    expect(screen.getByRole('dialog', { name: 'Details' })).toBeInTheDocument();
  });

  it('should open with defaultOpen when open is not set', async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderPanel({ open: undefined, defaultOpen: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should stay closed without open or defaultOpen', () => {
    renderPanel({ open: undefined });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render the description visually hidden', () => {
    renderPanel({ description: 'The details of the item' });
    const description = screen.getByText('The details of the item');

    expect(description.tagName).toBe('P');
    expect(description.style.position).toBe('absolute');
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('The details of the item');
  });

  it('should name the close button Close by default', () => {
    renderPanel();

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should use the given close label', () => {
    renderPanel({ closeLabel: 'Close the details' });

    expect(screen.getByRole('button', { name: 'Close the details' })).toBeInTheDocument();
  });

  it('should call onOpenChange when the close button is clicked', async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderPanel();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should call onOpenChange on Escape', async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderPanel();

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should hide the close button with noCloseIcon', () => {
    renderPanel({ noCloseIcon: true });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render the overlay unless noOverlay is set', () => {
    const { unmount } = renderPanel();
    expect(getOverlay()).toBeInTheDocument();
    unmount();

    renderPanel({ noOverlay: true });
    expect(getOverlay()).not.toBeInTheDocument();
  });

  it('should apply side variants', () => {
    const classNames = (['top', 'right', 'bottom', 'left'] as const).map((side) => {
      const { unmount } = renderPanel({ side });
      const { className } = screen.getByRole('dialog');
      unmount();
      return className;
    });

    expect(new Set(classNames).size).toBe(4);
  });

  it('should render with custom className', () => {
    renderPanel({ className: 'custom-class' });

    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    renderPanel({ style: { width: '500px' } });

    expect(screen.getByRole('dialog').style.width).toBe('500px');
  });

  it('should apply CSS prop styles', () => {
    renderPanel({ css: { p: '$2', maxWidth: 600 } });
    const panel = screen.getByRole('dialog');

    expect(panel.style.padding).toBe('8px');
    expect(panel.style.maxWidth).toBe('600px');
  });

  it('should merge style and css props correctly', () => {
    renderPanel({ css: { margin: '$2', padding: '$1' }, style: { margin: '30px' } });
    const panel = screen.getByRole('dialog');

    expect(panel.style.margin).toBe('30px');
    expect(panel.style.padding).toBe('4px');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderPanel({ ref });

    expect(ref.current).toBe(screen.getByRole('dialog'));
  });

  it('should pass through HTML attributes', () => {
    renderPanel({ id: 'details', 'aria-describedby': undefined } as Partial<SidePanelVanillaProps>);

    expect(screen.getByRole('dialog')).toHaveAttribute('id', 'details');
  });

  it('should have no accessibility violations', async () => {
    renderPanel({ description: 'The details of the item' });

    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = renderPanel({}, { forcedTheme: theme });

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      unmount();
    });
  });

  it('should work with different primary colors', () => {
    (['blue', 'neon', 'orange', 'red', 'green', 'deepBlue', 'grayBlue'] as const).forEach(
      (primaryColor) => {
        const { unmount } = renderPanel({}, { primaryColor });

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        unmount();
      },
    );
  });
});
