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
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  return (
    <Flex direction="column" gap={3}>
      <DateTimePickerForStory
        {...args}
        dates={{
          minDate: new Date(args.minDate || Date.now()),
        }}
        calendar={{ mode: args.calendarMode, startDay: 1 }}
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

export default Component;
