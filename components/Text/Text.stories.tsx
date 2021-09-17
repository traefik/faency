import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text, TextProps, TextVariants } from './Text';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseText = (props: TextProps): JSX.Element => <Text {...props} />;
const TextForStory = modifyVariantsForStory<TextVariants, TextProps & React.HTMLAttributes<any>>(
  BaseText
);

export default {
  title: 'Components/Text',
  component: TextForStory,
} as ComponentMeta<typeof TextForStory>;

const Template: ComponentStory<typeof TextForStory> = (args) => (
  <TextForStory {...args}>Makes Networking Boring</TextForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size: ComponentStory<typeof TextForStory> = ({ size, ...args }) => (
  <>
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
  </>
);
