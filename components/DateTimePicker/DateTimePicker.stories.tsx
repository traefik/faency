import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';
import { DateTimePicker, DateTimePickerProps, DateTimePickerVariants } from './DateTimePicker';

const BaseDateTimePicker = (props: DateTimePickerProps): JSX.Element => (
  <DateTimePicker {...props} />
);

const DateTimePickerForStory = modifyVariantsForStory<DateTimePickerVariants, DateTimePickerProps>(
  BaseDateTimePicker,
);

const Component: Meta<typeof DateTimePickerForStory> = {
  title: 'Components/DateTimePicker',
  component: DateTimePickerForStory,
};

const Template: StoryFn<typeof DateTimePickerForStory> = (args) => {
  const [date, setDate] = useState(new Date());

  return (
    <form>
      <Flex direction="column" gap={3}>
        <Box>
          <Label htmlFor="expiration-input">Expiration</Label>
          <DateTimePickerForStory
            {...args}
            id="expiration-input"
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={(date) => setDate(date)}
            popperPlacement="bottom-start"
            selected={date}
            showIcon
          />
        </Box>
        <Flex direction="column" css={{ gap: '2px' }}>
          <Label htmlFor="expiration-date">Expiration date</Label>
          <Text id="expiration-date">{date.toISOString()}</Text>
        </Flex>
      </Flex>
    </form>
  );
};

export const Basic: StoryFn<typeof DateTimePickerForStory> = Template.bind({});

export default Component;
