// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { BoxVanilla } from '../Box/Box.vanilla';
import { Flex } from '../Flex';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { Text, TextProps, TextVariants } from './Text';
import { TextVanilla } from './Text.vanilla';

const BaseText = (props: TextProps): JSX.Element => <Text {...props} />;
const TextForStory = modifyVariantsForStory<TextVariants, TextProps & React.HTMLAttributes<any>>(
  BaseText,
);

const Component: Meta<typeof TextForStory> = {
  title: 'Components/Text',
  component: TextForStory,
};

const Template: StoryFn<typeof TextForStory> = (args) => (
  <TextForStory {...args}>Makes Networking Boring</TextForStory>
);

export const Basic: StoryFn<typeof TextForStory> = Template.bind({});

Basic.args = {};

const VARIANT_PARENTS = ['$primary', '$purple10'];

export const Variant: StoryFn<typeof TextForStory> = ({ ...args }) => (
  <Flex
    align="center"
    justify="center"
    css={{
      height: 100,
    }}
    gap={2}
  >
    <TextForStory {...args} variant="default">
      Default
    </TextForStory>
    <TextForStory {...args} variant="subtle">
      Subtle
    </TextForStory>
    <TextForStory {...args} variant="contrast">
      Contrast
    </TextForStory>
    <TextForStory {...args} variant="red">
      Red (error text)
    </TextForStory>
    <TextForStory {...args} variant="invalid">
      Invalid (invalid field)
    </TextForStory>
  </Flex>
);

export const Transform: StoryFn<typeof TextForStory> = ({ ...args }) => (
  <Flex gap={2}>
    <TextForStory {...args}>default text</TextForStory>
    <TextForStory {...args} transform="uppercase">
      uppercase text
    </TextForStory>
    <TextForStory {...args} transform="capitalize">
      capitalize text
    </TextForStory>
    <TextForStory {...args} transform="capitalizeWords">
      capitalize each word
    </TextForStory>
    {VARIANT_PARENTS.map((color) => (
      <Flex
        direction="column"
        align="center"
        justify="center"
        css={{
          color,
          border: '1px dashed currentColor',
          height: 100,
          width: 100,
          position: 'relative',
        }}
      >
        <TextForStory {...args} variant="inherit">
          Inherit
        </TextForStory>
        <Box css={{ position: 'absolute', bottom: 0, fontSize: '$1' }}>Parent color</Box>
      </Flex>
    ))}
  </Flex>
);

const SIZE_PARENTS = ['$4', '$12'];

export const Size: StoryFn<typeof TextForStory> = ({ ...args }) => (
  <Flex gap={2} direction="column">
    <TextForStory {...args} size="0">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="1">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="2">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="3">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="4">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="5">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="6">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="7">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="8">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="9">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="10">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="11">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="12">
      Makes Networking Boring
    </TextForStory>
    {SIZE_PARENTS.map((fontSize) => (
      <Flex
        css={{
          fontSize,
          border: '1px dashed $hiContrast',
          justifyContent: 'space-between',
        }}
      >
        <TextForStory {...args} size="inherit">
          Inherit
        </TextForStory>
        <Box css={{ color: '$hiContrast' }}>Parent fontSize</Box>
      </Flex>
    ))}
  </Flex>
);

export const Weight: StoryFn<typeof TextForStory> = (args) => (
  <Flex gap={2} direction="column">
    <TextForStory {...args}>Default</TextForStory>
    <TextForStory {...args} weight="light">
      Light
    </TextForStory>
    <TextForStory {...args} weight="regular">
      Regular
    </TextForStory>
    <TextForStory {...args} weight="medium">
      Medium
    </TextForStory>
    <TextForStory {...args} weight="semiBold">
      SemiBold
    </TextForStory>
    <TextForStory {...args} weight="bold">
      Bold
    </TextForStory>
  </Flex>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <Text size="1">Size 1</Text>
          <Text size="3">Size 3 (default)</Text>
          <Text size="5">Size 5</Text>
          <Text size="7">Size 7</Text>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <Text variant="default">Default</Text>
          <Text variant="subtle">Subtle</Text>
          <Text variant="contrast">Contrast</Text>
          <Text variant="red">Red</Text>
          <Text variant="invalid">Invalid</Text>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <Text weight="light">Light</Text>
          <Text weight="regular">Regular</Text>
          <Text weight="medium">Medium</Text>
          <Text weight="semiBold">SemiBold</Text>
          <Text weight="bold">Bold</Text>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <Text>default text</Text>
          <Text transform="uppercase">uppercase text</Text>
          <Text transform="capitalize">capitalize text</Text>
          <Text transform="capitalizeWords">capitalize each word</Text>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla size="1">Size 1</TextVanilla>
          <TextVanilla size="3">Size 3 (default)</TextVanilla>
          <TextVanilla size="5">Size 5</TextVanilla>
          <TextVanilla size="7">Size 7</TextVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla variant="default">Default</TextVanilla>
          <TextVanilla variant="subtle">Subtle</TextVanilla>
          <TextVanilla variant="contrast">Contrast</TextVanilla>
          <TextVanilla variant="red">Red</TextVanilla>
          <TextVanilla variant="invalid">Invalid</TextVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla weight="light">Light</TextVanilla>
          <TextVanilla weight="regular">Regular</TextVanilla>
          <TextVanilla weight="medium">Medium</TextVanilla>
          <TextVanilla weight="semiBold">SemiBold</TextVanilla>
          <TextVanilla weight="bold">Bold</TextVanilla>
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <TextVanilla>default text</TextVanilla>
          <TextVanilla transform="uppercase">uppercase text</TextVanilla>
          <TextVanilla transform="capitalize">capitalize text</TextVanilla>
          <TextVanilla transform="capitalizeWords">capitalize each word</TextVanilla>
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
