import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';

const Component: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

Template.args = {
  src: 'https://picsum.photos/100',
  size: '4',
};

Template.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
};

export const Shape: StoryFn<typeof Avatar> = Template.bind({});

Shape.args = {
  src: 'https://picsum.photos/100',
  shape: 'square',
  size: '4',
};

Shape.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  shape: {
    control: 'inline-radio',
    options: ['square', 'circle'],
  },
};

export const Fallback: StoryFn<typeof Avatar> = Template.bind({});

Fallback.args = {
  fallback: 'M',
  shape: 'circle',
  size: '4',
  variant: 'red',
};

Fallback.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  shape: {
    control: 'inline-radio',
    options: ['square', 'circle'],
  },
  variant: {
    control: 'inline-radio',
    options: ['gray', 'red', 'purple', 'blue', 'green', 'orange'],
  },
  fallback: {
    control: 'text',
  },
};

export const Variants: StoryFn<typeof Avatar> = Template.bind({});

Variants.args = {
  fallback: 'M',
  shape: 'circle',
  size: '4',
  variant: 'blue',
};

Variants.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4', '5', '6'],
  },
  shape: {
    control: 'inline-radio',
    options: ['square', 'circle'],
  },
  variant: {
    control: 'inline-radio',
    options: ['gray', 'red', 'purple', 'blue', 'green', 'orange'],
  },
};
const Customize: StoryFn<typeof Avatar> = (args) => <Avatar css={{ c: '$hiContrast' }} {...args} />;

export default Component;
