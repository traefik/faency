export type DateTimePickerLabels = {
  /** Read after the day number for days inside a selected range. */
  inRange: string;
  nextMonth: string;
  nextYear: string;
  nextYears: string;
  previousMonth: string;
  previousYear: string;
  previousYears: string;
};

export const DEFAULT_LABELS: DateTimePickerLabels = {
  inRange: 'in selected range',
  nextMonth: 'Next month',
  nextYear: 'Next year',
  nextYears: 'Next years',
  previousMonth: 'Previous month',
  previousYear: 'Previous year',
  previousYears: 'Previous years',
};

export type DateTimePickerInputLabels = DateTimePickerLabels & {
  dialog: string;
};

export const DEFAULT_INPUT_LABELS: DateTimePickerInputLabels = {
  ...DEFAULT_LABELS,
  dialog: 'Choose a date',
};
