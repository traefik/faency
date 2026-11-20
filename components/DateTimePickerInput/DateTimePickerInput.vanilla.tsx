import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format, isValid, parse } from 'date-fns';
import React, { MouseEventHandler, Ref, useMemo, useRef, useState } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { CardVanilla } from '@/components/Card/Card.vanilla';
import {
  DateTimePickerConfig,
  DateTimePickerVanilla,
} from '@/components/DateTimePicker/DateTimePicker.vanilla';
import {
  getDateBounds,
  isOutOfRange,
  isTimeOutOfRange,
} from '@/components/DateTimePicker/isOutOfRange';
import {
  DateTimePickerInputLabels,
  DEFAULT_INPUT_LABELS,
} from '@/components/DateTimePicker/labels';
import {
  InputVanilla,
  InputVanillaHandle,
  InputVanillaProps,
} from '@/components/Input/Input.vanilla';

import {
  arrow as arrowClass,
  firefoxPatch,
  input,
  popup,
  wrapper,
} from './DateTimePickerInput.vanilla.css';

const FORMAT = "yyyy-MM-dd'T'HH:mm";
// The format holds every date field, so parse only needs a fixed reference date.
const REFERENCE_DATE = new Date(0);

type DateTimePickerInputConfig = Omit<DateTimePickerConfig, 'onDatesChange' | 'selectedDates'>;

interface DateTimePickerInputVanillaOwnProps extends CSSProps {
  inputCSS?: CSSProps['css'];
  inputProps?: Omit<InputVanillaProps, 'css' | 'onChange' | 'type' | 'value'>;
  labels?: Partial<DateTimePickerInputLabels>;
  /** `rejected` is true when a typed date falls outside the allowed dates or times. */
  onChange?: (d: Date[], details: { rejected: boolean }) => void;
  pickerCSS?: CSSProps['css'];
  pickerPlacement?: Placement;
  showDatePresets?: boolean;
  showTimePicker?: boolean;
}

export type DateTimePickerInputVanillaProps = DateTimePickerInputConfig &
  DateTimePickerInputVanillaOwnProps &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    keyof DateTimePickerInputConfig | keyof DateTimePickerInputVanillaOwnProps
  >;

export const DateTimePickerInputVanilla = React.forwardRef<
  HTMLDivElement,
  DateTimePickerInputVanillaProps
>(
  (
    {
      className,
      css,
      style,
      inputCSS,
      inputProps,
      labels,
      onChange,
      pickerCSS,
      pickerPlacement,
      showDatePresets,
      showTimePicker,
      calendar,
      dates,
      exclude,
      focusDate,
      locale,
      offsetDate,
      onOffsetChange,
      time,
      years,
      ...props
    },
    forwardedRef,
  ) => {
    const arrowRef = useRef(null);
    const mergedStyles = useInlineStyle(css, style);
    const mergedLabels = { ...DEFAULT_INPUT_LABELS, ...labels };
    const bounds = getDateBounds(dates);

    const [inputValue, setInputValue] = useState<string>('');
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const middleware = useMemo(
      () => [offset(10), flip(), shift(), arrow({ element: arrowRef })],
      [],
    );

    const { refs, floatingStyles, context } = useFloating({
      open: isPickerOpen,
      onOpenChange: setIsPickerOpen,
      placement: pickerPlacement,
      middleware,
      whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const firefoxPatchRef = useRef<HTMLDivElement>(null);
    // The patch toggles the picker itself, so pressing it must not also count as an outside press.
    const dismiss = useDismiss(context, {
      outsidePress: (evt) => !firefoxPatchRef.current?.contains(evt.target as Node),
    });

    // No useRole: aria-expanded and aria-haspopup are not allowed on a datetime-local input.
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);
    const { onClick: onFirefoxPatchClick } = getReferenceProps();

    // Only the handlers floating-ui sets on the reference are merged; the rest pass through typed.
    const {
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onPointerDown,
      ...restInputProps
    } = inputProps ?? {};
    const referenceProps = getReferenceProps({
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onPointerDown,
    });

    const isUnavailable = (d: Date) => isOutOfRange(d, dates, exclude) || isTimeOutOfRange(d, time);

    return (
      <div ref={forwardedRef} className={cx(wrapper, className)} style={mergedStyles} {...props}>
        <InputVanilla
          startAdornment={<CalendarIcon aria-hidden />}
          {...restInputProps}
          {...referenceProps}
          className={cx(input, inputProps?.className)}
          css={inputCSS}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const value = evt.currentTarget.value;
            setInputValue(value);
            const parsed = value ? parse(value, FORMAT, REFERENCE_DATE) : undefined;
            const rejected = !!parsed && isValid(parsed) && isUnavailable(parsed);
            const newDates = parsed && isValid(parsed) && !rejected ? [parsed] : [];
            setSelectedDates(newDates);
            onChange?.(newDates, { rejected });
          }}
          ref={refs.setReference as Ref<InputVanillaHandle>}
          min={bounds.min ? format(bounds.min, FORMAT) : restInputProps.min}
          max={bounds.max ? format(bounds.max, FORMAT) : restInputProps.max}
          type="datetime-local"
          value={inputValue}
        />
        <div
          ref={firefoxPatchRef}
          className={firefoxPatch}
          onClick={onFirefoxPatchClick as MouseEventHandler<HTMLDivElement>}
        />
        {isPickerOpen && (
          <FloatingFocusManager context={context} initialFocus={-1} modal={false}>
            <div
              ref={refs.setFloating}
              className={popup}
              role="dialog"
              aria-label={mergedLabels.dialog}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <CardVanilla>
                <DateTimePickerVanilla
                  calendar={calendar}
                  dates={dates}
                  exclude={exclude}
                  focusDate={focusDate}
                  locale={locale}
                  offsetDate={offsetDate}
                  onOffsetChange={onOffsetChange}
                  time={time}
                  years={years}
                  css={pickerCSS}
                  labels={mergedLabels}
                  onDatesChange={(d) => {
                    setSelectedDates(d);
                    setInputValue(d.map((date) => format(date, FORMAT)).join(', '));
                    onChange?.(d, { rejected: false });
                  }}
                  onFastTravelClick={() => setIsPickerOpen(false)}
                  // With the time picker, a time is still to pick after the day, so stay open.
                  onDayButtonClick={showTimePicker ? undefined : () => setIsPickerOpen(false)}
                  onTimeButtonClick={() => setIsPickerOpen(false)}
                  selectedDates={selectedDates}
                  showDatePresets={showDatePresets}
                  showTimePicker={showTimePicker}
                />
              </CardVanilla>
              <FloatingArrow ref={arrowRef} context={context} className={arrowClass} />
            </div>
          </FloatingFocusManager>
        )}
      </div>
    );
  },
);

DateTimePickerInputVanilla.displayName = 'DateTimePickerInputVanilla';
