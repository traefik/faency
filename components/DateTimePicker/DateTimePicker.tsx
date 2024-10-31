import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DPDatesConfig, DPPropGetter, DPUserConfig, useDatePicker } from '@rehookify/datepicker';
import { addMonths, addYears } from 'date-fns';
import React, { useState } from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';

const CalendarGrid = styled('div', {
  display: 'grid',
  alignItems: 'center',
  gap: '$1',
  px: '$2',
  borderLeft: '2px solid $buttonSecondaryBorder',
  borderRight: '2px solid $buttonSecondaryBorder',
});

const SevenColGrid = styled(CalendarGrid, {
  gridTemplateColumns: 'repeat(7, 1fr)',
});

const ThreeColGrid = styled(CalendarGrid, {
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: '100%',
});

const StyledDiv = styled('div');

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
    <Flex align="center" gap="2" css={{ px: '$2' }}>
      <Button type="button" ghost variant="secondary" {...leftButtonProps}>
        <ChevronLeftIcon />
      </Button>
      <Button
        type="button"
        role="button"
        tabIndex={0}
        css={{ flexGrow: 1, textAlign: 'center' }}
        ghost
        onClick={centerButtonOnClick}
        variant="secondary"
      >
        {centerButtonLabel}
      </Button>
      <Button type="button" ghost variant="secondary" {...rightButtonProps}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
}

type CustomDPDatesConfig = Omit<DPDatesConfig, 'mode'>;

type CustomDPUserConfig = Omit<DPUserConfig, 'dates'> & {
  dates?: Partial<CustomDPDatesConfig>;
};

export type DateTimePickerProps = CustomDPUserConfig & {
  css?: CSS;
  onFastTravelClick?: () => void;
  onTimeButtonClick?: () => void;
  showDatePresets?: boolean;
  showTimePicker?: boolean;
};

export type DateTimePickerVariants = VariantProps<DateTimePickerProps>;

export const DateTimePicker = React.forwardRef<
  React.ElementRef<typeof StyledDiv>,
  DateTimePickerProps
