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
    showTimePicker: {
      control: 'boolean',
    },
  },
};

const DateTimePickerTemplate: StoryFn<typeof DateTimePickerInputForStory> = (args) => {
  const [value, setValue] = useState<string>('');

  return (
    <form>
      <Flex direction="column" gap={3}>
        <DateTimePickerInputForStory
          {...args}
          calendar={{ startDay: 1 }}
          dates={{ minDate: new Date() }}
          inputCSS={{ width: '100%' }}
          onChange={(s) => setValue(s.currentTarget.valueOf)}
          value={value}
        />
        <Flex direction="column" css={{ gap: '2px' }}>
          <Label htmlFor="selected-dates">Selected date:</Label>
          <Text id="selected-dates">{value || 'None.'}</Text>
        </Flex>
      </Flex>
    </form>
  );
};

export const Base: StoryFn<typeof DateTimePickerInputForStory> = DateTimePickerTemplate.bind({});

Base.args = {
  showTimePicker: true,
};

export default Component;
