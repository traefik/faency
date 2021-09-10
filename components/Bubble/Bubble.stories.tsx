import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Bubble, BubbleForStory } from './Bubble';
import { Flex } from '../Flex';

export default {
  title: 'Components/Bubble',
  component: BubbleForStory,
} as ComponentMeta<typeof BubbleForStory>;

export const Colors: ComponentStory<typeof BubbleForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Bubble {...args} variant="red" />
    <Bubble {...args} variant="green" />
    <Bubble {...args} variant="orange" />
    <Bubble {...args} variant="blue" />
    <Bubble {...args} variant="yellow" />
    <Bubble {...args} variant="purple" />
    <Bubble {...args} variant="gray" />
  </Flex>
);

Colors.args = {
  size: 'small',
  noAnimation: false,
};

Colors.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['x-small', 'small', 'medium', 'large'],
  },
  variant: {
    control: true,
  },
};

export const Sizes: ComponentStory<typeof BubbleForStory> = (args) => (
  <Flex css={{ gap: '$3', alignItems: 'center' }}>
    <Bubble {...args} size="small" />
    <Bubble {...args} size="medium" />
    <Bubble {...args} size="large" />
  </Flex>
);

Sizes.args = {
  variant: 'purple',
};

Sizes.argTypes = {
  size: {
    control: false,
    noAnimation: false,
  },
  variant: {
    control: 'select',
  },
};
