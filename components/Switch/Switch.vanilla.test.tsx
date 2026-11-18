import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { FieldVanilla } from '@/components/Field/Field.vanilla';

import { SwitchVanilla } from './Switch.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

describe('SwitchVanilla', () => {
  it('should render an unchecked switch button with a thumb', () => {
    renderWithTheme(<SwitchVanilla aria-label="Notifications" />);

    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control.tagName).toBe('BUTTON');
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(control).toHaveAttribute('data-state', 'unchecked');
    expect(control.querySelector('span[data-state="unchecked"]')).not.toBeNull();
  });

  it('should accept both sizes', () => {
    (['1', '2'] as const).forEach((size) => {
      const { unmount } = renderWithTheme(<SwitchVanilla aria-label="Size" size={size} />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
      unmount();
    });
  });

  it('should render with custom className', () => {
    renderWithTheme(<SwitchVanilla aria-label="Styled" className="custom-switch" />);

    expect(screen.getByRole('switch').className).toContain('custom-switch');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(
      <SwitchVanilla aria-label="Styled" style={{ backgroundColor: 'red', padding: '10px' }} />,
    );

    const control = screen.getByRole('switch');
    expect(control.style.backgroundColor).toBe('red');
    expect(control.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(<SwitchVanilla aria-label="Styled" css={{ padding: '$4', margin: '$2' }} />);

    const control = screen.getByRole('switch');
    expect(control.style.padding).toBe('20px');
    expect(control.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <SwitchVanilla
        aria-label="Styled"
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );

    const control = screen.getByRole('switch');
    expect(control.style.backgroundColor).toBe('blue');
    expect(control.style.padding).toBe('30px');
    expect(control.style.margin).toBe('8px');
  });

  it('should forward its ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(<SwitchVanilla ref={ref} aria-label="Ref" />);

    expect(ref.current).toBe(screen.getByRole('switch'));
  });

  it('should pass HTML attributes through', () => {
    renderWithTheme(<SwitchVanilla aria-label="Attrs" data-testid="switch" title="Toggle" />);

    expect(screen.getByTestId('switch')).toHaveAttribute('title', 'Toggle');
  });

  it('should toggle on click and with the keyboard when uncontrolled', async () => {
    const onCheckedChange = jest.fn();
    renderWithTheme(<SwitchVanilla aria-label="Toggle" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch');
    await userEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);

    await userEvent.keyboard(' ');
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it('should work as a controlled standalone toggle', async () => {
    const Controlled = () => {
      const [checked, setChecked] = React.useState(true);
      return (
        <SwitchVanilla aria-label="Dark mode" checked={checked} onCheckedChange={setChecked} />
      );
    };
    renderWithTheme(<Controlled />);

    const control = screen.getByRole('switch', { name: 'Dark mode' });
    expect(control).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'false');
  });

  it('should be disabled and not toggle', async () => {
    const onCheckedChange = jest.fn();
    renderWithTheme(
      <SwitchVanilla aria-label="Disabled" disabled onCheckedChange={onCheckedChange} />,
    );

    const control = screen.getByRole('switch');
    expect(control).toBeDisabled();
    await userEvent.click(control);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('should mark itself invalid', () => {
    renderWithTheme(<SwitchVanilla aria-label="Invalid" aria-invalid />);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should take its label, description, invalid and disabled states from FieldVanilla', () => {
    const { rerender } = renderWithTheme(
      <FieldVanilla label="Notifications" description="Sent by email." invalid>
        <SwitchVanilla />
      </FieldVanilla>,
    );

    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control).toHaveAccessibleDescription(/Sent by email\./);
    expect(control).toHaveAttribute('aria-invalid', 'true');

    rerender(
      <VanillaExtractThemeProvider>
        <FieldVanilla label="Notifications" disabled>
          <SwitchVanilla />
        </FieldVanilla>
      </VanillaExtractThemeProvider>,
    );
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Notifications" labelPosition="end">
        <SwitchVanilla defaultChecked />
      </FieldVanilla>,
    );
    // Lets the Field clear its announced error, which it does after a timeout.
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('polymorphic rendering', () => {
    it('should render as a read-only indicator with the `as` prop', async () => {
      renderWithTheme(<SwitchVanilla as="span" aria-label="Status" checked />);

      const indicator = screen.getByRole('switch', { name: 'Status' });
      expect(indicator.tagName).toBe('SPAN');
      expect(indicator).toHaveAttribute('aria-checked', 'true');
      expect(indicator).toHaveAttribute('aria-readonly', 'true');
      expect(indicator).toHaveAttribute('data-state', 'checked');
      expect(indicator).not.toHaveAttribute('tabindex');

      await userEvent.click(indicator);
      expect(indicator).toHaveAttribute('aria-checked', 'true');
    });

    it('should show defaultChecked and be unchecked by default', () => {
      const { unmount } = renderWithTheme(
        <SwitchVanilla as="span" aria-label="On" defaultChecked />,
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
      unmount();

      renderWithTheme(<SwitchVanilla as="span" aria-label="Off" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('should mark itself disabled and keep Radix props off the DOM', () => {
      renderWithTheme(
        <SwitchVanilla as="div" aria-label="Status" disabled onCheckedChange={jest.fn()} />,
      );

      const indicator = screen.getByRole('switch');
      expect(indicator.tagName).toBe('DIV');
      expect(indicator).toHaveAttribute('aria-disabled', 'true');
      expect(indicator).toHaveAttribute('data-disabled');
      expect(indicator).not.toHaveAttribute('oncheckedchange');
    });

    it('should forward its ref to the custom element', () => {
      const ref = createRef<HTMLSpanElement>();
      renderWithTheme(<SwitchVanilla as="span" ref={ref} aria-label="Status" />);

      expect(ref.current).toBe(screen.getByRole('switch'));
    });

    it('should take its name from FieldVanilla through aria-labelledby', () => {
      renderWithTheme(
        <FieldVanilla label="Maintenance mode" labelPosition="end">
          <SwitchVanilla as="span" checked />
        </FieldVanilla>,
      );

      expect(screen.getByRole('switch', { name: 'Maintenance mode' })).toHaveAttribute(
        'aria-labelledby',
      );
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderWithTheme(
        <FieldVanilla label="Maintenance mode" labelPosition="end">
          <SwitchVanilla as="span" checked />
        </FieldVanilla>,
      );
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('should work with light theme', () => {
    render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <SwitchVanilla aria-label="Light" />
      </VanillaExtractThemeProvider>,
    );

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <SwitchVanilla aria-label="Dark" />
      </VanillaExtractThemeProvider>,
    );

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should work with other primary colors', () => {
    const themes = [
      { defaultTheme: 'light', primaryColor: 'neon' },
      { defaultTheme: 'dark', primaryColor: 'orange' },
    ] as const;
    themes.forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider {...theme}>
          <SwitchVanilla aria-label="Themed" defaultChecked />
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
      unmount();
    });
  });
});
