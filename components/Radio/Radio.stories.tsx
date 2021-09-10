import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioForStory, RadioGroupForStory } from './Radio';

export default {
  title: 'Components/Radio',
  component: RadioForStory,
} as ComponentMeta<typeof RadioForStory>;

const Template: ComponentStory<typeof RadioForStory> = ({ value, ...args }) => (
  <RadioGroupForStory defaultValue="1">
    <RadioForStory value="1" css={{ mr: '$5' }} {...args} />
    <RadioForStory value="2" css={{ mr: '$5' }} {...args} />
  </RadioGroupForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size = Template.bind({});

Size.args = {
  size: '2',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  size: 2,
};
