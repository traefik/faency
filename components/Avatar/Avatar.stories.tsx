// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading/Heading.vanilla';
import { Avatar } from './Avatar';
import { AvatarVanilla } from './Avatar.vanilla';

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

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla gap={4} align="center" wrap="wrap">
        <Avatar src="https://picsum.photos/100" size="1" />
        <Avatar src="https://picsum.photos/100" size="2" />
        <Avatar src="https://picsum.photos/100" size="3" />
        <Avatar src="https://picsum.photos/100" size="4" />
        <Avatar src="https://picsum.photos/100" size="5" />
        <Avatar src="https://picsum.photos/100" size="6" />
      </FlexVanilla>
      <H3Vanilla css={{ marginTop: '24px', marginBottom: '16px' }}>Fallback Variants</H3Vanilla>
      <FlexVanilla gap={4} align="center" wrap="wrap">
        <Avatar fallback="G" variant="gray" size="4" />
        <Avatar fallback="R" variant="red" size="4" />
        <Avatar fallback="P" variant="purple" size="4" />
        <Avatar fallback="B" variant="blue" size="4" />
        <Avatar fallback="G" variant="green" size="4" />
        <Avatar fallback="O" variant="orange" size="4" />
      </FlexVanilla>
      <H3Vanilla css={{ marginTop: '24px', marginBottom: '16px' }}>Shapes</H3Vanilla>
      <FlexVanilla gap={4} align="center" wrap="wrap">
        <Avatar src="https://picsum.photos/100" shape="circle" size="4" />
        <Avatar src="https://picsum.photos/100" shape="square" size="4" />
      </FlexVanilla>
    </BoxVanilla>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla gap={4} align="center" wrap="wrap">
        <AvatarVanilla src="https://picsum.photos/100" size="1" />
        <AvatarVanilla src="https://picsum.photos/100" size="2" />
        <AvatarVanilla src="https://picsum.photos/100" size="3" />
        <AvatarVanilla src="https://picsum.photos/100" size="4" />
        <AvatarVanilla src="https://picsum.photos/100" size="5" />
        <AvatarVanilla src="https://picsum.photos/100" size="6" />
      </FlexVanilla>
      <H3Vanilla css={{ marginTop: '24px', marginBottom: '16px' }}>Fallback Variants</H3Vanilla>
      <FlexVanilla gap={4} align="center" wrap="wrap">
        <AvatarVanilla fallback="G" variant="gray" size="4" />
        <AvatarVanilla fallback="R" variant="red" size="4" />
        <AvatarVanilla fallback="P" variant="purple" size="4" />
        <AvatarVanilla fallback="B" variant="blue" size="4" />
        <AvatarVanilla fallback="G" variant="green" size="4" />
        <AvatarVanilla fallback="O" variant="orange" size="4" />
      </FlexVanilla>
      <H3Vanilla css={{ marginTop: '24px', marginBottom: '16px' }}>Shapes</H3Vanilla>
      <FlexVanilla gap={4} align="center" wrap="wrap">
        <AvatarVanilla src="https://picsum.photos/100" shape="circle" size="4" />
        <AvatarVanilla src="https://picsum.photos/100" shape="square" size="4" />
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
