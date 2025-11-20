import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Flex } from '../Flex';
import { H1, H2, H3, H4, H5, H6 } from './Heading';

const Component: Meta<typeof H1> = {
  title: 'Components/Heading',
  component: H1,
};

const Template: StoryFn<typeof H1> = (args) => (
  <Flex direction="column">
    <H1 {...args}>Heading level 1</H1>
    <H2 {...args}>Heading level 2</H2>
    <H3 {...args}>Heading level 3</H3>
    <H4 {...args}>Heading level 4</H4>
    <H5 {...args}>Heading level 5</H5>
    <H6 {...args}>Heading level 6</H6>
  </Flex>
);

export const Basic: StoryFn<typeof H1> = Template.bind({});

Basic.args = {};
Basic.argTypes = {
  transform: {
    options: ['uppercase', 'capitalize', 'capitalizeWords'],
    control: 'inline-radio',
  },
};

export const Transform: StoryFn<typeof H1> = (args) => (
  <Flex direction="column">
    <H1 {...args}>heading level 1 default</H1>
    <H1 {...args} transform="uppercase">
      heading level 1 uppercase
    </H1>
    <H1 {...args} transform="capitalize">
      heading level 1 capitalize
    </H1>
    <H1 {...args} transform="capitalizeWords">
      heading level 1 capitalize each word
    </H1>
  </Flex>
);

export default Component;
