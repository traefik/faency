import * as Icons from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { IconButton } from './IconButton';
import { IconButtonVanilla } from './IconButton.vanilla';

const Component: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
};

export const Sizes: StoryFn<typeof IconButton> = (args) => (
  <Flex gap={3} align="center">
    <IconButton {...args} size="1">
      <Icons.BellIcon />
    </IconButton>
    <IconButton {...args} size="2">
      <Icons.AvatarIcon />
    </IconButton>
    <IconButton {...args} size="3">
      <Icons.CalendarIcon />
    </IconButton>
    <IconButton {...args} size="4">
      <Icons.CameraIcon />
    </IconButton>
  </Flex>
);

Sizes.args = {
  variant: 'default',
};

Sizes.argTypes = {
  variant: {
    control: 'inline-radio',
    options: ['default', 'primary', 'red', 'green', 'orange'],
  },
};

export const Variants: StoryFn<typeof IconButton> = (args) => (
  <Flex gap={3} align="center">
    <IconButton {...args} variant="default">
      <Icons.BellIcon />
    </IconButton>
    <IconButton {...args} variant="contrast">
      <Icons.Cross1Icon />
    </IconButton>
    <IconButton {...args} variant="primary">
      <Icons.AvatarIcon />
    </IconButton>
    <IconButton {...args} variant="red">
      <Icons.CalendarIcon />
    </IconButton>
    <IconButton {...args} variant="green">
      <Icons.CameraIcon />
    </IconButton>
    <IconButton {...args} variant="orange">
      <Icons.BackpackIcon />
    </IconButton>
  </Flex>
);

Variants.args = {
  size: '3',
};

Variants.argTypes = {
  size: {
    control: 'inline-radio',
    options: ['1', '2', '3', '4'],
  },
};

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap" align="center">
          <IconButton size="1">
            <Icons.BellIcon />
          </IconButton>
          <IconButton size="2">
            <Icons.AvatarIcon />
          </IconButton>
          <IconButton size="3">
            <Icons.CalendarIcon />
          </IconButton>
          <IconButton size="4">
            <Icons.CameraIcon />
          </IconButton>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap" align="center">
          <IconButton variant="default">
            <Icons.BellIcon />
          </IconButton>
          <IconButton variant="contrast">
            <Icons.Cross1Icon />
          </IconButton>
          <IconButton variant="primary">
            <Icons.AvatarIcon />
          </IconButton>
          <IconButton variant="red">
            <Icons.CalendarIcon />
          </IconButton>
          <IconButton variant="green">
            <Icons.CameraIcon />
          </IconButton>
          <IconButton variant="orange">
            <Icons.BackpackIcon />
          </IconButton>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap" align="center">
          <IconButtonVanilla size="1">
            <Icons.BellIcon />
          </IconButtonVanilla>
          <IconButtonVanilla size="2">
            <Icons.AvatarIcon />
          </IconButtonVanilla>
          <IconButtonVanilla size="3">
            <Icons.CalendarIcon />
          </IconButtonVanilla>
          <IconButtonVanilla size="4">
            <Icons.CameraIcon />
          </IconButtonVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap" align="center">
          <IconButtonVanilla variant="default">
            <Icons.BellIcon />
          </IconButtonVanilla>
          <IconButtonVanilla variant="contrast">
            <Icons.Cross1Icon />
          </IconButtonVanilla>
          <IconButtonVanilla variant="primary">
            <Icons.AvatarIcon />
          </IconButtonVanilla>
          <IconButtonVanilla variant="red">
            <Icons.CalendarIcon />
          </IconButtonVanilla>
          <IconButtonVanilla variant="green">
            <Icons.CameraIcon />
          </IconButtonVanilla>
          <IconButtonVanilla variant="orange">
            <Icons.BackpackIcon />
          </IconButtonVanilla>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
