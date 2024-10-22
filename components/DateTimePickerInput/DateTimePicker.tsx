import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DPPropGetter, DPUserConfig, useDatePicker } from '@rehookify/datepicker';
import React, { useState } from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';

const CalendarGrid = styled('div', {
  display: 'grid',
  alignItems: 'center',
  gap: '$1',
  p: '0 $2 $2 $2',
});

const SevenColGrid = styled(CalendarGrid, {
  gridTemplateColumns: 'repeat(7, 1fr)',
});

const ThreeColGrid = styled(CalendarGrid, {
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: '100%',
});

const StyledWrapper = styled('div', {
  display: 'flex',
  width: '100%',
});

type HeaderProps = {
  centerButtonLabel: string;
  centerButtonOnClick: () => void;
  leftButtonProps: DPPropGetter;
  rightButtonProps: DPPropGetter;
};

function Header({
  centerButtonLabel,
  centerButtonOnClick,
  leftButtonProps,
  rightButtonProps,
}: HeaderProps) {
  return (
    <Flex align="center" gap="2" css={{ p: '$2 $2 0 $2' }}>
      <Button ghost variant="secondary" {...leftButtonProps}>
        <ChevronLeftIcon />
      </Button>
      <Button
        ghost
        variant="secondary"
        css={{ flexGrow: 1, textAlign: 'center' }}
        onClick={centerButtonOnClick}
      >
        {centerButtonLabel}
      </Button>
      <Button ghost variant="secondary" {...rightButtonProps}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
}

export type DateTimePickerProps = DPUserConfig & {
  css?: CSS;
  showTimePicker?: boolean;
};

export type DateTimePickerVariants = VariantProps<DateTimePickerProps>;

export const DateTimePicker2 = React.forwardRef<
  React.ElementRef<typeof StyledWrapper>,
  DateTimePickerProps
>(({ css, showTimePicker, ...config }, fowardedRef) => {
  const {
    data: { calendars, months, time, weekDays, years },
    propGetters: {
      addOffset,
      dayButton,
      monthButton,
      nextYearsButton,
      previousYearsButton,
      subtractOffset,
      timeButton,
      yearButton,
    },
  } = useDatePicker(config);

  const [page, setPage] = useState<number>(0);

  const { days, month, year } = calendars[0];

  return (
    <StyledWrapper css={css} ref={fowardedRef}>
      <Flex align="stretch">
        <Flex direction="column" gap="2" css={{ minWidth: '265px' }}>
          {page === 0 ? (
            <>
              <Header
                centerButtonLabel={month}
                centerButtonOnClick={() => setPage(1)}
                leftButtonProps={subtractOffset({ months: 1 })}
                rightButtonProps={addOffset({ months: 1 })}
              />
              <SevenColGrid css={{ borderRight: showTimePicker ? '1px solid $gray11' : undefined }}>
                {weekDays.map((weekDay, index) => (
                  <Text key={index} css={{ mb: '$1', textAlign: 'center' }}>
                    {weekDay}
                  </Text>
                ))}
                {days.map((d) => (
                  <Button
                    key={d.$date.toString()}
                    css={{
                      width: '32px',
                      px: 0,
                      color:
                        !d.disabled && !d.inCurrentMonth && !d.selected ? '$textSubtle' : undefined,
                      fontWeight: d.now && !d.selected ? '$bold' : undefined,
                      textAlign: 'center',
                    }}
                    ghost={!d.selected}
                    variant={d.now || d.selected ? 'primary' : 'secondary'}
                    {...dayButton(d)}
                  >
                    {d.day}
                  </Button>
                ))}
              </SevenColGrid>
            </>
          ) : undefined}
          {page === 1 ? (
            <>
              <Header
                centerButtonLabel={year}
                centerButtonOnClick={() => setPage(2)}
                leftButtonProps={subtractOffset({ years: 1 })}
                rightButtonProps={addOffset({ years: 1 })}
              />
              <ThreeColGrid css={{ borderRight: showTimePicker ? '1px solid $gray11' : undefined }}>
                {months.map((m) => (
                  <Button
                    key={m.$date.toString()}
                    css={{
                      px: 0,
                      fontWeight: m.now && !m.selected ? '$bold' : undefined,
                      textAlign: 'center',
                    }}
                    ghost={!m.selected}
                    variant={m.now || m.selected ? 'primary' : 'secondary'}
                    {...monthButton(m)}
                    onClick={(evt) => {
                      setPage(0);
                      const fn = monthButton(m).onClick;
                      if (typeof fn !== 'undefined') fn(evt);
                    }}
                  >
                    {m.month}
                  </Button>
                ))}
              </ThreeColGrid>
            </>
          ) : undefined}
          {page === 2 ? (
            <>
              <Header
                centerButtonLabel={`${years[0].year} - ${years[years.length - 1].year}`}
                centerButtonOnClick={() => setPage(0)}
                leftButtonProps={previousYearsButton()}
                rightButtonProps={nextYearsButton()}
              />
              <ThreeColGrid css={{ borderRight: showTimePicker ? '1px solid $gray11' : undefined }}>
                {years.map((y) => (
                  <Button
                    key={y.$date.toString()}
                    css={{
                      px: 0,
                      fontWeight: y.now && !y.selected ? '$bold' : undefined,
                      textAlign: 'center',
                    }}
                    ghost={!y.selected}
                    variant={y.now || y.selected ? 'primary' : 'secondary'}
                    {...yearButton(y)}
                    onClick={(evt) => {
                      setPage(0);
                      const fn = yearButton(y).onClick;
                      if (typeof fn !== 'undefined') fn(evt);
                    }}
                  >
                    {y.year}
                  </Button>
                ))}
              </ThreeColGrid>
            </>
          ) : undefined}
        </Flex>
        {showTimePicker ? (
          <Flex direction="column" gap="2" css={{ maxHeight: '290px', p: '$2 0 0 $2' }}>
            <Text css={{ mt: '40px', ml: '8px' }}>Time</Text>
            <Flex direction="column" gap="1" css={{ overflow: 'auto', p: '0 $2 $2 0' }}>
              {time.map((t) => (
                <Button
                  key={t.$date.toString()}
                  css={{
                    px: '$2',
                    fontWeight: t.now && !t.selected ? '$bold' : undefined,
                    textAlign: 'center',
                  }}
                  ghost={!t.selected}
                  variant={t.now || t.selected ? 'primary' : 'secondary'}
                  {...timeButton(t)}
                >
                  {t.time}
                </Button>
              ))}
            </Flex>
          </Flex>
        ) : undefined}
      </Flex>
    </StyledWrapper>
  );
});
