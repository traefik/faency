import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { FieldVanilla } from '@/components/Field/Field.vanilla';

import { DateTimePickerInputVanilla } from './DateTimePickerInput.vanilla';

// autoUpdate keeps jsdom busy for ~30s per open; positioning is not under test.
jest.mock('@floating-ui/react', () => ({
  ...jest.requireActual('@floating-ui/react'),
  autoUpdate: () => () => {},
}));

const FOCUS_DATE = new Date(2026, 10, 19, 10, 0);

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const getInput = (container: HTMLElement) =>
  container.querySelector('input[type="datetime-local"]') as HTMLInputElement;

describe('DateTimePickerInputVanilla', () => {
  it('should render a datetime-local input with a calendar adornment', () => {
    const { container } = renderWithTheme(<DateTimePickerInputVanilla />);

    const input = getInput(container);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<DateTimePickerInputVanilla ref={ref} className="custom-picker-input" />);

    expect(ref.current).toHaveClass('custom-picker-input');
  });

  it('should apply custom styles via style prop', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <DateTimePickerInputVanilla ref={ref} style={{ backgroundColor: 'red', padding: '10px' }} />,
    );

    expect(ref.current?.style.backgroundColor).toBe('red');
    expect(ref.current?.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<DateTimePickerInputVanilla ref={ref} css={{ padding: '$4', margin: '$2' }} />);

    expect(ref.current?.style.padding).toBe('20px');
    expect(ref.current?.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <DateTimePickerInputVanilla
        ref={ref}
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );

    expect(ref.current?.style.backgroundColor).toBe('blue');
    expect(ref.current?.style.padding).toBe('30px');
    expect(ref.current?.style.margin).toBe('8px');
  });

  it('should apply inputCSS and inputProps to the input', () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        inputCSS={{ width: '100%', margin: '$2' }}
        inputProps={{ name: 'start', className: 'custom-input', placeholder: 'Start' }}
      />,
    );

    const input = getInput(container);
    expect(input).toHaveAttribute('name', 'start');
    expect(input).toHaveAttribute('placeholder', 'Start');

    const inputWrapper = input.parentElement as HTMLElement;
    expect(inputWrapper).toHaveClass('custom-input');
    expect(inputWrapper.style.width).toBe('100%');
    expect(inputWrapper.style.margin).toBe('8px');
  });

  it('should forward its ref to the wrapper div', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderWithTheme(<DateTimePickerInputVanilla ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toContainElement(getInput(container));
  });

  it('should pass HTML attributes through', () => {
    renderWithTheme(<DateTimePickerInputVanilla data-testid="picker-input" id="picker-input" />);

    expect(screen.getByTestId('picker-input')).toHaveAttribute('id', 'picker-input');
  });

  it('should parse typed dates and call onChange', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<DateTimePickerInputVanilla onChange={onChange} />);

    fireEvent.change(getInput(container), { target: { value: '2026-11-20T14:30' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [[date]] = onChange.mock.calls[0];
    expect(date).toEqual(new Date(2026, 10, 20, 14, 30));
  });

  it('should emit no dates when the input is cleared or incomplete', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<DateTimePickerInputVanilla onChange={onChange} />);

    fireEvent.change(getInput(container), { target: { value: '2026-11-20T14:30' } });
    fireEvent.change(getInput(container), { target: { value: '' } });

    expect(onChange).toHaveBeenLastCalledWith([], { rejected: false });
  });

  it('should keep opening the picker when inputProps has its own onClick', async () => {
    const onClick = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla focusDate={FOCUS_DATE} inputProps={{ onClick }} />,
    );

    await userEvent.click(getInput(container));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('should open from the Firefox patch without calling the input onClick', async () => {
    const onClick = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla focusDate={FOCUS_DATE} inputProps={{ onClick }} />,
    );

    const patch = getInput(container).parentElement?.nextElementSibling as HTMLElement;
    await userEvent.click(patch);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should ignore typed dates outside the allowed range and expose min and max', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        onChange={onChange}
        dates={{ minDate: new Date(2026, 10, 19, 12, 0), maxDate: new Date(2026, 11, 31) }}
        exclude={{ date: [new Date(2026, 10, 25)] }}
      />,
    );
    const input = getInput(container);

    expect(input).toHaveAttribute('min', '2026-11-20T00:00');
    expect(input).toHaveAttribute('max', '2026-12-31T23:59');

    fireEvent.change(input, { target: { value: '2026-11-19T15:00' } });
    expect(onChange).toHaveBeenLastCalledWith([], { rejected: true });
    fireEvent.change(input, { target: { value: '2026-11-25T15:00' } });
    expect(onChange).toHaveBeenLastCalledWith([], { rejected: true });
    fireEvent.change(input, { target: { value: '2026-11-26T15:00' } });
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 10, 26, 15, 0)], {
      rejected: false,
    });
  });

  it('should keep min and max from inputProps when dates has no limits', () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        inputProps={{ min: '2026-01-01T00:00', max: '2026-12-31T23:59' }}
      />,
    );

    expect(getInput(container)).toHaveAttribute('min', '2026-01-01T00:00');
    expect(getInput(container)).toHaveAttribute('max', '2026-12-31T23:59');
  });

  it('should ignore typed times outside the time limits', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        onChange={onChange}
        time={{ minTime: { h: 9, m: 0 }, maxTime: { h: 17, m: 0 } }}
      />,
    );

    fireEvent.change(getInput(container), { target: { value: '2026-11-26T03:00' } });
    expect(onChange).toHaveBeenLastCalledWith([], { rejected: true });
    fireEvent.change(getInput(container), { target: { value: '2026-11-26T17:00' } });
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 10, 26, 17, 0)], { rejected: false });
  });

  it('should close the picker when the Firefox patch is pressed while open', async () => {
    const { container } = renderWithTheme(<DateTimePickerInputVanilla focusDate={FOCUS_DATE} />);
    const patch = getInput(container).parentElement?.nextElementSibling as HTMLElement;

    await userEvent.click(patch);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await userEvent.click(patch);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('should label the popup and the picker with custom labels', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        focusDate={FOCUS_DATE}
        labels={{ dialog: 'Pick a start date', nextMonth: 'Go to next month' }}
      />,
    );

    await userEvent.click(getInput(container));

    expect(await screen.findByRole('dialog', { name: 'Pick a start date' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to next month' })).toBeInTheDocument();
  });

  it('should not accept a dates mode', () => {
    // @ts-expect-error the input holds a single date
    renderWithTheme(<DateTimePickerInputVanilla dates={{ mode: 'range' }} />);
  });

  it('should open the picker when the input is clicked', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla focusDate={FOCUS_DATE} calendar={{ startDay: 1 }} />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(getInput(container));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
  });

  it('should fill the input when a day is picked', async () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        focusDate={FOCUS_DATE}
        calendar={{ startDay: 1 }}
        onChange={onChange}
      />,
    );

    await userEvent.click(getInput(container));
    const [day] = await screen.findAllByRole('button', { name: '20' });
    await userEvent.click(day);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(getInput(container).value).toMatch(/^2026-11-20T\d{2}:\d{2}$/);
  });

  it('should accept a picked day with a time inside the time limits', async () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        focusDate={FOCUS_DATE}
        calendar={{ startDay: 1 }}
        onChange={onChange}
        time={{ minTime: { h: 9, m: 0 } }}
      />,
    );

    await userEvent.click(getInput(container));
    const [day] = await screen.findAllByRole('button', { name: '20' });
    await userEvent.click(day);

    const [[[picked], details]] = onChange.mock.calls;
    expect(picked.getHours()).toBeGreaterThanOrEqual(9);
    expect(details).toEqual({ rejected: false });

    const pickedValue = getInput(container).value;
    fireEvent.change(getInput(container), { target: { value: '' } });
    fireEvent.change(getInput(container), { target: { value: pickedValue } });
    expect(onChange).toHaveBeenLastCalledWith([picked], { rejected: false });
  });

  it('should let the time buttons change a typed date', async () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla showTimePicker onChange={onChange} />,
    );

    fireEvent.change(getInput(container), { target: { value: '2026-11-26T15:00' } });
    await userEvent.click(getInput(container));
    await userEvent.click(await screen.findByRole('button', { name: /^0?2:00/ }));

    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 10, 26, 2, 0)], {
      rejected: false,
    });
  });

  it('should close the picker when a day is picked and there is no time to pick', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla focusDate={FOCUS_DATE} calendar={{ startDay: 1 }} />,
    );

    await userEvent.click(getInput(container));
    const [day] = await screen.findAllByRole('button', { name: '20' });
    await userEvent.click(day);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('should keep the picker open after a day when a time is still to pick', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        focusDate={FOCUS_DATE}
        calendar={{ startDay: 1 }}
        showTimePicker
      />,
    );

    await userEvent.click(getInput(container));
    const [day] = await screen.findAllByRole('button', { name: '20' });
    await userEvent.click(day);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close the picker after a date preset', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla showDatePresets focusDate={FOCUS_DATE} />,
    );

    await userEvent.click(getInput(container));
    await userEvent.click(await screen.findByRole('button', { name: 'Now + 1 M' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(getInput(container).value).not.toBe('');
  });

  it('should close the picker on Escape', async () => {
    const { container } = renderWithTheme(<DateTimePickerInputVanilla focusDate={FOCUS_DATE} />);

    await userEvent.click(getInput(container));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('should take its label, description and error from FieldVanilla', () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Start date" description="When it starts" error="Required">
        <DateTimePickerInputVanilla />
      </FieldVanilla>,
    );

    const input = getInput(container);
    expect(screen.getByLabelText('Start date')).toBe(input);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription(expect.stringContaining('When it starts'));
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla inputProps={{ 'aria-label': 'Start date' }} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should have no accessibility violations with the picker open', async () => {
    const { container } = renderWithTheme(
      <DateTimePickerInputVanilla
        inputProps={{ 'aria-label': 'Start date' }}
        focusDate={FOCUS_DATE}
        showDatePresets
        showTimePicker
      />,
    );

    await userEvent.click(getInput(container));
    await screen.findByRole('dialog');

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render in light and dark themes with different primary colors', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      (['neon', 'blue', 'orange'] as const).forEach((primaryColor) => {
        const { container, unmount } = render(
          <VanillaExtractThemeProvider forcedTheme={theme} primaryColor={primaryColor}>
            <DateTimePickerInputVanilla />
          </VanillaExtractThemeProvider>,
        );
        expect(getInput(container)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
