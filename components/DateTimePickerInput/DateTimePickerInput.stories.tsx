import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
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
    showFastTravel: {
      control: 'boolean',
    },
    showTimePicker: {
      control: 'boolean',
    },
  },
};

const DateTimePickerTemplate: StoryFn<typeof DateTimePickerInputForStory> = (args) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  return (
    <form>
      <Flex direction="column" gap={3}>
        <DateTimePickerInputForStory
          {...args}
          calendar={{ startDay: 1 }}
          dates={{ minDate: new Date() }}
          inputCSS={{ width: '100%' }}
          onChange={onDatesChange}
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
    </form>
  );
};

export const Base: StoryFn<typeof DateTimePickerInputForStory> = DateTimePickerTemplate.bind({});

Base.args = {
  showFastTravel: true,
  showTimePicker: true,
};

export default Component;
