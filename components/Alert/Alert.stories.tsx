import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Alert, AlertProps, AlertVariants } from './Alert';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseAlert = (props: AlertProps): JSX.Element => <Alert {...props} />;
const AlertForStory = modifyVariantsForStory<AlertVariants, AlertProps>(BaseAlert);

export default {
  title: 'Components/Alert',
  component: Alert,
} as ComponentMeta<typeof AlertForStory>;

export const Variants: ComponentStory<typeof AlertForStory> = (args) => (
  <AlertForStory {...args}>
    <Heading size="2" css={{ mb: '$3' }}>
      Alert
    </Heading>
    <Text css={{ mb: '$3' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </AlertForStory>
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
