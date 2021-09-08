import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextFieldForStory } from './TextField';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Tabs } from '@radix-ui/react-tabs';

export default {
  title: 'Components/TextField',
  component: TextFieldForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof TextFieldForStory>;

const Template: ComponentStory<typeof TextFieldForStory> = (args) => (
  <TextFieldForStory
    // type="email"
    // size="2"
    // placeholder="Email"
    // autoComplete="off"
    // css={{ mb: '$3' }}
    {...args}
  />
);

export const Basic = Template.bind({});

Basic.args = {};
