import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DPExcludeConfig, DPPropGetter, DPUserConfig } from '@rehookify/datepicker';
import { addMonths, addYears } from 'date-fns';
import React, { MouseEvent, ReactNode, useState } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { ButtonVanilla } from '@/components/Button/Button.vanilla';
import { TextVanilla } from '@/components/Text/Text.vanilla';

import {
  calendarRecipe,
  cellRecipe,
  gridRecipe,
  header,
  headerCenterButton,
  layout,
  pageRecipe,
  presetButton,
  presets,
  row,
  timeColumn,
  timeColumnInner,
  timeLabel,
  timeList,
  visuallyHidden,
  weekDay,
} from './DateTimePicker.vanilla.css';
import { clampToTimeRange, isOutOfRange, rangeHasUnavailableDay } from './isOutOfRange';
import { DateTimePickerLabels, DEFAULT_LABELS } from './labels';
import { useDateTimePicker } from './useDateTimePicker';

type HeaderProps = {
  centerButtonLabel: string;
  centerButtonOnClick: () => void;
  leftButtonLabel: string;
  leftButtonProps: DPPropGetter;
  rightButtonLabel: string;
  rightButtonProps: DPPropGetter;
};

function Header({
  centerButtonLabel,
  centerButtonOnClick,
  leftButtonLabel,
  leftButtonProps,
  rightButtonLabel,
  rightButtonProps,
}: HeaderProps) {
  return (
    <div className={header}>
      <ButtonVanilla
        type="button"
        ghost
        variant="secondary"
        aria-label={leftButtonLabel}
        {...leftButtonProps}
      >
        <ChevronLeftIcon aria-hidden />
      </ButtonVanilla>
      <ButtonVanilla
        type="button"
        className={headerCenterButton}
        ghost
        onClick={centerButtonOnClick}
        variant="secondary"
      >
        {centerButtonLabel}
      </ButtonVanilla>
      <ButtonVanilla
        type="button"
        ghost
        variant="secondary"
        aria-label={rightButtonLabel}
        {...rightButtonProps}
      >
        <ChevronRightIcon aria-hidden />
      </ButtonVanilla>
    </div>
  );
}

type CellProps = {
  children: ReactNode;
  kind: 'day' | 'month' | 'year' | 'time';
  now: boolean;
  /** A day between the start and end of a range, or in the range being chosen. */
  inRange?: boolean;
  /** Read after the day for screen readers, e.g. for a day inside the selected range. */
  description?: string;
  outside?: boolean;
  propGetter: DPPropGetter;
  selected: boolean;
  onAfterClick?: () => void;
};

function Cell({
  children,
  kind,
  now,
  inRange,
  description,
  outside,
  propGetter,
  selected,
  onAfterClick,
}: CellProps) {
  const { onClick, ...getterProps } = propGetter;

  return (
    <ButtonVanilla
      type="button"
      className={cellRecipe({ kind, now: now && !selected, outside })}
      ghost={!selected && !inRange}
      variant={selected || (now && !inRange) ? 'primary' : 'secondary'}
      {...getterProps}
      // aria-selected is not allowed on role="button"; aria-pressed carries the same state.
      aria-selected={undefined}
      aria-pressed={selected}
      onClick={(evt: MouseEvent<HTMLElement>) => {
        onClick?.(evt);
        onAfterClick?.();
      }}
      tabIndex={getterProps.disabled ? getterProps.tabIndex : 0}
    >
      {children}
      {description ? <span className={visuallyHidden}>{` ${description}`}</span> : null}
    </ButtonVanilla>
  );
}

type PresetProps = {
  children: ReactNode;
  fromNow: (now: Date) => Date;
  dates: DPUserConfig['dates'];
  exclude: DPExcludeConfig | undefined;
  time: DPUserConfig['time'];
  onSelect: (date: Date, evt: MouseEvent<HTMLElement>) => void;
};

