import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { FieldVanilla } from '@/components/Field/Field.vanilla';

import {
  SelectGroupVanilla,
  SelectItemVanilla,
  SelectLabelVanilla,
  SelectSeparatorVanilla,
  SelectVanilla,
  SelectVanillaProps,
} from './Select.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const Types = (props: Partial<SelectVanillaProps>) => (
  <SelectVanilla aria-label="Type" placeholder="Pick a type" {...props}>
    <SelectItemVanilla value="http">HTTP</SelectItemVanilla>
    <SelectItemVanilla value="grpc" description="Over HTTP/2">
      gRPC <span data-testid="badge">beta</span>
    </SelectItemVanilla>
    <SelectItemVanilla value="tcp">TCP</SelectItemVanilla>
    <SelectItemVanilla value="udp" disabled>
      UDP
    </SelectItemVanilla>
  </SelectVanilla>
);

const open = async () => {
  await userEvent.click(screen.getByRole('combobox'));
  return screen.getByRole('listbox');
};

describe('SelectVanilla', () => {
  const { scrollIntoView, hasPointerCapture, releasePointerCapture } = Element.prototype;

  beforeAll(() => {
    // jsdom lacks these, and Radix Select calls them while opening.
    Element.prototype.scrollIntoView = () => {};
    Element.prototype.hasPointerCapture = () => false;
    Element.prototype.releasePointerCapture = () => {};
  });

  afterAll(() => {
    Object.assign(Element.prototype, {
      scrollIntoView,
      hasPointerCapture,
      releasePointerCapture,
    });
  });

  it('should render a closed combobox button with the placeholder', () => {
    renderWithTheme(<Types />);

    const trigger = screen.getByRole('combobox', { name: 'Type' });
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveTextContent('Pick a type');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should accept every variant', () => {
    const variants = [
      { size: 'small' },
      { size: 'medium' },
      { size: 'large' },
      { variant: 'ghost' },
      { state: 'invalid' },
    ] as const;
    variants.forEach((props) => {
      const { unmount } = renderWithTheme(<Types {...props} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      unmount();
    });
  });

  it('should merge a custom className on the trigger', () => {
    renderWithTheme(<Types className="custom" />);

    expect(screen.getByRole('combobox')).toHaveClass('custom');
  });

  it('should apply custom styles via style prop', () => {
    renderWithTheme(<Types style={{ backgroundColor: 'red', padding: '10px' }} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger.style.backgroundColor).toBe('red');
    expect(trigger.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    renderWithTheme(<Types css={{ padding: '$4', margin: '$2' }} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger.style.padding).toBe('20px');
    expect(trigger.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    renderWithTheme(
      <Types
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger.style.backgroundColor).toBe('blue');
    expect(trigger.style.padding).toBe('30px');
    expect(trigger.style.margin).toBe('8px');
  });

  it('should forward its ref to the trigger', () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(
      <SelectVanilla ref={ref} aria-label="Type">
        <SelectItemVanilla value="http">HTTP</SelectItemVanilla>
      </SelectVanilla>,
    );

    expect(ref.current).toBe(screen.getByRole('combobox'));
  });

  it('should pass HTML attributes to the trigger', () => {
    renderWithTheme(<Types data-testid="trigger" title="Route type" />);

    expect(screen.getByTestId('trigger')).toHaveAttribute('title', 'Route type');
  });

  it('should open on click and choose an option', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(<Types onValueChange={onValueChange} />);

    const listbox = await open();
    expect(within(listbox).getAllByRole('option')).toHaveLength(4);
    await userEvent.click(within(listbox).getByRole('option', { name: 'TCP' }));

    expect(onValueChange).toHaveBeenCalledWith('tcp');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveTextContent('TCP');
  });

  it('should open and choose with the keyboard', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(<Types onValueChange={onValueChange} />);

    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onValueChange).toHaveBeenCalledWith('grpc');
  });

  it('should choose an option by typing its first letters on the closed trigger', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(<Types onValueChange={onValueChange} />);

    screen.getByRole('combobox').focus();
    await userEvent.keyboard('t');

    expect(onValueChange).toHaveBeenCalledWith('tcp');
  });

  it('should show the rich content of the chosen item on the trigger, without its description', () => {
    renderWithTheme(<Types value="grpc" />);

    const trigger = screen.getByRole('combobox');
    expect(within(trigger).getByTestId('badge').closest('.selectValue')).not.toBeNull();
    expect(trigger).not.toHaveTextContent('Over HTTP/2');
  });

  it('should show the descriptions and mark the disabled items in the list', async () => {
    renderWithTheme(<Types value="grpc" />);

    const listbox = await open();
    expect(within(listbox).getByText('Over HTTP/2')).toBeInTheDocument();
    expect(within(listbox).getByRole('option', { name: 'UDP' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(within(listbox).getByRole('option', { name: /gRPC/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('should render groups named by their label, and separators', async () => {
    renderWithTheme(
      <SelectVanilla aria-label="Entry point">
        <SelectGroupVanilla data-testid="group" css={{ p: '$1' }}>
          <SelectLabelVanilla className="custom-label">Public</SelectLabelVanilla>
          <SelectItemVanilla value="web" className="custom-item">
            web
          </SelectItemVanilla>
        </SelectGroupVanilla>
        <SelectSeparatorVanilla data-testid="separator" />
        <SelectItemVanilla value="metrics">metrics</SelectItemVanilla>
      </SelectVanilla>,
    );

    const listbox = await open();
    const group = within(listbox).getByRole('group', { name: 'Public' });
    expect(group.style.padding).not.toBe('');
    expect(within(group).getByText('Public')).toHaveClass('custom-label');
    expect(within(group).getByRole('option', { name: 'web' })).toHaveClass('custom-item');
    expect(within(listbox).getByTestId('separator')).toBeInTheDocument();
  });

  it('should not take the native onChange, which would never fire', () => {
    // @ts-expect-error use onValueChange instead
    const element = <Types onChange={() => {}} />;

    expect(element).toBeDefined();
  });

  it('should not call onBlur when focus moves into the open list', async () => {
    const onBlur = jest.fn();
    renderWithTheme(<Types onBlur={onBlur} />);

    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(onBlur).not.toHaveBeenCalled();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(onBlur).not.toHaveBeenCalled();

    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should apply its direction to the trigger and the list', async () => {
    renderWithTheme(<Types dir="rtl" />);

    expect(screen.getByRole('combobox')).toHaveAttribute('dir', 'rtl');
    const listbox = await open();
    expect(listbox.closest('[dir="rtl"]')).not.toBeNull();
  });

  it('should be disabled', () => {
    renderWithTheme(<Types disabled />);

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should take its label, description, invalid and disabled states from FieldVanilla', () => {
    const { rerender } = renderWithTheme(
      <FieldVanilla label="Type" description="How requests are routed." invalid>
        <SelectVanilla>
          <SelectItemVanilla value="http">HTTP</SelectItemVanilla>
        </SelectVanilla>
      </FieldVanilla>,
    );

    const trigger = screen.getByRole('combobox', { name: 'Type' });
    expect(trigger).toHaveAccessibleDescription(/How requests are routed\./);
    expect(trigger).toHaveAttribute('aria-invalid', 'true');

    rerender(
      <VanillaExtractThemeProvider>
        <FieldVanilla label="Type" disabled>
          <SelectVanilla>
            <SelectItemVanilla value="http">HTTP</SelectItemVanilla>
          </SelectVanilla>
        </FieldVanilla>
      </VanillaExtractThemeProvider>,
    );
    expect(screen.getByRole('combobox', { name: 'Type' })).toBeDisabled();
  });

  it('should submit its value in a form', () => {
    const { container } = renderWithTheme(
      <form>
        <Types name="type" defaultValue="tcp" required />
      </form>,
    );

    const formData = new FormData(container.querySelector('form') as HTMLFormElement);
    expect(formData.get('type')).toBe('tcp');
  });

  it('should have no accessibility violations, closed and open', async () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Type">
        <Types aria-label={undefined} />
      </FieldVanilla>,
    );
    // Lets the Field clear its announced error, which it does after a timeout.
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(await axe(container)).toHaveNoViolations();

    await open();
    // The open list is portalled to the body, outside the landmarks of a page the test does not have.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });

  it('should render in the light and dark themes and with other primary colors', () => {
    const themes = [
      { defaultTheme: 'light', primaryColor: 'blue' },
      { defaultTheme: 'dark', primaryColor: 'neon' },
      { defaultTheme: 'dark', primaryColor: 'orange' },
    ] as const;
    themes.forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider {...theme}>
          <Types value="http" />
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('combobox')).toHaveTextContent('HTTP');
      unmount();
    });
  });
});
