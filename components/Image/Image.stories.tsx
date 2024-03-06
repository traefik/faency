import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Image } from './Image';

export default {
  title: 'Components/Image',
  component: Image,
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  src: 'https://picsum.photos/200/300',
};

export const Large = Template.bind({});

Large.args = {
  src: 'https://picsum.photos/2000/3000',
};

const Customize: StoryFn<typeof Image> = (args) => <Image css={{ c: '$hiContrast' }} {...args} />;
