import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Label } from '../Label';
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

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <form>
      <Flex direction="column" gap={2}>
        <Box>
          <Label htmlFor="expiration-datetime">Expiration</Label>
          <DateTimePickerForStory
            {...args}
            id="expiration-datetime"
            calendarStartDay={1}
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={(date) => setDate(date)}
            selected={date}
          />
        </Box>
      </Flex>
    </form>
  );
};

export const Basic: StoryFn<typeof DateTimePickerForStory> = Template.bind({});

export default Component;
