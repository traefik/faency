import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays, addMonths, addYears, startOfDay } from 'date-fns';
import { axe } from 'jest-axe';
import React, { createRef, useState } from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { DateTimePickerVanilla, DateTimePickerVanillaProps } from './DateTimePicker.vanilla';

const FOCUS_DATE = new Date(2026, 10, 19, 10, 0);

type PickerProps = Omit<DateTimePickerVanillaProps, 'onDatesChange' | 'selectedDates'> & {
  onDatesChange?: (d: Date[]) => void;
  selectedDates?: Date[];
};

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const Picker = React.forwardRef<HTMLDivElement, PickerProps>(
  ({ onDatesChange, selectedDates = [], ...props }, ref) => {
    const [dates, setDates] = useState<Date[]>(selectedDates);

    return (
      <DateTimePickerVanilla
        ref={ref}
        focusDate={FOCUS_DATE}
        calendar={{ startDay: 1 }}
        {...props}
        selectedDates={dates}
        onDatesChange={(d) => {
          setDates(d);
          onDatesChange?.(d);
        }}
      />
    );
  },
);

// Recipes are mocked in Jest, so the visible page is the one with the `visible` variant class.
const visiblePage = () => {
  const page = document.querySelector<HTMLElement>('[class~="visible-boolean-true"]');
  if (!page) throw new Error('No visible page');
  return within(page);
};

const sameMinute = (a: Date, b: Date) => Math.abs(a.getTime() - b.getTime()) < 60_000;

