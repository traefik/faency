import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import {
  SegmentedControlItemVanilla,
  SegmentedControlVanilla,
  SegmentedControlVanillaProps,
} from './SegmentedControl.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const Ranges = (props: Partial<SegmentedControlVanillaProps>) => (
  <SegmentedControlVanilla aria-label="Time range" defaultValue="24h" {...props}>
    <SegmentedControlItemVanilla value="24h">24h</SegmentedControlItemVanilla>
    <SegmentedControlItemVanilla value="7d">7d</SegmentedControlItemVanilla>
    <SegmentedControlItemVanilla value="30d">30d</SegmentedControlItemVanilla>
  </SegmentedControlVanilla>
);

describe('SegmentedControlVanilla', () => {
  it('renders a labelled radio group with one radio per item', () => {
    renderWithTheme(<Ranges />);

    expect(screen.getByRole('radiogroup', { name: 'Time range' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radio', { name: '24h' })).toBeChecked();
  });

  it('selects an item on click', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(<Ranges onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole('radio', { name: '7d' }));

    expect(onValueChange).toHaveBeenCalledWith('7d');
    expect(screen.getByRole('radio', { name: '7d' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '24h' })).not.toBeChecked();
  });

  it('keeps the selection when the checked item is clicked again', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(<Ranges onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole('radio', { name: '24h' }));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: '24h' })).toBeChecked();
  });

  it('moves and selects with the arrow keys', async () => {
    renderWithTheme(<Ranges />);

    await userEvent.tab();
    const first = screen.getByRole('radio', { name: '24h' });
    expect(first).toHaveFocus();

    // Radix moves focus a tick after keydown and only selects while the key is still down.
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    const next = screen.getByRole('radio', { name: '7d' });
    await waitFor(() => expect(next).toHaveFocus());
    fireEvent.keyUp(next, { key: 'ArrowRight' });
    expect(next).toBeChecked();
  });

  it('works as a controlled component', async () => {
    const Controlled = () => {
      const [value, setValue] = React.useState('7d');
      return (
        <>
          <Ranges defaultValue={undefined} value={value} onValueChange={setValue} />
          <output>{value}</output>
        </>
      );
    };
    renderWithTheme(<Controlled />);

    expect(screen.getByRole('radio', { name: '7d' })).toBeChecked();
    await userEvent.click(screen.getByRole('radio', { name: '30d' }));
    expect(screen.getByRole('status')).toHaveTextContent('30d');
  });

  it('disables single items or the whole group', async () => {
    const onValueChange = jest.fn();
    const { unmount } = renderWithTheme(
      <SegmentedControlVanilla aria-label="Mode" onValueChange={onValueChange}>
        <SegmentedControlItemVanilla value="a">A</SegmentedControlItemVanilla>
        <SegmentedControlItemVanilla value="b" disabled>
          B
        </SegmentedControlItemVanilla>
      </SegmentedControlVanilla>,
    );

    expect(screen.getByRole('radio', { name: 'B' })).toBeDisabled();
    await userEvent.click(screen.getByRole('radio', { name: 'B' }));
    expect(onValueChange).not.toHaveBeenCalled();
    unmount();

    renderWithTheme(<Ranges disabled />);
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
  });

  it('submits its value with a form', () => {
    renderWithTheme(
      <form data-testid="form">
        <Ranges name="range" defaultValue="7d" />
      </form>,
    );

    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('range')).toBe('7d');
  });

  it('renders every size, with and without full width', () => {
    (['small', 'medium', 'large'] as const).forEach((size) => {
      [false, true].forEach((fullWidth) => {
        const { unmount } = renderWithTheme(<Ranges size={size} fullWidth={fullWidth} />);
        expect(screen.getAllByRole('radio')).toHaveLength(3);
        unmount();
      });
    });
  });

  it('renders extra content such as a count inside an item', () => {
    renderWithTheme(
      <SegmentedControlVanilla aria-label="Status" defaultValue="errors">
        <SegmentedControlItemVanilla value="errors">
          Errors <span data-testid="count">3</span>
        </SegmentedControlItemVanilla>
      </SegmentedControlVanilla>,
    );

    expect(screen.getByRole('radio', { name: 'Errors 3' })).toContainElement(
      screen.getByTestId('count'),
    );
  });

  it('forwards refs', () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    renderWithTheme(
      <SegmentedControlVanilla ref={rootRef} aria-label="Mode">
        <SegmentedControlItemVanilla ref={itemRef} value="a">
          A
        </SegmentedControlItemVanilla>
      </SegmentedControlVanilla>,
    );

    expect(rootRef.current).toHaveAttribute('role', 'radiogroup');
    expect(itemRef.current?.nodeName).toBe('BUTTON');
  });

  it('applies className, style, css and HTML attributes', () => {
    renderWithTheme(
      <SegmentedControlVanilla
        aria-label="Mode"
        className="custom-root"
        style={{ opacity: 0.5 }}
        css={{ mt: '$2' }}
        data-testid="root"
      >
        <SegmentedControlItemVanilla value="a" className="custom-item" css={{ px: '$4' }}>
          A
        </SegmentedControlItemVanilla>
      </SegmentedControlVanilla>,
    );

    const root = screen.getByTestId('root');
    expect(root).toHaveClass('custom-root');
    expect(root).toHaveStyle({ opacity: '0.5', marginTop: '8px' });
    const item = screen.getByRole('radio', { name: 'A' });
    expect(item).toHaveClass('custom-item');
    expect(item).toHaveStyle({ paddingLeft: '20px', paddingRight: '20px' });
  });

  it('renders in the dark theme', () => {
    renderWithTheme(<Ranges />, { forcedTheme: 'dark', primaryColor: 'neon' });
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Ranges />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
