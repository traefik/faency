import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<any>;

export const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

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

export const Shape = Template.bind({});

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

export const Fallback = Template.bind({});

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
    control: 'string',
  },
};

export const Variants = Template.bind({});

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
const Customize: ComponentStory<typeof Avatar> = (args) => (
  <Avatar css={{ c: '$hiContrast' }} {...args} />
);
