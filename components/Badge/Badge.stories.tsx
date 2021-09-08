import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Badge, BadgeForStory } from './Badge';
import { Flex } from '../Flex';

export default {
  title: 'Components/Badge',
  component: BadgeForStory,
  argTypes: {
    size: { control: 'inline-radio' },
    color: { control: 'select' },
  },
} as ComponentMeta<typeof BadgeForStory>;

export const Colors: ComponentStory<typeof BadgeForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Badge {...args}>Default</Badge>
    <Badge {...args} color="red">
      Red
    </Badge>
    <Badge {...args} color="green">
      Green
    </Badge>
    <Badge {...args} color="blue">
      Blue
    </Badge>
    <Badge {...args} color="neon">
      Neon
    </Badge>
    <Badge {...args} color="orange">
      Orange
    </Badge>
  </Flex>
);

Colors.args = {
  interactive: false,
  size: 'small',
  color: 'gray',
};

export const Small: ComponentStory<typeof BadgeForStory> = (args) => (
  <Badge {...args}>Small badge</Badge>
);

Small.args = {
  interactive: false,
  size: 'small',
  color: 'blue',
};

export const Large: ComponentStory<typeof BadgeForStory> = (args) => (
  <Badge {...args}>Large badge</Badge>
);

Large.args = {
  interactive: false,
  size: 'large',
  color: 'green',
};

export const Interactive: ComponentStory<typeof BadgeForStory> = (args) => (
  <Flex css={{ gap: '$3' }}>
    <Badge as="button" {...args}>
      Default
    </Badge>
    <Badge as="button" {...args} color="red">
      Red
    </Badge>
    <Badge as="button" {...args} color="green">
      Green
    </Badge>
    <Badge as="button" {...args} color="blue">
      Blue
    </Badge>
    <Badge as="button" {...args} color="neon">
      Neon
    </Badge>
    <Badge as="button" {...args} color="orange">
      Orange
    </Badge>
  </Flex>
);

Interactive.args = {
  interactive: true,
  size: 'small',
  color: 'gray',
};
