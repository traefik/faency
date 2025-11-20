import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Image } from './Image';

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

export default Component;