function Preset({ children, fromNow, dates, exclude, time, onSelect }: PresetProps) {
  const presetDate = (now: Date) => clampToTimeRange(fromNow(now), time);
  // Checked again on click, since a picker that stays mounted outlives this snapshot.
  const [mountedAt, setMountedAt] = useState(() => new Date());

  return (
    <ButtonVanilla
      type="button"
      className={presetButton}
      variant="secondary"
      disabled={isOutOfRange(presetDate(mountedAt), dates, exclude)}
      onClick={(evt: MouseEvent<HTMLElement>) => {
        const date = presetDate(new Date());
        if (isOutOfRange(date, dates, exclude)) setMountedAt(new Date());
        else onSelect(date, evt);
      }}
    >
      {children}
    </ButtonVanilla>
  );
}

interface DateTimePickerVanillaOwnProps extends CSSProps {
  labels?: Partial<DateTimePickerLabels>;
  onFastTravelClick?: () => void;
  onDayButtonClick?: () => void;
  onTimeButtonClick?: () => void;
  /** Not shown in range mode, where a single date cannot complete a range. */
  showDatePresets?: boolean;
  showTimePicker?: boolean;
}

export type DateTimePickerVanillaProps = DPUserConfig &
  DateTimePickerVanillaOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof DPUserConfig>;

