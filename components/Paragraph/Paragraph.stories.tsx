// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { Text } from '../Text';
import { Paragraph } from './Paragraph';
import { ParagraphVanilla } from './Paragraph.vanilla';

const Component: Meta<typeof Paragraph> = {
  title: 'Components/Paragraph',
  component: Paragraph,
};

export default Component;

const sampleText =
  'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for testing typography.';

const Template: StoryFn<typeof Paragraph> = (args) => <Paragraph {...args}>{sampleText}</Paragraph>;

export const Basic: StoryFn<typeof Paragraph> = Template.bind({});

Basic.args = {
  size: '1',
};

export const AllSizes: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$2' }}>Size 1</H3>
      <Paragraph size="1">{sampleText}</Paragraph>
    </BoxVanilla>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$2' }}>Size 2</H3>
      <Paragraph size="2">{sampleText}</Paragraph>
    </BoxVanilla>
  </FlexVanilla>
);

export const LongContent: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <Paragraph size="1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </Paragraph>
    <Paragraph size="2">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
      id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
      architecto beatae vitae dicta sunt explicabo.
    </Paragraph>
  </FlexVanilla>
);

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$4' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={4}>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Size 1</H3>
          <Paragraph size="1">{sampleText}</Paragraph>
          <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
            Font size: 3 (mobile) → 4 (bp2+), Line height: 25px → 27px
          </Text>
        </BoxVanilla>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Size 2</H3>
          <Paragraph size="2">{sampleText}</Paragraph>
          <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
            Font size: 5 (mobile) → 6 (bp2+), Line height: 27px → 30px, Color: slate11
          </Text>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '$4' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={4}>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Size 1</H3>
          <ParagraphVanilla size="1">{sampleText}</ParagraphVanilla>
          <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
            Font size: 3 (mobile) → 4 (bp2+), Line height: 25px → 27px
          </Text>
        </BoxVanilla>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Size 2</H3>
          <ParagraphVanilla size="2">{sampleText}</ParagraphVanilla>
          <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
            Font size: 5 (mobile) → 6 (bp2+), Line height: 27px → 30px, Color: slate11
          </Text>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla css={{ padding: '$4', backgroundColor: '$slate3', borderRadius: '$2' }}>
      <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Responsive Behavior</H3>
      <Text size="2" css={{ lineHeight: '1.5' }}>
        Resize your browser window to see the responsive font size changes. At 900px and above
        (bp2), the font sizes increase by one step. Both versions should look identical.
      </Text>
    </BoxVanilla>
  </FlexVanilla>
);

export const AsCustomElement: StoryFn = () => (
  <FlexVanilla direction="column" gap={4}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$2' }}>As div (Stitches)</H3>
      <Paragraph as="div" size="1">
        This paragraph is rendered as a div element.
      </Paragraph>
    </BoxVanilla>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$2' }}>As div (Vanilla Extract)</H3>
      <ParagraphVanilla as="div" size="1">
        This paragraph is rendered as a div element.
      </ParagraphVanilla>
    </BoxVanilla>
  </FlexVanilla>
);