>(
  (
    { css, onFastTravelClick, onTimeButtonClick, showDatePresets, showTimePicker, ...config },
    fowardedRef,
  ) => {
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
      <StyledDiv css={css} ref={fowardedRef}>
        <Flex direction="column" gap="2" css={{ display: 'inline-flex' }}>
          <Flex>
            <Box
              css={{
                flex: 1,
                minHeight: config.calendar?.mode === 'fluid' ? '244px' : '280px',
                minWidth: '268px',
              }}
            >
              <Flex
                direction="column"
                css={{ display: page === 0 ? 'flex' : 'none', height: '100%' }}
              >
                <Header
                  centerButtonLabel={month}
                  centerButtonOnClick={() => setPage(1)}
                  leftButtonProps={subtractOffset({ months: 1 })}
                  rightButtonProps={addOffset({ months: 1 })}
                />
                <SevenColGrid>
                  {weekDays.map((weekDay, index) => (
                    <Text key={index} css={{ lineHeight: '$sizes$6', textAlign: 'center' }}>
                      {weekDay}
                    </Text>
                  ))}
                  {days.map((d) => (
                    <Button
                      key={d.$date.toString()}
                      type="button"
                      css={{
                        width: '32px',
                        px: 0,
                        color:
                          !d.disabled && !d.inCurrentMonth && !d.selected
                            ? '$textSubtle'
                            : undefined,
                        fontWeight: d.now && !d.selected ? '$bold' : undefined,
                        textAlign: 'center',
                      }}
                      ghost={!d.selected}
                      variant={d.now || d.selected ? 'primary' : 'secondary'}
                      {...dayButton(d)}
                      tabIndex={dayButton(d).disabled ? dayButton(d).tabIndex : 0}
                    >
                      {d.day}
                    </Button>
                  ))}
                </SevenColGrid>
              </Flex>

              <Flex
                direction="column"
                css={{ display: page === 1 ? 'flex' : 'none', height: '100%' }}
              >
                <Header
                  centerButtonLabel={year}
                  centerButtonOnClick={() => setPage(2)}
                  leftButtonProps={subtractOffset({ years: 1 })}
                  rightButtonProps={addOffset({ years: 1 })}
                />
                <ThreeColGrid>
                  {months.map((m) => (
                    <Button
                      key={m.$date.toString()}
                      type="button"
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
                      tabIndex={monthButton(m).disabled ? monthButton(m).tabIndex : 0}
                    >
                      {m.month}
                    </Button>
                  ))}
                </ThreeColGrid>
              </Flex>

              <Flex
                direction="column"
                css={{ display: page === 2 ? 'flex' : 'none', height: '100%' }}
              >
                <Header
                  centerButtonLabel={`${years[0].year} - ${years[years.length - 1].year}`}
                  centerButtonOnClick={() => setPage(0)}
                  leftButtonProps={previousYearsButton()}
                  rightButtonProps={nextYearsButton()}
                />
                <ThreeColGrid>
                  {years.map((y) => (
                    <Button
                      key={y.$date.toString()}
                      type="button"
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
                      tabIndex={yearButton(y).disabled ? yearButton(y).tabIndex : 0}
                    >
                      {y.year}
                    </Button>
                  ))}
                </ThreeColGrid>
              </Flex>
            </Box>

            {showTimePicker ? (
              <Box css={{ flex: 1, width: '90px', position: 'relative', overflow: 'auto' }}>
                <Flex
                  direction="column"
                  gap="1"
                  css={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                >
                  <Text css={{ mt: '32px', ml: '8px', lineHeight: '$sizes$6' }}>Time</Text>
                  <Flex direction="column" gap="1" css={{ overflow: 'auto', px: '$2' }}>
                    {time.map((t) => (
                      <Button
                        key={t.$date.toString()}
                        type="button"
                        css={{
                          px: '$2',
                          fontWeight: t.now && !t.selected ? '$bold' : undefined,
                          textAlign: 'center',
                        }}
                        ghost={!t.selected}
                        variant={t.now || t.selected ? 'primary' : 'secondary'}
                        {...timeButton(t)}
                        onClick={(evt) => {
                          const fn = timeButton(t).onClick;
                          if (typeof fn !== 'undefined') fn(evt);
                          if (typeof onTimeButtonClick !== 'undefined') onTimeButtonClick();
                        }}
                        tabIndex={timeButton(t).disabled ? timeButton(t).tabIndex : 0}
                      >
                        {t.time}
                      </Button>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            ) : undefined}
          </Flex>

          {showDatePresets ? (
            <Flex gap="2">
              <Button
                type="button"
                css={{ flex: '1 1 0' }}
                variant="secondary"
                onClick={() => {
                  config.onDatesChange([addMonths(new Date(), 1)]);
                  if (typeof onFastTravelClick !== 'undefined') onFastTravelClick();
                }}
              >
                Now + 1 M
              </Button>
              <Button
                type="button"
                css={{ flex: '1 1 0' }}
                variant="secondary"
                onClick={() => {
                  config.onDatesChange([addMonths(new Date(), 3)]);
                  if (typeof onFastTravelClick !== 'undefined') onFastTravelClick();
                }}
              >
                Now + 3 M
              </Button>
              {showTimePicker ? (
                <Button
                  type="button"
                  css={{ flex: '1 1 0' }}
                  variant="secondary"
                  onClick={() => {
                    config.onDatesChange([addYears(new Date(), 1)]);
                    if (typeof onFastTravelClick !== 'undefined') onFastTravelClick();
                  }}
                >
                  Now + 1 Y
                </Button>
              ) : undefined}
            </Flex>
          ) : undefined}
        </Flex>
      </StyledDiv>
    );
  },
);
