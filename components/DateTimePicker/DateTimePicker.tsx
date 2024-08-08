import 'react-datepicker/dist/react-datepicker.css';

import { addMonths, addYears } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker, { CalendarContainer, DatePickerProps } from 'react-datepicker';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Button } from '../Button';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { Input } from '../Input';

const StyledWrapper = styled('div', {
  display: 'flex',
  width: '100%',

  // Reset
  outline: 'none',
  lineHeight: 0,

  position: 'relative',
  backgroundColor: '$inputBg',
  color: '$inputPlaceholder',

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

  '@hover': {
    '&:hover': {
      '&::before': {
        backgroundColor: '$inputHoverBg',
      },
      '&::after': {
        backgroundColor: '$primary',
        opacity: 0.05,
      },
    },
  },

  '> .react-datepicker-wrapper': {
    width: '100%',
  },

  '.react-datepicker': {
    backgroundColor: 'transparent',
    border: '2px solid $colors$buttonSecondaryBorder',
    borderRadius: '$3',
    // border: 'none',
    // boxShadow: 'inset 0 0 0 2px $colors$buttonSecondaryBorder',
    color: '$textDefault',
    fontFamily: '$rubik',

    '.react-datepicker__header': {
      backgroundColor: 'transparent',

      '&::before': {
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: '$3',
        backgroundColor: '$navButtonActiveBg',
      },

      '&::after': {
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: '$3',
        backgroundColor: '$navButtonActiveBg2',
        opacity: 0.05,
      },

      '.react-datepicker__current-month, .react-datepicker-time__header': {
        color: '$textDefault',
      },
    },

    '.react-datepicker__navigation': {
      '.react-datepicker__navigation-icon::before': {
        borderColor: '$gray10',
      },
    },

    '.react-datepicker__month-container': {
      '.react-datepicker__day': {
        border: '1px solid transparent',
        borderRadius: '$3',
        boxSizing: 'border-box',
        color: '$textDefault',

        '&--today': {
          border: '1px solid $buttonSecondaryBorder',
          borderRadius: '$3',
          fontWeight: 'normal',
        },

        '&:hover': {
          backgroundColor: '$gray6',
        },

        '&--keyboard-selected': {
          backgroundColor: 'inherit',
          border: '1px solid $primary',
          borderRadius: '$3',
        },

        '&--selected': {
          backgroundColor: '$primary',
          borderRadius: '$3',
          color: '$buttonPrimaryText',

          '&:hover': {
            backgroundColor: '$primary',
          },
        },
      },

      '.react-datepicker__day-name': {
        color: '$textDefault',
      },
    },

    '.react-datepicker__time-container': {
      '.react-datepicker__time': {
        backgroundColor: 'transparent',
        color: '$textDefault',

        '.react-datepicker__time-box': {
          // scrollbarColor: 'var(--colors-gray1) var(--colors-gray1)',
        },

        '.react-datepicker__time-list .react-datepicker__time-list-item': {
          '&:hover': {
            backgroundColor: '$gray6',
          },

          '&.react-datepicker__time-list-item--selected, &.react-datepicker__time-list-item--selected:hover':
            {
              backgroundColor: '$primary',
              color: '$buttonPrimaryText',
              fontWeight: 'normal',
            },
        },
      },
    },
  },

  '.react-datepicker-popper[data-placement] .react-datepicker__triangle': {
    color: '$01dp',
    fill: '$01dp',
    stroke: '$01dp',
  },
});

export type DateTimePickerProps = DatePickerProps & {
  css?: CSS;
};

export type DateTimePickerVariants = VariantProps<typeof DateTimePicker>;

export const DateTimePicker = React.forwardRef<
  React.ElementRef<typeof StyledWrapper>,
  DateTimePickerProps
>(({ css, selected, onChange, ...props }, fowardedRef) => {
  const [selectedDate, setSelectedDate] = useState(selected || new Date());

  const CalendarContainerWrapper = ({ className, children }) => {
    return (
      <Card css={{ display: 'flex', flexDirection: 'column', gap: '$2' }}>
        <CalendarContainer className={className}>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
        <Flex gap={2}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSelectedDate(addMonths(new Date(), 1))}
            css={{ flex: '1 1 0px' }}
          >
            Now + 1 M
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSelectedDate(addMonths(new Date(), 3))}
            css={{ flex: '1 1 0px' }}
          >
            Now + 3 M
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSelectedDate(addYears(new Date(), 1))}
            css={{ flex: '1 1 0px' }}
          >
            Now + 1 Y
          </Button>
        </Flex>
      </Card>
    );
  };

  useEffect(() => {
    if (onChange) onChange(selectedDate as Date & [Date | null, Date | null] & Date[]);
  }, [onChange, selectedDate]);

  return (
    <StyledWrapper css={css} ref={fowardedRef}>
      <DatePicker
        calendarContainer={CalendarContainerWrapper}
        customInput={<Input />}
        showTimeSelect
        {...props}
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
      />
    </StyledWrapper>
  );
});