export const DateTimePickerVanilla = React.forwardRef<HTMLDivElement, DateTimePickerVanillaProps>(
  (
    {
      className,
      css,
      style,
      onFastTravelClick,
      onDayButtonClick,
      onTimeButtonClick,
      showDatePresets,
      showTimePicker,
      labels,
      calendar,
      dates,
      exclude,
      focusDate,
      locale,
      offsetDate,
      onOffsetChange,
      onDatesChange,
      selectedDates,
      time: timeConfig,
      years: yearsConfig,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      data: { calendars, months, time, weekDays, years },
      propGetters: {
        addOffset,
        dayButton,
        monthButton,
        nextYearsButton,
        previousYearsButton,
        setOffset,
        subtractOffset,
        timeButton,
        yearButton,
      },
    } = useDateTimePicker({
      calendar,
      // In multiple mode, clicking a selected day removes it unless dates.toggle says otherwise.
      dates: dates?.mode === 'multiple' ? { toggle: true, ...dates } : dates,
      exclude,
      focusDate,
      locale,
      offsetDate,
      onOffsetChange,
      // Picked days keep midnight or the previous time, which can fall outside the time limits.
      onDatesChange: (d) => {
        const next = d.map((date) => clampToTimeRange(date, timeConfig));
        // A range may not include a disabled day: the click that would cross one starts a new range.
        if (
          dates?.mode === 'range' &&
          next.length === 2 &&
          rangeHasUnavailableDay(next[0], next[1], dates, exclude)
        ) {
          const clicked = d.findIndex((date) => !selectedDates.some((s) => +s === +date));
          onDatesChange([next[clicked === -1 ? 1 : clicked]]);
          return;
        }
        onDatesChange(next);
      },
      selectedDates,
      time: timeConfig,
      years: yearsConfig,
    });

    const [page, setPage] = useState<number>(0);
    const mergedStyles = useInlineStyle(css, style);
    const mergedLabels = { ...DEFAULT_LABELS, ...labels };

    const { days, month, year } = calendars[0];

    // Moves the calendar to the preset date too, so the selection is visible.
    const travelTo = (date: Date, evt: MouseEvent<HTMLElement>) => {
      onDatesChange([date]);
      setOffset(date).onClick?.(evt);
      setPage(0);
      onFastTravelClick?.();
    };

    return (
      <div ref={forwardedRef} className={className} style={mergedStyles} {...props}>
        <div className={layout}>
          <div className={row}>
            <div className={calendarRecipe({ mode: calendar?.mode })}>
              <div className={pageRecipe({ visible: page === 0 })}>
                <Header
                  centerButtonLabel={month}
                  centerButtonOnClick={() => setPage(1)}
                  leftButtonLabel={mergedLabels.previousMonth}
                  rightButtonLabel={mergedLabels.nextMonth}
                  leftButtonProps={subtractOffset({ months: 1 })}
                  rightButtonProps={addOffset({ months: 1 })}
                />
                <div className={gridRecipe({ columns: '7' })}>
                  {weekDays.map((day, index) => (
                    <TextVanilla key={index} className={weekDay}>
                      {day}
                    </TextVanilla>
                  ))}
                  {days.map((d) => (
                    <Cell
                      key={d.$date.toString()}
                      kind="day"
                      now={d.now}
                      inRange={d.range !== '' && !d.selected && !d.disabled}
                      description={d.range === 'in-range' ? mergedLabels.inRange : undefined}
                      outside={!d.disabled && !d.inCurrentMonth && !d.selected}
                      propGetter={dayButton(d)}
                      onAfterClick={onDayButtonClick}
                      selected={d.selected}
                    >
                      {d.day}
                    </Cell>
                  ))}
                </div>
              </div>

              <div className={pageRecipe({ visible: page === 1 })}>
                <Header
                  centerButtonLabel={year}
                  centerButtonOnClick={() => setPage(2)}
                  leftButtonLabel={mergedLabels.previousYear}
                  rightButtonLabel={mergedLabels.nextYear}
                  leftButtonProps={subtractOffset({ years: 1 })}
                  rightButtonProps={addOffset({ years: 1 })}
                />
                <div className={gridRecipe({ columns: '3' })}>
                  {months.map((m) => (
                    <Cell
                      key={m.$date.toString()}
                      kind="month"
                      now={m.now}
                      propGetter={monthButton(m)}
                      selected={m.selected}
                      onAfterClick={() => setPage(0)}
                    >
                      {m.month}
                    </Cell>
                  ))}
                </div>
              </div>

              <div className={pageRecipe({ visible: page === 2 })}>
                <Header
                  centerButtonLabel={`${years[0].year} - ${years[years.length - 1].year}`}
                  centerButtonOnClick={() => setPage(0)}
                  leftButtonLabel={mergedLabels.previousYears}
                  rightButtonLabel={mergedLabels.nextYears}
                  leftButtonProps={previousYearsButton()}
                  rightButtonProps={nextYearsButton()}
                />
                <div className={gridRecipe({ columns: '3' })}>
                  {years.map((y) => (
                    <Cell
                      key={y.$date.toString()}
                      kind="year"
                      now={y.now}
                      propGetter={yearButton(y)}
                      selected={y.selected}
                      onAfterClick={() => setPage(0)}
                    >
                      {y.year}
                    </Cell>
                  ))}
                </div>
              </div>
            </div>

            {showTimePicker ? (
              <div className={timeColumn}>
                <div className={timeColumnInner}>
                  <TextVanilla className={timeLabel}>Time</TextVanilla>
                  <div className={timeList}>
                    {time.map((t) => (
                      <Cell
                        key={t.$date.toString()}
                        kind="time"
                        now={t.now}
                        propGetter={timeButton(t)}
                        selected={t.selected}
                        onAfterClick={onTimeButtonClick}
                      >
                        {t.time}
                      </Cell>
                    ))}
                  </div>
                </div>
              </div>
            ) : undefined}
          </div>

          {showDatePresets && dates?.mode !== 'range' ? (
            <div className={presets}>
              <Preset
                fromNow={(d) => addMonths(d, 1)}
                dates={dates}
                exclude={exclude}
                time={timeConfig}
                onSelect={travelTo}
              >
                Now + 1 M
              </Preset>
              <Preset
                fromNow={(d) => addMonths(d, 3)}
                dates={dates}
                exclude={exclude}
                time={timeConfig}
                onSelect={travelTo}
              >
                Now + 3 M
              </Preset>
              {showTimePicker ? (
                <Preset
                  fromNow={(d) => addYears(d, 1)}
                  dates={dates}
                  exclude={exclude}
                  time={timeConfig}
                  onSelect={travelTo}
                >
                  Now + 1 Y
                </Preset>
              ) : undefined}
            </div>
          ) : undefined}
        </div>
      </div>
    );
  },
);

DateTimePickerVanilla.displayName = 'DateTimePickerVanilla';
