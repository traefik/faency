import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Text, TextProps, TextVariants } from './Text';

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

export default Component;
