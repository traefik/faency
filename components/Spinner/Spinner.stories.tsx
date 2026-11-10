// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { FlexVanilla } from '../Flex/Flex.vanilla';
import { TextVanilla } from '../Text/Text.vanilla';
import { SpinnerVanilla } from './Spinner.vanilla';

const Component: Meta<typeof SpinnerVanilla> = {
  title: 'Components/Spinner',
  component: SpinnerVanilla,
  parameters: {
    docs: {
      description: {
        component:
          'Shows that something is loading. It is a `status`, so screen readers announce `label` (default "Loading") when it appears. Pass `aria-hidden` when loading is already announced elsewhere. `color` takes a token or any CSS color and defaults to primary; `currentColor` matches the surrounding text. With reduced motion, it spins slower instead of stopping.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    color: { control: 'text' },
    label: { control: 'text' },
  },
};

export default Component;

export const Basic: StoryFn<typeof SpinnerVanilla> = (args) => <SpinnerVanilla {...args} />;

Basic.args = {
  size: 'medium',
  label: 'Loading',
};

export const Sizes: StoryFn<typeof SpinnerVanilla> = () => (
  <FlexVanilla gap={4} align="center">
    <SpinnerVanilla size="small" />
    <SpinnerVanilla />
    <SpinnerVanilla size="large" />
  </FlexVanilla>
);

export const Colors: StoryFn<typeof SpinnerVanilla> = () => (
  <FlexVanilla gap={4} align="center">
    <SpinnerVanilla />
    <SpinnerVanilla color="$hiContrast" />
    <SpinnerVanilla color="$gray11" />
    <SpinnerVanilla color="$toneSuccessSolid" />
    <SpinnerVanilla color="$toneDangerSolid" />
    <SpinnerVanilla color="#8b5cf6" />
  </FlexVanilla>
);

Colors.parameters = {
  docs: {
    description: {
      story:
        '`color` takes a color token (palette like `$gray11`, or vanilla tokens like `$toneSuccessSolid`) or any CSS color.',
    },
  },
};

export const InlineWithText: StoryFn<typeof SpinnerVanilla> = () => (
  <FlexVanilla gap={2} align="center" css={{ c: '$gray11' }}>
    <SpinnerVanilla size="small" color="currentColor" aria-hidden />
    <TextVanilla variant="subtle">Loading more results…</TextVanilla>
  </FlexVanilla>
);

InlineWithText.parameters = {
  docs: {
    description: {
      story: 'The text already says it is loading, so the spinner is `aria-hidden`.',
    },
  },
};
