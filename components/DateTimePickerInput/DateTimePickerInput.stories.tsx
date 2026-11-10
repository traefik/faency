// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useState } from 'react';

import { FIELD_STORY_ARG_TYPES, FieldStoryArgs } from '../../utils/fieldStoryArgs';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Field } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';
import {
  DateTimePickerInput,
  DateTimePickerInputProps,
  DateTimePickerInputVariants,
} from './DateTimePickerInput';

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

export default Component;
