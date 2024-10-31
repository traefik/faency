import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { DPUserConfig } from '@rehookify/datepicker';
import { format, parse } from 'date-fns';
import React, { MouseEventHandler, Ref, useRef, useState } from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Card } from '../Card';
import { DateTimePicker } from '../DateTimePicker';
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

export type DateTimePickerInputProps = Omit<DPUserConfig, 'onDatesChange' | 'selectedDates'> & {
  inputCSS?: CSS;
  inputProps?: Omit<typeof Input, 'css' | 'onChange' | 'ref' | 'value'>;
  onChange?: (d: Date[]) => void;
  pickerCSS?: CSS;
  showDatePresets?: boolean;
  showTimePicker?: boolean;
};

export type DateTimePickerInputVariants = VariantProps<DateTimePickerInputProps>;

export const DateTimePickerInput = React.forwardRef<
  React.ElementRef<typeof StyledWrapper>,
  DateTimePickerInputProps
>(
  (
    { inputCSS, inputProps, onChange, pickerCSS, showDatePresets, showTimePicker, ...pickerProps },
    fowardedRef,
  ) => {
    const formatStr = "yyyy-MM-dd'T'HH:mm";

    const arrowRef = useRef(null);

    const [inputValue, setInputValue] = useState<string>('');
    const [selectedDates, onDatesChange] = useState<Date[]>([]);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
      open: isPickerOpen,
      onOpenChange: setIsPickerOpen,
      middleware: [
        offset(10),
        flip(),
        shift(),
        arrow({
          element: arrowRef,
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
    const { onClick: onFirefoxPatchClick } = getReferenceProps();

    return (
      <StyledWrapper ref={fowardedRef}>
        <Input
          startAdornment={<CalendarIcon />}
          {...getReferenceProps()}
          {...inputProps}
          css={{ '& input::-webkit-calendar-picker-indicator': { display: 'none' }, ...inputCSS }}
          onChange={(evt) => {
            const value = evt.currentTarget.value;
            setInputValue(value);
            try {
              const newDates = (value as string)
                .split(',')
                .map((d) => parse(d.trim(), formatStr, new Date()));
              onDatesChange(newDates);
              if (onChange) onChange(newDates);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
              // empty
            }
          }}
          ref={refs.setReference as Ref<InputHandle>}
          type="datetime-local"
          value={inputValue}
        />
        <div
          className="firefox-patch"
          onClick={onFirefoxPatchClick as MouseEventHandler<HTMLDivElement>}
        />
        {isPickerOpen && (
          <FloatingFocusManager context={context} initialFocus={-1} modal={false}>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <Card>
                <DateTimePicker
                  {...pickerProps}
                  css={pickerCSS}
                  onDatesChange={(d) => {
                    onDatesChange(d);
                    setInputValue(d.map((date) => format(date, formatStr)).join(', '));
                    if (onChange) onChange(d);
                  }}
                  onFastTravelClick={() => setIsPickerOpen(false)}
                  onTimeButtonClick={() => setIsPickerOpen(false)}
                  selectedDates={selectedDates}
                  showDatePresets={showDatePresets}
                  showTimePicker={showTimePicker}
                />
              </Card>
              <FloatingArrow ref={arrowRef} context={context} fill="var(--colors-01dp)" />
            </div>
          </FloatingFocusManager>
        )}
      </StyledWrapper>
    );
  },
);
