import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { ButtonVanilla } from '@/components/Button/Button.vanilla';

import {
  DialogCloseIconButtonVanilla,
  DialogClosePrimitiveVanilla,
  DialogContentVanilla,
  DialogContentVanillaProps,
  DialogDescriptionVanilla,
  DialogOverlayVanilla,
  DialogPortalVanilla,
  DialogTitleVanilla,
  DialogTriggerVanilla,
  DialogVanilla,
} from './Dialog.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const TestDialog = ({
  defaultOpen,
  contentRef,
  children,
  ...contentProps
}: DialogContentVanillaProps & {
  defaultOpen?: boolean;
  contentRef?: React.Ref<HTMLDivElement>;
}) => (
  <DialogVanilla defaultOpen={defaultOpen}>
    <DialogTriggerVanilla>Open</DialogTriggerVanilla>
    <DialogPortalVanilla>
      <DialogOverlayVanilla data-testid="overlay" />
      <DialogContentVanilla ref={contentRef} {...contentProps}>
        <DialogTitleVanilla>Details</DialogTitleVanilla>
        <DialogDescriptionVanilla>More about it</DialogDescriptionVanilla>
        {children}
      </DialogContentVanilla>
    </DialogPortalVanilla>
  </DialogVanilla>
);

describe('DialogVanilla', () => {
  it('should render a closed trigger', () => {
    renderWithTheme(<TestDialog />);

    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should open on trigger click and close with the close icon button', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TestDialog />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog', { name: 'Details' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close on Escape', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TestDialog defaultOpen />);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close with DialogClosePrimitiveVanilla', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <TestDialog defaultOpen noCloseIcon>
        <DialogClosePrimitiveVanilla>Done</DialogClosePrimitiveVanilla>
      </TestDialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should label the dialog with its title and description', () => {
    renderWithTheme(<TestDialog defaultOpen />);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAccessibleName('Details');
    expect(dialog).toHaveAccessibleDescription('More about it');
    expect(screen.getByText('Details').tagName).toBe('H2');
    expect(screen.getByText('More about it').tagName).toBe('P');
  });

  it('should name the close button Close by default', () => {
    renderWithTheme(<TestDialog defaultOpen />);

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should use the given close label', () => {
    renderWithTheme(<TestDialog defaultOpen closeLabel="Close the details" />);

    expect(screen.getByRole('button', { name: 'Close the details' })).toBeInTheDocument();
  });

  it('should hide the close button with noCloseIcon', () => {
    renderWithTheme(<TestDialog defaultOpen noCloseIcon />);

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('should name DialogCloseIconButtonVanilla Close by default', () => {
    renderWithTheme(
      <DialogVanilla open>
        <DialogCloseIconButtonVanilla />
      </DialogVanilla>,
    );

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should render the overlay', () => {
    renderWithTheme(<TestDialog defaultOpen />);
    const overlay = screen.getByTestId('overlay');

    expect(overlay.tagName).toBe('DIV');
    expect(overlay.className).not.toBe('');
  });

  it('should render the trigger, title, description and close as the as element', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <DialogVanilla>
        <DialogTriggerVanilla as={ButtonVanilla} variant="primary">
          Open
        </DialogTriggerVanilla>
        <DialogPortalVanilla>
          <DialogContentVanilla noCloseIcon>
            <DialogTitleVanilla as="h3">Details</DialogTitleVanilla>
            <DialogDescriptionVanilla as="div">More about it</DialogDescriptionVanilla>
            <DialogClosePrimitiveVanilla as="a" href="#close">
              Done
            </DialogClosePrimitiveVanilla>
          </DialogContentVanilla>
        </DialogPortalVanilla>
      </DialogVanilla>,
    );
    const trigger = screen.getByRole('button', { name: 'Open' });

    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Details');
    expect(screen.getByText('Details').tagName).toBe('H3');
    expect(screen.getByText('More about it').tagName).toBe('DIV');
    expect(screen.getByText('Done').tagName).toBe('A');
  });

  it('should apply elevation variants', () => {
    ([0, 1, 2, 3, 4, 5] as const).forEach((elevation) => {
      const { unmount } = renderWithTheme(<TestDialog defaultOpen elevation={elevation} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      unmount();
    });
  });

  it('should render with custom className', () => {
    renderWithTheme(<TestDialog defaultOpen className="custom-class" />);

    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(<TestDialog defaultOpen style={{ width: '500px' }} />);

    expect(screen.getByRole('dialog').style.width).toBe('500px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(<TestDialog defaultOpen css={{ p: '$2', maxWidth: 600 }} />);
    const dialog = screen.getByRole('dialog');

    expect(dialog.style.padding).toBe('8px');
    expect(dialog.style.maxWidth).toBe('600px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <TestDialog defaultOpen css={{ margin: '$2', padding: '$1' }} style={{ margin: '30px' }} />,
    );
    const dialog = screen.getByRole('dialog');

    expect(dialog.style.margin).toBe('30px');
    expect(dialog.style.padding).toBe('4px');
  });

  it('should apply css to the parts', () => {
    renderWithTheme(
      <DialogVanilla open>
        <DialogOverlayVanilla data-testid="overlay" css={{ zIndex: 10 }} />
        <DialogContentVanilla aria-describedby={undefined}>
          <DialogTitleVanilla css={{ mb: '$3' }}>Details</DialogTitleVanilla>
          <DialogCloseIconButtonVanilla css={{ top: '$3' }} />
        </DialogContentVanilla>
      </DialogVanilla>,
    );

    expect(screen.getByTestId('overlay').style.zIndex).toBe('10');
    expect(screen.getByText('Details').style.marginBottom).toBe('16px');
    expect(screen.getAllByRole('button', { name: 'Close' })[0].style.top).toBe('16px');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<TestDialog defaultOpen contentRef={ref} />);

    expect(ref.current).toBe(screen.getByRole('dialog'));
  });

  it('should forward ref to DialogCloseIconButtonVanilla', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(
      <DialogVanilla open>
        <DialogCloseIconButtonVanilla ref={ref} />
      </DialogVanilla>,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Close' }));
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(<TestDialog defaultOpen data-testid="dialog" id="details" />);

    expect(screen.getByTestId('dialog')).toHaveAttribute('id', 'details');
  });

  it('should have no accessibility violations', async () => {
    renderWithTheme(<TestDialog defaultOpen />);

    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = renderWithTheme(<TestDialog defaultOpen />, { forcedTheme: theme });

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      unmount();
    });
  });

  it('should work with different primary colors', () => {
    (['blue', 'neon', 'orange', 'red', 'green', 'deepBlue', 'grayBlue'] as const).forEach(
      (primaryColor) => {
        const { unmount } = renderWithTheme(<TestDialog defaultOpen />, { primaryColor });

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        unmount();
      },
    );
  });
});
