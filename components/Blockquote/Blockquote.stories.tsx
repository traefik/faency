// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { Text } from '../Text';
import { Blockquote, BlockquoteProps, BlockquoteVariants } from './Blockquote';
import { BlockquoteVanilla } from './Blockquote.vanilla';

const BaseBlockquote = (props: BlockquoteProps): JSX.Element => <Blockquote {...props} />;

const BlockquoteForStory = modifyVariantsForStory<BlockquoteVariants, BlockquoteProps>(
  BaseBlockquote,
);

const Component: Meta<typeof BlockquoteForStory> = {
  title: 'Components/Blockquote',
  component: BlockquoteForStory,
};

const Template: StoryFn<typeof BlockquoteForStory> = (args) => (
  <Blockquote {...args}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Blockquote>
);

export const Basic: StoryFn<typeof BlockquoteForStory> = Template.bind({});

const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$4' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={4}>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Sizes</H3>
          <FlexVanilla direction="column" gap={2}>
            <Blockquote size="1">{sampleText}</Blockquote>
            <Blockquote size="3">{sampleText}</Blockquote>
            <Blockquote size="5">{sampleText}</Blockquote>
          </FlexVanilla>
        </BoxVanilla>
        <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
          Default: size=3, variant=default, borderLeft=2px solid textDefault, padding=$2 $3
        </Text>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Variants</H3>
          <FlexVanilla direction="column" gap={2}>
            <Blockquote variant="default">{sampleText}</Blockquote>
            <Blockquote variant="subtle">{sampleText}</Blockquote>
            <Blockquote variant="contrast">{sampleText}</Blockquote>
          </FlexVanilla>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '$4' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={4}>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Sizes</H3>
          <FlexVanilla direction="column" gap={2}>
            <BlockquoteVanilla size="1">{sampleText}</BlockquoteVanilla>
            <BlockquoteVanilla size="3">{sampleText}</BlockquoteVanilla>
            <BlockquoteVanilla size="5">{sampleText}</BlockquoteVanilla>
          </FlexVanilla>
        </BoxVanilla>
        <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
          Default: size=3, variant=default, borderLeft=2px solid textDefault, padding=$2 $3
        </Text>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Variants</H3>
          <FlexVanilla direction="column" gap={2}>
            <BlockquoteVanilla variant="default">{sampleText}</BlockquoteVanilla>
            <BlockquoteVanilla variant="subtle">{sampleText}</BlockquoteVanilla>
            <BlockquoteVanilla variant="contrast">{sampleText}</BlockquoteVanilla>
          </FlexVanilla>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
