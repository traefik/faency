// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { Bubble } from './Bubble';
import { BubbleVanilla } from './Bubble.vanilla';

type BubbleVariants = VariantProps<typeof Bubble>;
type BubbleProps = BubbleVariants & NonNullable<unknown>;

const BaseBubble = (props: BubbleProps): JSX.Element => <Bubble {...props} />;
const BubbleForStory = modifyVariantsForStory<BubbleVariants, BubbleProps>(BaseBubble);

const Component: Meta<typeof BubbleForStory> = {
  title: 'Components/Bubble',
  component: BubbleForStory,
};

export const Colors: StoryFn<typeof BubbleForStory> = (args) => (
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
    options: ['x-small', 'small', 'medium', 'large', 'x-large'],
  },
};

export const Sizes: StoryFn<typeof BubbleForStory> = (args) => (
  <Flex css={{ gap: '$3', alignItems: 'center' }}>
    <Bubble {...args} size="x-small" />
    <Bubble {...args} size="small" />
    <Bubble {...args} size="medium" />
    <Bubble {...args} size="large" />
    <Bubble {...args} size="x-large" />
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

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <Flex css={{ gap: '$3', marginBottom: '$4', alignItems: 'center' }}>
        <Bubble size="x-small" variant="red" />
        <Bubble size="small" variant="green" />
        <Bubble size="medium" variant="orange" />
        <Bubble size="large" variant="blue" />
        <Bubble size="x-large" variant="yellow" />
      </Flex>
      <Flex css={{ gap: '$3', marginBottom: '$4' }}>
        <Bubble variant="red" />
        <Bubble variant="green" />
        <Bubble variant="orange" />
        <Bubble variant="blue" />
        <Bubble variant="yellow" />
        <Bubble variant="purple" />
        <Bubble variant="gray" />
      </Flex>
      <Flex css={{ gap: '$3' }}>
        <Bubble variant="purple" noAnimation />
        <Bubble variant="gray" noAnimation />
      </Flex>
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla gap={3} css={{ marginBottom: '$4', alignItems: 'center' }}>
        <BubbleVanilla size="x-small" variant="red" />
        <BubbleVanilla size="small" variant="green" />
        <BubbleVanilla size="medium" variant="orange" />
        <BubbleVanilla size="large" variant="blue" />
        <BubbleVanilla size="x-large" variant="yellow" />
      </FlexVanilla>
      <FlexVanilla gap={3} css={{ marginBottom: '$4' }}>
        <BubbleVanilla variant="red" />
        <BubbleVanilla variant="green" />
        <BubbleVanilla variant="orange" />
        <BubbleVanilla variant="blue" />
        <BubbleVanilla variant="yellow" />
        <BubbleVanilla variant="purple" />
        <BubbleVanilla variant="gray" />
      </FlexVanilla>
      <FlexVanilla gap={3}>
        <BubbleVanilla variant="purple" noAnimation />
        <BubbleVanilla variant="gray" noAnimation />
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
