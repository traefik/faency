import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DPDatesConfig, DPExcludeConfig, DPPropGetter, DPUserConfig } from '@rehookify/datepicker';
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
  weekDay,
} from './DateTimePicker.vanilla.css';
import { clampToTimeRange, isOutOfRange } from './isOutOfRange';
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
  outside?: boolean;
  propGetter: DPPropGetter;
  selected: boolean;
  onAfterClick?: () => void;
};

function Cell({ children, kind, now, outside, propGetter, selected, onAfterClick }: CellProps) {
  const { onClick, ...getterProps } = propGetter;

  return (
    <ButtonVanilla
      type="button"
      className={cellRecipe({ kind, now: now && !selected, outside })}
      ghost={!selected}
      variant={now || selected ? 'primary' : 'secondary'}
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
    </ButtonVanilla>
  );
}

type DateTimePickerDatesConfig = Omit<DPDatesConfig, 'mode'>;

export type DateTimePickerConfig = Omit<DPUserConfig, 'dates'> & {
  dates?: Partial<DateTimePickerDatesConfig>;
};

type PresetProps = {
  children: ReactNode;
  fromNow: (now: Date) => Date;
  dates: Partial<DateTimePickerDatesConfig> | undefined;
  exclude: DPExcludeConfig | undefined;
  time: DateTimePickerConfig['time'];
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
  showDatePresets?: boolean;
  showTimePicker?: boolean;
}

export type DateTimePickerVanillaProps = DateTimePickerConfig &
  DateTimePickerVanillaOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof DateTimePickerConfig>;

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
      dates,
      exclude,
      focusDate,
      locale,
      offsetDate,
      onOffsetChange,
      // Picked days keep midnight or the previous time, which can fall outside the time limits.
      onDatesChange: (d) => onDatesChange(d.map((date) => clampToTimeRange(date, timeConfig))),
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

          {showDatePresets ? (
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
