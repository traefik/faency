import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';
import { DateTimePicker2, DateTimePickerProps, DateTimePickerVariants } from './DateTimePicker';

const DateTimePicker2Wrapper = (props: DateTimePickerProps): JSX.Element => (
  <DateTimePicker2 {...props} />
);

const DateTimePicker2ForStory = modifyVariantsForStory<DateTimePickerVariants, DateTimePickerProps>(
  DateTimePicker2Wrapper,
);

const Component: Meta<typeof DateTimePicker2ForStory> = {
  title: 'Components/DateTimePickerInput',
  component: DateTimePicker2ForStory,
  argTypes: {
    showTimePicker: {
      control: 'boolean',
    },
  },
};

const Template: StoryFn<typeof DateTimePicker2ForStory> = (args) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  return (
    <Flex direction="column" gap={3}>
      <DateTimePicker2ForStory
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

export const Base: StoryFn<typeof DateTimePicker2ForStory> = Template.bind({});

Base.args = {
  showTimePicker: true,
};

export default Component;
