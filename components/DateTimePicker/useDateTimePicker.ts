import {
  DPUserConfig,
  useCalendars,
  useDatePickerOffsetPropGetters,
  useDatePickerState,
  useDaysPropGetters,
  useMonths,
  useMonthsPropGetters,
  useTime,
  useTimePropGetter,
  useYears,
  useYearsPropGetters,
} from '@rehookify/datepicker';
import { useEffect } from 'react';

/**
 * `useDatePicker` from @rehookify/datepicker, built from its own hooks to reach its state.
 *
 * The time buttons edit the library's focus date, which only its day and time buttons set. When the
 * selection changes another way (a preset, a time moved into the limits, a typed date), the focus
 * date is left behind and every time button stays disabled, so it follows the selection here.
 */
export const useDateTimePicker = (config: DPUserConfig) => {
  const dpState = useDatePickerState(config);
  const {
    dispatch,
    selectedDates,
    state: { focusDate },
  } = dpState;

  useEffect(() => {
    const lastSelected = selectedDates[selectedDates.length - 1];
    const isFocusSelected = !!focusDate && selectedDates.some((d) => +d === +focusDate);
    if (lastSelected && !isFocusSelected) {
      dispatch({ type: 'SET_FOCUS_DATE', date: lastSelected });
    }
  }, [dispatch, focusDate, selectedDates]);

  const calendars = useCalendars(dpState);
  const months = useMonths(dpState);
  const time = useTime(dpState);
  const years = useYears(dpState);
  const dayPropGetters = useDaysPropGetters(dpState);
  const monthPropGetters = useMonthsPropGetters(dpState);
  const timePropGetters = useTimePropGetter(dpState);
  const yearPropGetters = useYearsPropGetters(dpState);
  const offsetPropGetters = useDatePickerOffsetPropGetters(dpState);

  return {
    data: { ...calendars, ...months, ...time, ...years },
    propGetters: {
      ...dayPropGetters,
      ...monthPropGetters,
      ...timePropGetters,
      ...yearPropGetters,
      ...offsetPropGetters,
    },
  };
};
