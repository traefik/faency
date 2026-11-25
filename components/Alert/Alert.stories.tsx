// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H2, H3Vanilla } from '../Heading';
import { Text } from '../Text';
import { TextVanilla } from '../Text/Text.vanilla';
import { Alert, AlertProps, AlertVariants } from './Alert';
import { AlertVanilla } from './Alert.vanilla';

const AlertWrapper = (props: AlertProps): JSX.Element => <Alert {...props} />;

const AlertForStory = modifyVariantsForStory<AlertVariants, AlertProps>(AlertWrapper);

const Component: Meta<typeof AlertForStory> = {
  title: 'Components/Alert',
  component: AlertForStory,
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

const variants = ['gray', 'info', 'success', 'warning', 'error'] as const;

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla direction="column" gap={3}>
        {variants.map((variant) => (
          <Alert key={variant} variant={variant}>
            <Text>{variant}</Text>
          </Alert>
        ))}
        <Alert variant="info" elevation={3}>
          <Text>info, elevation 3</Text>
        </Alert>
        <Alert variant="success" interactive>
          <Text>success, interactive</Text>
        </Alert>
      </FlexVanilla>
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla direction="column" gap={3}>
        {variants.map((variant) => (
          <AlertVanilla key={variant} variant={variant}>
            <TextVanilla>{variant}</TextVanilla>
          </AlertVanilla>
        ))}
        <AlertVanilla variant="info" elevation={3}>
          <TextVanilla>info, elevation 3</TextVanilla>
        </AlertVanilla>
        <AlertVanilla variant="success" interactive>
          <TextVanilla>success, interactive</TextVanilla>
        </AlertVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
