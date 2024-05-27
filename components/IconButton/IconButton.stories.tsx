import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { IconButton } from './IconButton';
import * as Icons from '@radix-ui/react-icons';
import { Flex } from '../Flex';

const Component: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
};

export const Sizes: StoryFn<typeof IconButton> = (args) => (
  <Flex gap={3} align="center">
    <IconButton {...args} size="1">
      <Icons.BellIcon />
    </IconButton>
    <IconButton {...args} size="2">
      <Icons.AvatarIcon />
    </IconButton>
    <IconButton {...args} size="3">
      <Icons.CalendarIcon />
    </IconButton>
    <IconButton {...args} size="4">
      <Icons.CameraIcon />
    </IconButton>
  </Flex>
);

Sizes.args = {
  variant: 'default',
};

Sizes.argTypes = {
  variant: {
    control: 'inline-radio',
    options: ['default', 'primary', 'red', 'green', 'orange'],
  },
};

export const Variants: StoryFn<typeof IconButton> = (args) => (
  <Flex gap={3} align="center">
    <IconButton {...args} variant="default">
      <Icons.BellIcon />
    </IconButton>
    <IconButton {...args} variant="contrast">
      <Icons.Cross1Icon />
    </IconButton>
    <IconButton {...args} variant="primary">
      <Icons.AvatarIcon />
    </IconButton>
    <IconButton {...args} variant="red">
      <Icons.CalendarIcon />
    </IconButton>
    <IconButton {...args} variant="green">
      <Icons.CameraIcon />
    </IconButton>
    <IconButton {...args} variant="orange">
      <Icons.BackpackIcon />
    </IconButton>
  </Flex>
);

Variants.args = {
  size: '3',
};

Variants.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4'],
  },
};

const Customize: StoryFn<typeof IconButton> = (args) => (
  <IconButton css={{ c: '$hiContrast' }} {...args} size="1"></IconButton>
);

export default Component;
