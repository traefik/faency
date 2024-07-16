import { Meta, StoryFn } from '@storybook/react';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Customize: StoryFn<typeof Image> = (args) => <Image css={{ c: '$hiContrast' }} {...args} />;

export default Component;