describe('DateTimePickerVanilla', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the day page with week days and day buttons', () => {
    renderWithTheme(<Picker />);

    const page = visiblePage();
    expect(page.getByRole('button', { name: 'November' })).toBeInTheDocument();
    expect(page.getByText('Mon')).toBeInTheDocument();
    expect(page.getAllByRole('button', { name: '19' }).length).toBeGreaterThan(0);
  });

  it('should render with custom className', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<Picker ref={ref} className="custom-picker" />);

    expect(ref.current).toHaveClass('custom-picker');
  });

  it('should apply custom styles via style prop', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<Picker ref={ref} style={{ backgroundColor: 'red', padding: '10px' }} />);

    expect(ref.current?.style.backgroundColor).toBe('red');
    expect(ref.current?.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<Picker ref={ref} css={{ padding: '$4', margin: '$2' }} />);

    expect(ref.current?.style.padding).toBe('20px');
    expect(ref.current?.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <Picker
        ref={ref}
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );

    expect(ref.current?.style.backgroundColor).toBe('blue');
    expect(ref.current?.style.padding).toBe('30px');
    expect(ref.current?.style.margin).toBe('8px');
  });

  it('should forward its ref to the root div', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<Picker ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass HTML attributes through', () => {
    renderWithTheme(<Picker data-testid="picker" aria-label="Pick a date" id="picker" />);

    const root = screen.getByTestId('picker');
    expect(root).toHaveAttribute('id', 'picker');
    expect(root).toHaveAttribute('aria-label', 'Pick a date');
  });

  it('should select a day', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(<Picker onDatesChange={onDatesChange} />);

    const [day] = screen.getAllByRole('button', { name: '20' });
    await userEvent.click(day);

    expect(onDatesChange).toHaveBeenCalledTimes(1);
    const [[selected]] = onDatesChange.mock.calls[0];
    expect(selected.getDate()).toBe(20);
    expect(selected.getMonth()).toBe(10);
  });

  it('should navigate between months', async () => {
    renderWithTheme(<Picker />);

    await userEvent.click(visiblePage().getByRole('button', { name: 'Next month' }));
    expect(visiblePage().getByRole('button', { name: 'December' })).toBeInTheDocument();

    await userEvent.click(visiblePage().getByRole('button', { name: 'Previous month' }));
    await userEvent.click(visiblePage().getByRole('button', { name: 'Previous month' }));
    expect(visiblePage().getByRole('button', { name: 'October' })).toBeInTheDocument();
  });

  it('should switch to the month page, pick a month and go back to the day page', async () => {
    renderWithTheme(<Picker />);

    await userEvent.click(visiblePage().getByRole('button', { name: 'November' }));
    expect(visiblePage().getByRole('button', { name: '2026' })).toBeInTheDocument();

    await userEvent.click(visiblePage().getByRole('button', { name: 'March' }));
    expect(visiblePage().getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
    expect(visiblePage().getByRole('button', { name: 'March' })).toBeInTheDocument();
  });

  it('should switch to the year page and pick a year', async () => {
    renderWithTheme(<Picker />);

    await userEvent.click(visiblePage().getByRole('button', { name: 'November' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '2026' }));
    expect(visiblePage().getByRole('button', { name: /^\d{4} - \d{4}$/ })).toBeInTheDocument();

    await userEvent.click(visiblePage().getByRole('button', { name: '2027' }));
    expect(visiblePage().getByRole('button', { name: 'November' })).toBeInTheDocument();
    expect(visiblePage().getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
  });

  it('should hide presets and the time picker by default', () => {
    renderWithTheme(<Picker />);

    expect(screen.queryByText('Time')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Now + 1 M' })).not.toBeInTheDocument();
  });

  it('should show the time picker and notify time clicks', async () => {
    const onTimeButtonClick = jest.fn();
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker
        showTimePicker
        onTimeButtonClick={onTimeButtonClick}
        onDatesChange={onDatesChange}
        selectedDates={[FOCUS_DATE]}
      />,
    );

    expect(screen.getByText('Time')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /^0?2:00/ }));

    expect(onTimeButtonClick).toHaveBeenCalledTimes(1);
    expect(onDatesChange).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['Now + 1 M', (d: Date) => addMonths(d, 1)],
    ['Now + 3 M', (d: Date) => addMonths(d, 3)],
    ['Now + 1 Y', (d: Date) => addYears(d, 1)],
  ])('should jump to %s with the date presets', async (label, expected) => {
    const onDatesChange = jest.fn();
    const onFastTravelClick = jest.fn();
    renderWithTheme(
      <Picker
        showDatePresets
        showTimePicker
        onDatesChange={onDatesChange}
        onFastTravelClick={onFastTravelClick}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: label }));

    expect(onFastTravelClick).toHaveBeenCalledTimes(1);
    const [[selected]] = onDatesChange.mock.calls[0];
    expect(sameMinute(selected, expected(new Date()))).toBe(true);
  });

  it('should move the calendar to the preset date', async () => {
    renderWithTheme(<Picker showDatePresets />);
    const target = addMonths(new Date(), 3);

    await userEvent.click(visiblePage().getByRole('button', { name: 'November' }));
    await userEvent.click(screen.getByRole('button', { name: 'Now + 3 M' }));

    const monthName = target.toLocaleString('en-US', { month: 'long' });
    expect(visiblePage().getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
    expect(visiblePage().getByRole('button', { name: monthName })).toBeInTheDocument();
    expect(
      visiblePage().getByRole('button', { name: String(target.getDate()), pressed: true }),
    ).toBeInTheDocument();
  });

  it('should let the time buttons change the date picked by a preset', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(<Picker showDatePresets showTimePicker onDatesChange={onDatesChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Now + 1 M' }));
    const [[preset]] = onDatesChange.mock.calls[0];
    const twoAm = screen.getByRole('button', { name: /^0?2:00/ });
    expect(twoAm).toBeEnabled();

    await userEvent.click(twoAm);

    const [[picked]] = onDatesChange.mock.calls[1];
    expect(picked.getHours()).toBe(2);
    expect(picked.toDateString()).toBe(preset.toDateString());
  });

  it('should let the time buttons change a day whose time was moved into the limits', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker showTimePicker onDatesChange={onDatesChange} time={{ minTime: { h: 9, m: 0 } }} />,
    );

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));
    await userEvent.click(screen.getByRole('button', { name: /^(0?10:00|10:00)/ }));

    const [[picked]] = onDatesChange.mock.calls[1];
    expect(picked).toEqual(new Date(2026, 10, 20, 10, 0));
  });

  it('should notify day clicks', async () => {
    const onDayButtonClick = jest.fn();
    renderWithTheme(<Picker onDayButtonClick={onDayButtonClick} />);

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));

    expect(onDayButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should select several days in multiple mode', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(<Picker dates={{ mode: 'multiple' }} onDatesChange={onDatesChange} />);

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '24' }));

    expect(onDatesChange).toHaveBeenLastCalledWith([
      new Date(2026, 10, 20),
      new Date(2026, 10, 24),
    ]);
    expect(visiblePage().getByRole('button', { name: '20' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(visiblePage().getByRole('button', { name: '24' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('should remove a day on a second click in multiple mode', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(<Picker dates={{ mode: 'multiple' }} onDatesChange={onDatesChange} />);

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '24' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));

    expect(onDatesChange).toHaveBeenLastCalledWith([new Date(2026, 10, 24)]);
    expect(visiblePage().getByRole('button', { name: '20' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('should keep a selected day on a second click when toggle is off', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker dates={{ mode: 'multiple', toggle: false }} onDatesChange={onDatesChange} />,
    );

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));

    expect(onDatesChange).toHaveBeenCalledTimes(1);
  });

  it('should select a range and mark the days inside it', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(<Picker dates={{ mode: 'range' }} onDatesChange={onDatesChange} />);

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '24' }));

    expect(onDatesChange).toHaveBeenLastCalledWith([
      new Date(2026, 10, 20),
      new Date(2026, 10, 24),
    ]);
    // Recipes are mocked in Jest: a day inside the range is a filled (non-ghost) secondary button.
    const inside = visiblePage().getByRole('button', { name: '22 in selected range' });
    expect(inside).toHaveClass('ghost-boolean-false', 'variant-string-secondary');
    expect(inside).toHaveAttribute('aria-pressed', 'false');
    const outside = visiblePage().getByRole('button', { name: '25' });
    expect(outside).toHaveClass('ghost-boolean-true');
  });

  it('should start a new range instead of crossing an excluded day', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker
        dates={{ mode: 'range' }}
        exclude={{ date: [new Date(2026, 10, 22)] }}
        onDatesChange={onDatesChange}
      />,
    );

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));
    await userEvent.click(visiblePage().getByRole('button', { name: '24' }));

    expect(onDatesChange).toHaveBeenLastCalledWith([new Date(2026, 10, 24)]);
  });

  it('should hide the presets in range mode', () => {
    renderWithTheme(<Picker dates={{ mode: 'range' }} showDatePresets showTimePicker />);

    expect(screen.queryByRole('button', { name: 'Now + 1 M' })).not.toBeInTheDocument();
  });

  it('should have no accessibility violations with a selected range', async () => {
    const { container } = renderWithTheme(
      <Picker
        dates={{ mode: 'range' }}
        selectedDates={[new Date(2026, 10, 20), new Date(2026, 10, 24)]}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should replace a multiple selection with the preset date', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker
        dates={{ mode: 'multiple' }}
        showDatePresets
        onDatesChange={onDatesChange}
        selectedDates={[new Date(2026, 10, 20), new Date(2026, 10, 24)]}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Now + 1 M' }));

    const [[dates]] = onDatesChange.mock.calls;
    expect(dates).toHaveLength(1);
  });

  it('should only show the yearly preset with the time picker', () => {
    renderWithTheme(<Picker showDatePresets />);

    expect(screen.getByRole('button', { name: 'Now + 3 M' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Now + 1 Y' })).not.toBeInTheDocument();
  });

  it('should keep disabled days out of the tab order', () => {
    renderWithTheme(<Picker dates={{ minDate: new Date(2026, 10, 15) }} />);

    const [disabledDay] = screen.getAllByRole('button', { name: '10' });
    const [enabledDay] = screen.getAllByRole('button', { name: '20' });

    expect(disabledDay).toBeDisabled();
    expect(disabledDay).not.toHaveAttribute('tabindex', '0');
    expect(enabledDay).toHaveAttribute('tabindex', '0');
  });

  it('should render in both calendar modes', () => {
    (['static', 'fluid'] as const).forEach((mode) => {
      const { container, unmount } = renderWithTheme(<Picker calendar={{ mode, startDay: 1 }} />);
      expect(container.innerHTML).toContain(`mode-string-${mode}`);
      unmount();
    });
  });

  it('should disable presets that fall outside the allowed dates', () => {
    renderWithTheme(
      <Picker
        showDatePresets
        showTimePicker
        dates={{ maxDate: addMonths(new Date(), 2) }}
        exclude={{ date: [addYears(new Date(), 1)] }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Now + 1 M' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Now + 3 M' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Now + 1 Y' })).toBeDisabled();
  });

  it('should treat a preset on the limit day like the day grid does', () => {
    renderWithTheme(
      <Picker showDatePresets dates={{ maxDate: startOfDay(addMonths(new Date(), 1)) }} />,
    );

    expect(screen.getByRole('button', { name: 'Now + 1 M' })).toBeEnabled();
  });

  it('should not select a preset that went out of range while the picker stayed open', async () => {
    jest.useFakeTimers({ now: new Date(2026, 10, 19, 10, 0) });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker
        showDatePresets
        onDatesChange={onDatesChange}
        dates={{ maxDate: new Date(2026, 11, 19, 12, 0) }}
      />,
    );

    jest.setSystemTime(addDays(new Date(2026, 10, 19, 10, 0), 1));
    await user.click(screen.getByRole('button', { name: 'Now + 1 M' }));

    expect(onDatesChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Now + 1 M' })).toBeDisabled();
  });

  it('should move preset times into the time limits', async () => {
    jest.useFakeTimers({ now: new Date(2026, 10, 19, 20, 30) });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDatesChange = jest.fn();
    renderWithTheme(
      <Picker
        showDatePresets
        onDatesChange={onDatesChange}
        time={{ minTime: { h: 9, m: 0 }, maxTime: { h: 18, m: 0 } }}
      />,
    );

    const preset = screen.getByRole('button', { name: 'Now + 1 M' });
    expect(preset).toBeEnabled();
    await user.click(preset);

    expect(onDatesChange).toHaveBeenLastCalledWith([new Date(2026, 11, 19, 18, 0)]);
  });

  it('should move a picked day into the time limits', async () => {
    const onDatesChange = jest.fn();
    renderWithTheme(<Picker onDatesChange={onDatesChange} time={{ minTime: { h: 9, m: 0 } }} />);

    await userEvent.click(visiblePage().getByRole('button', { name: '20' }));

    const [[picked]] = onDatesChange.mock.calls[0];
    expect(picked.getHours() * 60 + picked.getMinutes()).toBeGreaterThanOrEqual(9 * 60);
  });

  it('should use custom navigation labels', () => {
    renderWithTheme(<Picker labels={{ previousMonth: 'Go to previous month' }} />);

    expect(visiblePage().getByRole('button', { name: 'Go to previous month' })).toBeInTheDocument();
    expect(visiblePage().getByRole('button', { name: 'Next month' })).toBeInTheDocument();
  });

  it('should mark the selected cell as pressed', () => {
    renderWithTheme(<Picker selectedDates={[FOCUS_DATE]} />);

    const [selected] = visiblePage().getAllByRole('button', { name: '19' });
    expect(selected).toHaveAttribute('aria-pressed', 'true');
    expect(selected).not.toHaveAttribute('aria-selected');
    expect(visiblePage().getByRole('button', { name: '20' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('should have no accessibility violations with a selected date', async () => {
    const { container } = renderWithTheme(<Picker showTimePicker selectedDates={[FOCUS_DATE]} />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<Picker showDatePresets showTimePicker />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render in light and dark themes with different primary colors', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      (['neon', 'blue', 'orange'] as const).forEach((primaryColor) => {
        const { unmount } = render(
          <VanillaExtractThemeProvider forcedTheme={theme} primaryColor={primaryColor}>
            <Picker />
          </VanillaExtractThemeProvider>,
        );
        expect(visiblePage().getByRole('button', { name: 'November' })).toBeInTheDocument();
        unmount();
      });
    });
  });
});
