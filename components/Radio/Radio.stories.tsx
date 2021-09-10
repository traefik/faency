import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioForStory, RadioGroupForStory } from './Radio';

export default {
  title: 'Components/Radio',
  component: RadioForStory,
  subcomponents: { RadioGroup: RadioGroupForStory },
} as ComponentMeta<typeof RadioForStory>;

const Template: ComponentStory<typeof RadioForStory> = ({ value, ...args }) => (
  <RadioGroupForStory defaultValue="2">
    <RadioForStory value="1" css={{ mr: '$5' }} />
    <RadioForStory value="2" {...args} css={{ mr: '$5' }} />
  </RadioGroupForStory>
);

export const Basic = Template.bind({});

Basic.args = {
  size: '2',
};
