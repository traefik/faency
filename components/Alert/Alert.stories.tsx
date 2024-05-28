import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Text } from '../Text';
import { H2 } from '../Heading';
import { Alert, AlertProps, AlertVariants } from './Alert';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseAlert = (props: AlertProps): JSX.Element => <Alert {...props} />;
const AlertForStory = modifyVariantsForStory<AlertVariants, AlertProps>(BaseAlert);

const Component: Meta<typeof AlertForStory> = {
  title: 'Components/Alert',
  // @ts-expect-error
  component: Alert,
};

export const Variants: StoryFn<typeof AlertForStory> = (args) => (
  <Alert {...args}>
    <H2 css={{ mb: '$3' }}>Alert</H2>
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

const Customize: StoryFn<typeof AlertForStory> = (args) => (
  <Alert {...args} css={{ mt: '$1' }}>
    <H2 css={{ mb: '$3' }}>Alert</H2>
    <Text css={{ mb: '$3' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </Alert>
);

export default Component;
