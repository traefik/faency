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
  useRole,
} from '@floating-ui/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { DPUserConfig } from '@rehookify/datepicker';
import { format, isValid, parse } from 'date-fns';
import React, { MouseEventHandler, Ref, useMemo, useRef, useState } from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Card } from '../Card';
import { DateTimePicker } from '../DateTimePicker';
import { getDateBounds, isOutOfRange, isTimeOutOfRange } from '../DateTimePicker/isOutOfRange';
import { DateTimePickerInputLabels, DEFAULT_INPUT_LABELS } from '../DateTimePicker/labels';
import { Input, InputHandle } from '../Input';

const StyledWrapper = styled('div', {
  display: 'flex',
  position: 'relative',
  width: '100%',

  '& .firefox-patch': {
    display: 'none',
  },

  '@supports (-moz-appearance: none)': {
    '& .firefox-patch': {
      display: 'block',
      width: '20px',
      height: '20px',
      position: 'absolute',
      right: '17px',
      top: '6px',
      background: '$inputBg',

      '&::before': {
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      },
      '&::after': {
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      },

      '&:focus-visible': {
        '&::before': {
          backgroundColor: '$inputFocusBg',
        },
        '&::after': {
          backgroundColor: '$primary',
          opacity: 0.15,
        },
      },
    },

    '@hover': {
      '&:hover .firefox-patch': {
        '&::before': {
          backgroundColor: '$inputHoverBg',
        },
        '&::after': {
          backgroundColor: '$primary',
          opacity: 0.05,
        },
      },
    },
  },
});

// The format holds every date field, so parse only needs a fixed reference date.
const REFERENCE_DATE = new Date(0);

const StyledPopup = styled('div', {
  zIndex: '$max',
});

export type DateTimePickerInputProps = Omit<DPUserConfig, 'onDatesChange' | 'selectedDates'> & {
  inputCSS?: CSS;
  inputProps?: Omit<typeof Input, 'css' | 'onChange' | 'ref' | 'value'>;
  labels?: Partial<DateTimePickerInputLabels>;
  /** `rejected` is true when a typed date falls outside the allowed dates or times. */
  onChange?: (d: Date[], details: { rejected: boolean }) => void;
  pickerCSS?: CSS;
  pickerPlacement?: Placement;
  showDatePresets?: boolean;
  showTimePicker?: boolean;
};

export type DateTimePickerInputVariants = VariantProps<DateTimePickerInputProps>;

export const DateTimePickerInput = React.forwardRef<
  React.ElementRef<typeof StyledWrapper>,
  DateTimePickerInputProps
>(
  (
    {
      inputCSS,
      inputProps,
      labels,
      onChange,
      pickerCSS,
      pickerPlacement,
      showDatePresets,
      showTimePicker,
      ...pickerProps
    },
    fowardedRef,
  ) => {
    const formatStr = "yyyy-MM-dd'T'HH:mm";

    const arrowRef = useRef(null);
    const mergedLabels = { ...DEFAULT_INPUT_LABELS, ...labels };
    const bounds = getDateBounds(pickerProps.dates);

    const { min: inputMin, max: inputMax } = (inputProps ?? {}) as { min?: string; max?: string };

    const [inputValue, setInputValue] = useState<string>('');
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const middleware = useMemo(
      () => [
        offset(10),
        flip(),
        shift(),
        // arrowRef is passed to floating-ui which handles it correctly
        arrow({ element: arrowRef }),
      ],
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
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
    const { onClick: onFirefoxPatchClick } = getReferenceProps();

    const isUnavailable = (d: Date) =>
      isOutOfRange(d, pickerProps.dates, pickerProps.exclude) ||
      isTimeOutOfRange(d, pickerProps.time);
    const parseDates = (value: string) =>
      value
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean)
        .map((d) => parse(d, formatStr, REFERENCE_DATE))
        .filter((d) => isValid(d));

    return (
      <StyledWrapper ref={fowardedRef}>
        <Input
          startAdornment={<CalendarIcon aria-hidden />}
          {...inputProps}
          {...getReferenceProps(inputProps as unknown as React.HTMLProps<Element>)}
          css={{ '& input::-webkit-calendar-picker-indicator': { display: 'none' }, ...inputCSS }}
          onChange={(evt) => {
            const value = evt.currentTarget.value;
            setInputValue(value);
            const newDates = parseDates(value);
            const accepted = newDates.filter((d) => !isUnavailable(d));
            setSelectedDates(accepted);
            if (onChange) onChange(accepted, { rejected: accepted.length < newDates.length });
          }}
          ref={refs.setReference as Ref<InputHandle>}
          min={bounds.min ? format(bounds.min, formatStr) : inputMin}
          max={bounds.max ? format(bounds.max, formatStr) : inputMax}
          type="datetime-local"
          value={inputValue}
        />
        <div
          ref={firefoxPatchRef}
          className="firefox-patch"
          onClick={onFirefoxPatchClick as MouseEventHandler<HTMLDivElement>}
        />
        {isPickerOpen && (
          <FloatingFocusManager context={context} initialFocus={-1} modal={false}>
            {/* refs.setFloating is a stable callback ref from floating-ui */}
            <StyledPopup
              ref={refs.setFloating}
              aria-label={mergedLabels.dialog}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <Card>
                <DateTimePicker
                  {...pickerProps}
                  css={pickerCSS}
                  labels={mergedLabels}
                  onDatesChange={(d) => {
                    setSelectedDates(d);
                    setInputValue(d.map((date) => format(date, formatStr)).join(', '));
                    if (onChange) onChange(d, { rejected: false });
                  }}
                  onFastTravelClick={() => setIsPickerOpen(false)}
                  // With the time picker, a time is still to pick after the day, so stay open.
                  onDayButtonClick={showTimePicker ? undefined : () => setIsPickerOpen(false)}
                  onTimeButtonClick={() => setIsPickerOpen(false)}
                  selectedDates={selectedDates}
                  showDatePresets={showDatePresets}
                  showTimePicker={showTimePicker}
                />
              </Card>
              <FloatingArrow ref={arrowRef} context={context} fill="var(--colors-01dp)" />
            </StyledPopup>
          </FloatingFocusManager>
        )}
      </StyledWrapper>
    );
  },
);
