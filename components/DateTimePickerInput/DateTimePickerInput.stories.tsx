// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import { format } from 'date-fns';
import React, { useState } from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Field } from '../Field';
import { FieldVanilla } from '../Field/Field.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { InputVanillaProps } from '../Input/Input.vanilla';
import { Label } from '../Label';
import { Text, TextVanilla } from '../Text';
import {
  DateTimePickerInput,
  DateTimePickerInputProps,
  DateTimePickerInputVariants,
} from './DateTimePickerInput';
import {
  DateTimePickerInputVanilla,
  DateTimePickerInputVanillaProps,
} from './DateTimePickerInput.vanilla';

const DateTimePickerInputWrapper = (props: DateTimePickerInputProps): JSX.Element => (
  <DateTimePickerInput {...props} />
);

const DateTimePickerInputForStory = modifyVariantsForStory<
  DateTimePickerInputVariants,
  DateTimePickerInputProps
>(DateTimePickerInputWrapper);

const Component: Meta<typeof DateTimePickerInputForStory> = {
  title: 'Components/DateTimePickerInput',
  component: DateTimePickerInputForStory,
  argTypes: {
    pickerPlacement: {
      control: 'inline-radio',
      options: [
        'top-start',
        'right-start',
        'bottom-start',
        'left-start',
        'top',
        'right',
        'bottom',
        'left',
        'top-end',
        'right-end',
        'bottom-end',
        'left-end',
      ],
    },
    showDatePresets: {
      control: 'boolean',
    },
    showTimePicker: {
      control: 'boolean',
    },
  },
};

