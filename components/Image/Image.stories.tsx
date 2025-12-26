// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3Vanilla } from '../Heading';
import { Image } from './Image';
import { ImageVanilla } from './Image.vanilla';

const Component: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
};

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;

export const Basic: StoryFn<typeof Image> = Template.bind({});

Basic.args = {
  src: 'https://picsum.photos/200/300',
};

export const Large: StoryFn<typeof Image> = Template.bind({});

Large.args = {
  src: 'https://picsum.photos/2000/3000',
};

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Stitches Version</H3Vanilla>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <Image src="https://picsum.photos/200/300" alt="Basic example" />
          <Image src="https://picsum.photos/200/200" alt="Square example" />
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <Image
            src="https://picsum.photos/2000/3000"
            alt="Large example"
            css={{ width: '200px' }}
          />
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3Vanilla css={{ marginBottom: '16px' }}>Vanilla Extract Version</H3Vanilla>
      <FlexVanilla direction="column" gap={3}>
        <FlexVanilla gap={2} wrap="wrap">
          <ImageVanilla src="https://picsum.photos/200/300" alt="Basic example" />
          <ImageVanilla src="https://picsum.photos/200/200" alt="Square example" />
        </FlexVanilla>
        <FlexVanilla gap={2} wrap="wrap">
          <ImageVanilla
            src="https://picsum.photos/2000/3000"
            alt="Large example"
            css={{ width: '200px' }}
          />
        </FlexVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
