import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Alert } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

export const Variants: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args}>
    <Heading size="2" css={{ mb: '$3' }}>
      Card
    </Heading>
    <Text css={{ mb: '$3' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </Alert>
);

Variants.args = {
  variant: 'info',
};

Variants.argTypes = {
  variant: {
    control: 'inline-radio',
    options: ['gray', 'info', 'success', 'warning', 'error'],
  },
};
