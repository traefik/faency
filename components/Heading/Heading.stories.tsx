// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H1, H2, H3, H4, H5, H6 } from './Heading';
import {
  H1Vanilla,
  H2Vanilla,
  H3Vanilla,
  H4Vanilla,
  H5Vanilla,
  H6Vanilla,
} from './Heading.vanilla';

const Component: Meta<typeof H1> = {
  title: 'Components/Heading',
  component: H1,
};

const Template: StoryFn<typeof H1> = (args) => (
  <Flex direction="column">
    <H1 {...args}>Heading level 1</H1>
    <H2 {...args}>Heading level 2</H2>
    <H3 {...args}>Heading level 3</H3>
    <H4 {...args}>Heading level 4</H4>
    <H5 {...args}>Heading level 5</H5>
    <H6 {...args}>Heading level 6</H6>
  </Flex>
);

export const Basic: StoryFn<typeof H1> = Template.bind({});

Basic.args = {};
Basic.argTypes = {
  transform: {
    options: ['uppercase', 'capitalize', 'capitalizeWords'],
    control: 'inline-radio',
  },
};

export const Transform: StoryFn<typeof H1> = (args) => (
  <Flex direction="column">
    <H1 {...args}>heading level 1 default</H1>
    <H1 {...args} transform="uppercase">
      heading level 1 uppercase
    </H1>
    <H1 {...args} transform="capitalize">
      heading level 1 capitalize
    </H1>
    <H1 {...args} transform="capitalizeWords">
      heading level 1 capitalize each word
    </H1>
  </Flex>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla direction="column" gap={2}>
          <H1>Heading level 1</H1>
          <H2>Heading level 2</H2>
          <H3>Heading level 3</H3>
          <H4>Heading level 4</H4>
          <H5>Heading level 5</H5>
          <H6>Heading level 6</H6>
        </FlexVanilla>
        <FlexVanilla direction="column" gap={2}>
          <H1>heading level 1 default</H1>
          <H1 transform="uppercase">heading level 1 uppercase</H1>
          <H1 transform="capitalize">heading level 1 capitalize</H1>
          <H1 transform="capitalizeWords">heading level 1 capitalize each word</H1>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla direction="column" gap={2}>
          <H1Vanilla>Heading level 1</H1Vanilla>
          <H2Vanilla>Heading level 2</H2Vanilla>
          <H3Vanilla>Heading level 3</H3Vanilla>
          <H4Vanilla>Heading level 4</H4Vanilla>
          <H5Vanilla>Heading level 5</H5Vanilla>
          <H6Vanilla>Heading level 6</H6Vanilla>
        </FlexVanilla>
        <FlexVanilla direction="column" gap={2}>
          <H1Vanilla>heading level 1 default</H1Vanilla>
          <H1Vanilla transform="uppercase">heading level 1 uppercase</H1Vanilla>
          <H1Vanilla transform="capitalize">heading level 1 capitalize</H1Vanilla>
          <H1Vanilla transform="capitalizeWords">heading level 1 capitalize each word</H1Vanilla>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
