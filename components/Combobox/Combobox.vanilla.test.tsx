import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { InputVanillaHandle } from '../Input';
import { ComboboxVanilla, ComboboxVanillaProps } from './Combobox.vanilla';

const renderWithTheme = (
  ui: React.ReactElement,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => render(<VanillaExtractThemeProvider {...themeProps}>{ui}</VanillaExtractThemeProvider>);

const SERVICES = ['whoami', 'api-gateway', 'auth-service'];

const Services = (props: Partial<ComboboxVanillaProps>) => (
  <ComboboxVanilla aria-label="Service" suggestions={SERVICES} {...props} />
);

const Controlled = (props: Partial<ComboboxVanillaProps>) => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <Services {...props} value={value} onValueChange={setValue} />
      <output>{value}</output>
    </>
  );
};

const optionNames = () => screen.getAllByRole('option').map((option) => option.textContent);

describe('ComboboxVanilla', () => {
  const { ResizeObserver } = window;
  const { matches } = Element.prototype;

  beforeAll(() => {
    // The shared mock calls back inside observe(), which floating-ui answers by observing again.
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    // nwsapi 2.2.27 recurses without end on these pseudo-classes, which floating-ui queries.
    Element.prototype.matches = function (this: Element, selector: string) {
      return /:(modal|popover-open|fullscreen)\b/.test(selector)
        ? false
        : matches.call(this, selector);
    };
  });

  afterAll(() => {
    window.ResizeObserver = ResizeObserver;
    Element.prototype.matches = matches;
  });

  it('renders a closed combobox', () => {
    renderWithTheme(<Services />);

    const input = screen.getByRole('combobox', { name: 'Service' });
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('lists every suggestion on focus', async () => {
    renderWithTheme(<Services />);

    await userEvent.click(screen.getByRole('combobox'));

    const input = screen.getByRole('combobox');
    const listbox = screen.getByRole('listbox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(optionNames()).toEqual(SERVICES);
  });

  it('lists duplicate suggestions without key warnings', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderWithTheme(<Services suggestions={['whoami', 'whoami']} />);

    await userEvent.click(screen.getByRole('combobox'));

    expect(optionNames()).toEqual(['whoami', 'whoami']);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('does not open on focus when openOnFocus is false', async () => {
    renderWithTheme(<Services openOnFocus={false} />);

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters the suggestions while typing and keeps free text', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(<Services onValueChange={onValueChange} />);

    await userEvent.type(screen.getByRole('combobox'), 'AUTH');

    expect(optionNames()).toEqual(['auth-service']);
    expect(onValueChange).toHaveBeenLastCalledWith('AUTH');
    expect(screen.getByRole('combobox')).toHaveValue('AUTH');
  });

  it('closes the list when nothing matches', async () => {
    renderWithTheme(<Services />);

    await userEvent.type(screen.getByRole('combobox'), 'zzz');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('accepts a custom filter', async () => {
    renderWithTheme(<Services filter={(suggestion, query) => suggestion.startsWith(query)} />);

    await userEvent.type(screen.getByRole('combobox'), 'a');

    expect(optionNames()).toEqual(['api-gateway', 'auth-service']);
  });

  it('chooses a suggestion on click', async () => {
    renderWithTheme(<Controlled />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'api-gateway' }));

    expect(screen.getByRole('combobox')).toHaveValue('api-gateway');
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent('api-gateway');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('moves through the suggestions with the arrow keys and chooses with Enter', async () => {
    renderWithTheme(<Controlled openOnFocus={false} />);
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', screen.getAllByRole('option')[0].id);
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowUp}');
    const last = screen.getByRole('option', { name: 'auth-service' });
    expect(input).toHaveAttribute('aria-activedescendant', last.id);

    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', screen.getAllByRole('option')[0].id);

    await userEvent.keyboard('{Enter}');
    expect(input).toHaveValue('whoami');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('opens on the last suggestion with ArrowUp', async () => {
    renderWithTheme(<Services openOnFocus={false} />);
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowUp}');

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'auth-service' }).id,
    );
  });

  it('closes with Escape and on blur without changing the value', async () => {
    const onValueChange = jest.fn();
    renderWithTheme(
      <>
        <Services onValueChange={onValueChange} />
        <button type="button">Next</button>
      </>,
    );

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows the empty text only when there are no suggestions', async () => {
    const { unmount } = renderWithTheme(
      <Services suggestions={[]} emptyText="No service in namespace default" />,
    );

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('status')).toHaveTextContent('No service in namespace default');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    unmount();

    renderWithTheme(<Services emptyText="No service" />);
    await userEvent.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.queryByText('No service')).not.toBeInTheDocument();
  });

  it('works uncontrolled with a default value', async () => {
    renderWithTheme(<Services defaultValue="whoami" />);
    const input = screen.getByRole('combobox');

    expect(input).toHaveValue('whoami');
    await userEvent.click(input);
    await userEvent.click(screen.getByRole('option', { name: 'auth-service' }));
    expect(input).toHaveValue('auth-service');
  });

  it('does not open when disabled or read-only', async () => {
    const { unmount } = renderWithTheme(<Services disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    unmount();

    renderWithTheme(<Services readOnly />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('names the listbox after the combobox', async () => {
    const { unmount } = renderWithTheme(<Services />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox', { name: 'Service' })).toBeInTheDocument();
    unmount();

    renderWithTheme(
      <>
        <span id="label">Namespace</span>
        <ComboboxVanilla aria-labelledby="label" suggestions={['default']} />
      </>,
    );
    await userEvent.click(screen.getByRole('combobox', { name: 'Namespace' }));
    expect(screen.getByRole('listbox', { name: 'Namespace' })).toBeInTheDocument();
  });

  it('submits the typed text with a form', async () => {
    renderWithTheme(
      <form data-testid="form">
        <Services name="service" />
      </form>,
    );

    await userEvent.type(screen.getByRole('combobox'), 'custom');
    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('service')).toBe('custom');
  });

  it('renders every size', async () => {
    for (const size of ['small', 'medium', 'large'] as const) {
      const { unmount } = renderWithTheme(<Services size={size} />);
      await userEvent.click(screen.getByRole('combobox'));
      expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(3);
      unmount();
    }
  });

  it('forwards the ref to the input', () => {
    const ref = createRef<InputVanillaHandle>();
    renderWithTheme(<ComboboxVanilla ref={ref} aria-label="Service" suggestions={SERVICES} />);
    expect(ref.current).toBe(screen.getByRole('combobox'));
  });

  it('applies className, style, css and HTML attributes', () => {
    const { container } = renderWithTheme(
      <Services
        className="custom"
        style={{ opacity: 0.5 }}
        css={{ mt: '$2' }}
        placeholder="my-service"
        data-testid="input"
      />,
    );

    const root = container.querySelector('.custom');
    expect(root).toHaveStyle({ opacity: '0.5', marginTop: '8px' });
    expect(screen.getByTestId('input')).toHaveAttribute('placeholder', 'my-service');
  });

  it('calls the focus, blur and keydown handlers it is given', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onKeyDown = jest.fn((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') e.preventDefault();
    });
    renderWithTheme(
      <>
        <Services onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} openOnFocus={false} />
        <button type="button">Next</button>
      </>,
    );

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    expect(onKeyDown).toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await userEvent.tab();
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders in the dark theme', async () => {
    renderWithTheme(<Services />, { forcedTheme: 'dark', primaryColor: 'neon' });
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('has no accessibility violations, closed and open', async () => {
    const { container } = renderWithTheme(
      <>
        <label htmlFor="service">Service</label>
        <ComboboxVanilla id="service" suggestions={SERVICES} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    // The open list is portalled to the body, outside any landmark of the test page.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
