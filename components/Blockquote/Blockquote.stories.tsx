// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Blockquote, BlockquoteProps, BlockquoteVariants } from './Blockquote';

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

export default Component;
