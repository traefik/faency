import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ImageForStory } from './Image';

export default {
  title: 'Components/Image',
  component: ImageForStory,
} as ComponentMeta<typeof ImageForStory>;

const Template: ComponentStory<typeof ImageForStory> = (args) => <ImageForStory {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  src: 'https://picsum.photos/200/300',
};

export const Large = Template.bind({});

Large.args = {
  src: 'https://picsum.photos/2000/3000',
};
