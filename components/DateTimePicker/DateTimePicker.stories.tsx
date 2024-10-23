import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';
import { DateTimePicker, DateTimePickerProps, DateTimePickerVariants } from './DateTimePicker';

const DateTimePickerWrapper = (props: DateTimePickerProps): JSX.Element => (
  <DateTimePicker {...props} />
);

const DateTimePickerForStory = modifyVariantsForStory<DateTimePickerVariants, DateTimePickerProps>(
  DateTimePickerWrapper,
);

const Component: Meta<typeof DateTimePickerForStory> = {
  title: 'Components/DateTimePicker',
  component: DateTimePickerForStory,
  argTypes: {
    showFastTravel: {
      control: 'boolean',
    },
    showTimePicker: {
      control: 'boolean',
    },
  },
};

const DateTimePickerTemplate: StoryFn<typeof DateTimePickerForStory> = (args) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  return (
    <Flex direction="column" gap={3}>
      <DateTimePickerForStory
        {...args}
        dates={{ minDate: new Date() }}
        calendar={{ startDay: 1 }}
        onDatesChange={onDatesChange}
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
  showFastTravel: false,
  showTimePicker: false,
};

export const WithFastTravel: StoryFn<typeof DateTimePickerForStory> = DateTimePickerTemplate.bind(
  {},
);

WithFastTravel.args = {
  showFastTravel: true,
  showTimePicker: false,
};

export const WithTimePicker: StoryFn<typeof DateTimePickerForStory> = DateTimePickerTemplate.bind(
  {},
);

WithTimePicker.args = {
  showFastTravel: false,
  showTimePicker: true,
};

export default Component;