const DateTimePickerTemplate: StoryFn<typeof DateTimePickerInputForStory> = (args) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [minDate] = useState(() => new Date());

  return (
    <form>
      <Flex direction="column" gap={3}>
        <DateTimePickerInputForStory
          {...args}
          calendar={{ startDay: 1 }}
          dates={{ minDate }}
          inputCSS={{ width: '100%' }}
          onChange={setSelectedDates}
        />
        <Flex direction="column" css={{ gap: '2px' }}>
          <Label htmlFor="selected-dates">Selected date:</Label>
          <Text id="selected-dates">
            {selectedDates.length
              ? selectedDates
                  .map((date) => (!isNaN(date.getTime()) ? date.toISOString() : 'Invalid date'))
                  .join(', ')
              : 'None.'}
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export const Base: StoryFn<typeof DateTimePickerInputForStory> = DateTimePickerTemplate.bind({});

Base.args = {
  showDatePresets: true,
  showTimePicker: true,
};

export const WithField: StoryFn<
  React.ComponentProps<typeof DateTimePickerInputForStory> & FieldStoryArgs
> = ({ label, description, error, ...args }) => {
  const [minDate] = useState(() => new Date());

  return (
    <Field label={label} description={description} error={error}>
      <DateTimePickerInputForStory
        {...args}
        calendar={{ startDay: 1 }}
        dates={{ minDate }}
        inputCSS={{ width: '100%' }}
      />
    </Field>
  );
};
WithField.args = {
  label: 'Start date',
  description: 'Use Field to give the date picker a label, a description and an error.',
  error: 'Select a start date.',
};
WithField.argTypes = FIELD_STORY_ARG_TYPES;

export const VanillaWithField: StoryFn<FieldStoryArgs> = ({ label, description, error }) => {
  const [minDate] = useState(() => new Date());

  return (
    <FieldVanilla label={label} description={description} error={error}>
      <DateTimePickerInputVanilla
        calendar={{ startDay: 1 }}
        dates={{ minDate }}
        inputCSS={{ width: '100%' }}
        showDatePresets
        showTimePicker
      />
    </FieldVanilla>
  );
};
VanillaWithField.args = {
  label: 'Start date',
  description: 'Use FieldVanilla to give the date picker a label, a description and an error.',
  error: 'Select a start date.',
};
VanillaWithField.argTypes = FIELD_STORY_ARG_TYPES;

const CUSTOM_LABELS = {
  dialog: 'Pick a start date',
  nextMonth: 'Go to next month',
  nextYear: 'Go to next year',
  nextYears: 'Go to next years',
  previousMonth: 'Go to previous month',
  previousYear: 'Go to previous year',
  previousYears: 'Go to previous years',
};

export const VanillaUnavailableDate: StoryFn = () => {
  const [minDate] = useState(() => new Date());
  const [rejected, setRejected] = useState(false);

  return (
    <FieldVanilla
      label="Start date"
      description="Type a date before today to see the error."
      error={rejected ? 'Pick a date from today on.' : undefined}
    >
      <DateTimePickerInputVanilla
        calendar={{ startDay: 1 }}
        dates={{ minDate }}
        inputCSS={{ width: '100%' }}
        onChange={(_dates, { rejected: isRejected }) => setRejected(isRejected)}
      />
    </FieldVanilla>
  );
};

type ComparisonProps = Pick<
  DateTimePickerInputVanillaProps,
  'labels' | 'showDatePresets' | 'showTimePicker' | 'time'
>;

type ComparisonInputProps = Pick<InputVanillaProps, 'disabled' | 'state'>;

const COMPARISON_STATES: {
  label: string;
  props: ComparisonProps;
  inputProps?: ComparisonInputProps;
}[] = [
  { label: 'Base', props: {} },
  { label: 'With time picker and presets', props: { showTimePicker: true, showDatePresets: true } },
  {
    label: 'Times from 9:00 to 18:00',
    props: { showTimePicker: true, time: { minTime: { h: 9, m: 0 }, maxTime: { h: 18, m: 0 } } },
  },
  { label: 'Custom labels (popup and arrow buttons)', props: { labels: CUSTOM_LABELS } },
  { label: 'Disabled', props: {}, inputProps: { disabled: true } },
  { label: 'Invalid', props: {}, inputProps: { state: 'invalid' } },
];

const LABEL_WIDTH = 180;
const COLUMN_WIDTH = 320;

const SelectedDates = ({ dates }: { dates: Date[] }): JSX.Element => (
  <TextVanilla size="2" variant="subtle" css={{ marginTop: '16px' }}>
    Selected: {dates.length ? dates.map((d) => format(d, 'yyyy-MM-dd HH:mm')).join(', ') : 'none'}
  </TextVanilla>
);

const ComparisonRow = ({
  label,
  minDate,
  props,
  inputProps,
}: (typeof COMPARISON_STATES)[number] & { minDate: Date }): JSX.Element => {
  const [stitchesDates, setStitchesDates] = useState<Date[]>([]);
  const [vanillaDates, setVanillaDates] = useState<Date[]>([]);

  return (
    <FlexVanilla gap={4} align="start">
      <TextVanilla variant="subtle" css={{ width: LABEL_WIDTH, paddingTop: '10px' }}>
        {label}
      </TextVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <DateTimePickerInput
          {...props}
          // The Stitches `inputProps` type is the Input component itself, not its props.
          inputProps={inputProps as DateTimePickerInputProps['inputProps']}
          calendar={{ startDay: 1 }}
          dates={{ minDate }}
          inputCSS={{ width: '100%' }}
          onChange={setStitchesDates}
        />
        <SelectedDates dates={stitchesDates} />
      </BoxVanilla>
      <BoxVanilla css={{ width: COLUMN_WIDTH }}>
        <DateTimePickerInputVanilla
          {...props}
          inputProps={inputProps}
          calendar={{ startDay: 1 }}
          dates={{ minDate }}
          inputCSS={{ width: '100%' }}
          onChange={setVanillaDates}
        />
        <SelectedDates dates={vanillaDates} />
      </BoxVanilla>
    </FlexVanilla>
  );
};

export const Comparison: StoryFn = () => {
  const [minDate] = useState(() => new Date());

  return (
    <FlexVanilla direction="column" gap={4}>
      <TextVanilla size="2" variant="subtle">
        Every row allows dates from today on. Click an input to open its picker.
      </TextVanilla>
      <FlexVanilla gap={4}>
        <BoxVanilla css={{ width: LABEL_WIDTH }} />
        <H3Vanilla css={{ width: COLUMN_WIDTH }}>Stitches</H3Vanilla>
        <H3Vanilla css={{ width: COLUMN_WIDTH }}>Vanilla Extract</H3Vanilla>
      </FlexVanilla>
      {COMPARISON_STATES.map((state) => (
        <ComparisonRow key={state.label} minDate={minDate} {...state} />
      ))}
    </FlexVanilla>
  );
};

export default Component;
