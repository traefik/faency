import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { VariantProps } from '../../stitches.config';
import { Bubble } from './Bubble';
import { Flex } from '../Flex';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

type BubbleVariants = VariantProps<typeof Bubble>;
type BubbleProps = BubbleVariants & {};

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
  variant: {
    control: true,
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

const Customize: StoryFn<typeof BubbleForStory> = (args) => (
  <Bubble {...args} css={{ c: '$hiContrast' }} />
);

export default Component;
