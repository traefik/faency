import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addMonths, addYears } from 'date-fns';
import { axe } from 'jest-axe';
import React, { useState } from 'react';

import { DateTimePicker } from './DateTimePicker';

const FOCUS_DATE = new Date(2026, 10, 19, 10, 0);

describe('DateTimePicker', () => {
  it('should mark the selected cell as pressed', () => {
    render(
      <DateTimePicker
        focusDate={FOCUS_DATE}
        selectedDates={[FOCUS_DATE]}
        onDatesChange={() => {}}
      />,
    );

    const selected = screen.getAllByRole('button', { name: '19' })[0];
    expect(selected).toHaveAttribute('aria-pressed', 'true');
    expect(selected).not.toHaveAttribute('aria-selected');
  });

  it('should have no accessibility violations with a selected date', async () => {
    const { container } = render(
      <DateTimePicker
        focusDate={FOCUS_DATE}
        selectedDates={[FOCUS_DATE]}
        onDatesChange={() => {}}
        showTimePicker
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should disable presets that fall outside the allowed dates', () => {
    render(
      <DateTimePicker
        selectedDates={[]}
        onDatesChange={() => {}}
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

  it('should move the calendar to the preset date', async () => {
    const Picker = () => {
      const [dates, setDates] = useState<Date[]>([]);
      return (
        <DateTimePicker
          focusDate={FOCUS_DATE}
          selectedDates={dates}
          onDatesChange={setDates}
          showDatePresets
        />
      );
    };
    render(<Picker />);
    const target = addMonths(new Date(), 3);

    await userEvent.click(screen.getByRole('button', { name: 'Now + 3 M' }));

    const monthName = target.toLocaleString('en-US', { month: 'long' });
    expect(screen.getAllByRole('button', { name: monthName }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('button', { name: String(target.getDate()), pressed: true }),
    ).toBeInTheDocument();
  });

  it('should let the time buttons change the date picked by a preset', async () => {
    const onDatesChange = jest.fn();
    const Picker = () => {
      const [dates, setDates] = useState<Date[]>([]);
      return (
        <DateTimePicker
          selectedDates={dates}
          onDatesChange={(d) => {
            setDates(d);
            onDatesChange(d);
          }}
          showDatePresets
          showTimePicker
        />
      );
    };
    render(<Picker />);

    await userEvent.click(screen.getByRole('button', { name: 'Now + 1 M' }));
    await userEvent.click(screen.getByRole('button', { name: /^0?2:00/ }));

    const [[preset]] = onDatesChange.mock.calls[0];
    const [[picked]] = onDatesChange.mock.calls[1];
    expect(picked.getHours()).toBe(2);
    expect(picked.toDateString()).toBe(preset.toDateString());
  });
});
