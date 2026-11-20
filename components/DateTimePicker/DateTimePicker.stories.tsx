// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import { format } from 'date-fns';
import React, { useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { Label } from '../Label';
import { Text, TextVanilla } from '../Text';
import { DateTimePicker, DateTimePickerProps, DateTimePickerVariants } from './DateTimePicker';
import { DateTimePickerVanilla, DateTimePickerVanillaProps } from './DateTimePicker.vanilla';

const DateTimePickerWrapper = (props: DateTimePickerProps): JSX.Element => (
  <DateTimePicker {...props} />
);

const DateTimePickerForStory = modifyVariantsForStory<
  DateTimePickerVariants,
  DateTimePickerProps & {
    calendarMode?: 'fluid' | 'static' | undefined;
    maxDate?: Date;
    minDate?: Date;
  }
>(DateTimePickerWrapper);

const Component: Meta<typeof DateTimePickerForStory> = {
  title: 'Components/DateTimePicker',
  component: DateTimePickerForStory,
  argTypes: {
    calendarMode: {
      control: 'inline-radio',
      options: ['fluid', 'static'],
    },
    minDate: {
      control: 'date',
    },
    showDatePresets: {
      control: 'boolean',
    },
    showTimePicker: {
      control: 'boolean',
    },
  },
};

const DateTimePickerTemplate: StoryFn<typeof DateTimePickerForStory> = (args) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [minDate] = useState(() => new Date(args.minDate || Date.now()));

  return (
    <Flex direction="column" gap={3}>
      <DateTimePickerForStory
        {...args}
        dates={{
          minDate,
        }}
        calendar={{ mode: args.calendarMode, startDay: 1 }}
        onDatesChange={setSelectedDates}
        selectedDates={selectedDates}
      />
      <Flex direction="column" css={{ gap: '2px' }}>
        <Label htmlFor="selected-dates">Selected date:</Label>
        <Text id="selected-dates">
          {selectedDates.length
            ? selectedDates.map((date) => date.toISOString()).join(', ')
            : 'None.'}
        </Text>
      </Flex>
    </Flex>
  );
};

export const Base: StoryFn<typeof DateTimePickerForStory> = DateTimePickerTemplate.bind({});

Base.args = {
  calendarMode: 'static',
  minDate: new Date(),
  showDatePresets: false,
  showTimePicker: false,
};

export const WithDatePresets: StoryFn<typeof DateTimePickerForStory> = DateTimePickerTemplate.bind(
  {},
);

WithDatePresets.args = {
  calendarMode: 'static',
  minDate: new Date(),
  showDatePresets: true,
  showTimePicker: false,
};

export const WithTimePicker: StoryFn<typeof DateTimePickerForStory> = DateTimePickerTemplate.bind(
  {},
);

WithTimePicker.args = {
  calendarMode: 'static',
  minDate: new Date(),
  showDatePresets: false,
  showTimePicker: true,
};

const CUSTOM_LABELS = {
  nextMonth: 'Go to next month',
  nextYear: 'Go to next year',
  nextYears: 'Go to next years',
  previousMonth: 'Go to previous month',
  previousYear: 'Go to previous year',
  previousYears: 'Go to previous years',
};

type ComparisonProps = Pick<
  DateTimePickerVanillaProps,
  'labels' | 'showDatePresets' | 'showTimePicker'
>;

const COMPARISON_STATES: { label: string; props: ComparisonProps }[] = [
  { label: 'Base', props: {} },
  { label: 'With date presets', props: { showDatePresets: true } },
  { label: 'With time picker and presets', props: { showTimePicker: true, showDatePresets: true } },
  { label: 'Custom labels (arrow buttons)', props: { labels: CUSTOM_LABELS } },
];

const LABEL_WIDTH = 180;
const COLUMN_WIDTH = 400;

const SelectedDates = ({ dates }: { dates: Date[] }): JSX.Element => (
  <TextVanilla size="2" variant="subtle" css={{ marginTop: '16px' }}>
    Selected: {dates.length ? dates.map((d) => format(d, 'yyyy-MM-dd HH:mm')).join(', ') : 'none'}
  </TextVanilla>
);

const ComparisonRow = ({ label, props }: (typeof COMPARISON_STATES)[number]): JSX.Element => {
  const [stitchesDates, setStitchesDates] = useState<Date[]>([]);
  const [vanillaDates, setVanillaDates] = useState<Date[]>([]);

  return (
    <FlexVanilla gap={4} align="start">
      <TextVanilla variant="subtle" css={{ width: LABEL_WIDTH }}>
        {label}
      </TextVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <DateTimePicker
          {...props}
          calendar={{ startDay: 1 }}
          onDatesChange={setStitchesDates}
          selectedDates={stitchesDates}
        />
        <SelectedDates dates={stitchesDates} />
      </BoxVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <DateTimePickerVanilla
          {...props}
          calendar={{ startDay: 1 }}
          onDatesChange={setVanillaDates}
          selectedDates={vanillaDates}
        />
        <SelectedDates dates={vanillaDates} />
      </BoxVanilla>
    </FlexVanilla>
  );
};

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <FlexVanilla gap={4}>
      <BoxVanilla css={{ width: LABEL_WIDTH }} />
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Stitches</H3Vanilla>
      <H3Vanilla css={{ width: COLUMN_WIDTH }}>Vanilla Extract</H3Vanilla>
    </FlexVanilla>
    {COMPARISON_STATES.map((state) => (
      <ComparisonRow key={state.label} {...state} />
    ))}
  </FlexVanilla>
);

export default Component;
