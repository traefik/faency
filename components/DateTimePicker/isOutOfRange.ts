import {
  DPDatesConfig,
  DPDayInteger,
  DPExcludeConfig,
  DPTimeConfig,
  DPTimeLimit,
} from '@rehookify/datepicker';
import { addDays, endOfDay, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns';

type DateLimits = Partial<Pick<DPDatesConfig, 'minDate' | 'maxDate'>> | undefined;

// Mirrors how @rehookify/datepicker disables a day: the day's midnight against the limits.
export const isOutOfRange = (
  date: Date,
  dates: DateLimits,
  exclude: DPExcludeConfig | undefined,
) => {
  const day = startOfDay(date);
  return (
    (!!dates?.minDate && isBefore(day, dates.minDate)) ||
    (!!dates?.maxDate && isAfter(day, dates.maxDate)) ||
    !!exclude?.day?.includes(day.getDay() as DPDayInteger) ||
    !!exclude?.date?.some((d) => isSameDay(d, day))
  );
};

// The first and last moments isOutOfRange accepts, for an input's min and max attributes.
export const getDateBounds = (dates: DateLimits) => {
  const { minDate, maxDate } = dates ?? {};
  return {
    min: minDate && (+startOfDay(minDate) === +minDate ? minDate : startOfDay(addDays(minDate, 1))),
    max: maxDate && endOfDay(maxDate),
  };
};

const toMinutes = (t?: DPTimeLimit) => (t?.h != null && t?.m != null ? t.h * 60 + t.m : undefined);

// Mirrors how @rehookify/datepicker disables a time button: inclusive limits, swapped if reversed.
export const isTimeOutOfRange = (
  date: Date,
  time: Partial<Pick<DPTimeConfig, 'minTime' | 'maxTime'>> | undefined,
) => {
  let min = toMinutes(time?.minTime);
  let max = toMinutes(time?.maxTime);
  if (min !== undefined && max !== undefined && min > max) [min, max] = [max, min];
  const minutes = date.getHours() * 60 + date.getMinutes();
  return (min !== undefined && minutes < min) || (max !== undefined && minutes > max);
};

// Moves a date's time into the time limits, so picked days and presets never land outside them.
export const clampToTimeRange = (
  date: Date,
  time: Partial<Pick<DPTimeConfig, 'minTime' | 'maxTime'>> | undefined,
) => {
  let min = toMinutes(time?.minTime);
  let max = toMinutes(time?.maxTime);
  if (min !== undefined && max !== undefined && min > max) [min, max] = [max, min];
  const minutes = date.getHours() * 60 + date.getMinutes();
  const target =
    min !== undefined && minutes < min ? min : max !== undefined && minutes > max ? max : undefined;
  if (target === undefined) return date;
  const clamped = new Date(date);
  clamped.setHours(Math.floor(target / 60), target % 60, 0, 0);
  return clamped;
};
